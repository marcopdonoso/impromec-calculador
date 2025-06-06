'use client'
import Button from '@/components/Button'
import TrayRecommendationCard, {
  TrayRecommendationCardProps,
} from '@/components/TrayRecommendationCard'
import { useReportGeneration } from '@/hooks/useReportGeneration'
import { Results } from '@/models/project.model'
import { getProjectById } from '@/services/project.service'
import { useProjectStore } from '@/store/useProjectStore'
import { useUserStore } from '@/store/useStore'
import {
  ArrowDownTrayIcon,
  DocumentIcon,
  PencilIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import AddedCablesTable from '../../components/AddedCablesTable'
import ModalOverlay from '../../components/ModalOverlay'
import ProjectOverviewContent from '../../components/ProjectOverviewContent'
import CalcDataAndResultsHeader from './components/CalcDataAndResultsHeader'
import DeleteProjectModal from './components/DeleteProjectModal'
import LoadAreaTotals from './components/LoadAreaTotals'
import MostConvenientIconLabel from './components/MostConvenientIconLabel'
import MyProjectsLinkButton from './components/MyProjectsLinkButton'
import OtherTrayOptionsCollapsible from './components/OtherTrayOptionsCollapsible'
import ProjectOverviewTitle from './components/ProjectOverviewTitle'
import ResultsHeader from './components/ResultsHeader'
import { activeSectorGlobal } from './components/SectorsListbox'
import SelectedTrayCard from './components/SelectedTrayCard'
import UnfinishedSectorsListMessages from './components/UnfinishedSectorsListMessages'

export default function ResultsPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = params.slug as string
  const { currentProject, setCurrentProject } = useProjectStore()
  const { user } = useUserStore()

  // Verificar si se llegó desde el proceso de cálculo
  const fromCalculation = searchParams.get('fromCalculation') === 'true'
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDeleteProjectModalVisible, setIsDeleteProjectModalVisible] =
    useState(false)
  // Crear estados para resultados y cables que se actualizarán cuando cambie el sector activo
  const [currentResults, setCurrentResults] = useState<Results | undefined>(
    undefined
  )
  const [currentCables, setCurrentCables] = useState<any[]>([])

  // Obtener el proyecto cuando se monta el componente
  useEffect(() => {
    if (!projectId) return

    const fetchProjectData = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Obtener el proyecto usando el servicio
        const response = await getProjectById(projectId)

        if (response.data) {
          // Actualizar el store global con los datos del proyecto
          setCurrentProject(response.data.project)
        } else {
          setError(response.error?.message || 'Error al cargar el proyecto')
        }
      } catch (err: any) {
        // Error manejado en la UI con toast
        setError(err.message || 'Error al cargar el proyecto')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjectData()
  }, [projectId, setCurrentProject])

  // Usar useCallback para evitar recreaciones de funciones en cada renderizado

  // Obtener los resultados del proyecto (ya sea del sector activo o del proyecto sin sectores)
  const getResults = useCallback(() => {
    if (!currentProject) return undefined

    // Si hay un sector activo seleccionado, usar sus resultados
    if (activeSectorGlobal && activeSectorGlobal.results) {
      // Usando resultados del sector activo
      return activeSectorGlobal.results
    }
    // Si no hay sector activo pero el proyecto tiene sectores, buscar uno con resultados
    else if (
      currentProject.hasSectors &&
      currentProject.sectors &&
      currentProject.sectors.length > 0
    ) {
      // Buscar el primer sector con resultados o usar el primero
      const sectorWithResults =
        currentProject.sectors.find((sector) => sector.results) ||
        currentProject.sectors[0]
      // Usando resultados del primer sector con resultados
      return sectorWithResults.results || undefined
    } else {
      // Proyecto sin sectores
      // Usando resultados del proyecto sin sectores
      return currentProject.results || undefined
    }
  }, [currentProject])

  // Obtener los cables del proyecto (ya sea del sector activo o del proyecto sin sectores)
  const getCables = useCallback(() => {
    if (!currentProject) return []

    // Si hay un sector activo seleccionado, usar sus cables
    if (activeSectorGlobal) {
      // Usando cables del sector activo
      // Primero intentar con la propiedad cables, luego con cablesInTray
      return activeSectorGlobal.cables || activeSectorGlobal.cablesInTray || []
    }
    // Si no hay sector activo pero el proyecto tiene sectores, buscar uno con resultados
    else if (
      currentProject.hasSectors &&
      currentProject.sectors &&
      currentProject.sectors.length > 0
    ) {
      // Buscar el primer sector con resultados o usar el primero
      const sectorWithResults =
        currentProject.sectors.find((sector) => sector.results) ||
        currentProject.sectors[0]
      // Usando cables del primer sector con resultados
      return sectorWithResults.cables || sectorWithResults.cablesInTray || []
    } else {
      // Proyecto sin sectores
      // Usando cables del proyecto sin sectores
      return currentProject.cables || []
    }
  }, [currentProject])

  // Actualizar los estados cuando cambie el proyecto o cuando cambie el sector activo
  useEffect(() => {
    // Actualizar resultados y cables
    setCurrentResults(getResults())
    setCurrentCables(getCables())

    // Crear un intervalo para verificar cambios en el sector activo
    const intervalId = setInterval(() => {
      // Solo verificar si activeSectorGlobal ha cambiado
      setCurrentResults(getResults())
      setCurrentCables(getCables())
    }, 500) // Verificar cada 500ms

    return () => clearInterval(intervalId) // Limpiar el intervalo al desmontar
  }, [getResults, getCables])

  // Hook para la generación de la memoria de cálculo
  const {
    isGenerating,
    generateReport,
    openReport,
    error: reportError,
  } = useReportGeneration()

  const moreConvenientOptionToCard: TrayRecommendationCardProps | null =
    currentResults?.moreConvenientOption
      ? {
          title: `Bandeja Recta ${currentResults.moreConvenientOption?.trayCategory.toUpperCase()} (${currentResults.moreConvenientOption.technicalDetails.heightInMM} mm x ${currentResults.moreConvenientOption.technicalDetails.widthInMM} mm)`,
          subtitle: `Hasta ${currentResults.moreConvenientOption?.technicalDetails.loadResistanceInKgM} kg/ml`,
          description: `${currentResults.moreConvenientOption.technicalDetails.thicknessInMM} mm de espesor. Recubierta con zinc (galvanizado) de grado G90: 275g/m2.`,
          height:
            currentResults.moreConvenientOption.technicalDetails.heightInMM,
          width: currentResults.moreConvenientOption.technicalDetails.widthInMM,
          image: `/img/${currentResults.moreConvenientOption.trayType}.png`,
          alt: `bandeja portacable de tipo ${currentResults.moreConvenientOption.trayType}`,
        }
      : null

  return (
    <section className="flex min-h-screen flex-col items-center px-4 pb-20 pt-12 lg:px-28">
      <div className="flex w-full max-w-4xl flex-col">
        <div className="mb-8 flex w-full flex-col gap-8 lg:mb-10 lg:gap-10">
          {fromCalculation ? (
            <ResultsHeader />
          ) : (
            /*
             * Texto invisible que mantiene el mismo ancho que el ResultsHeader sin mostrar contenido
             * Esto soluciona el problema de que el layout cambie de ancho cuando no se muestra ResultsHeader
             * La clase 'invisible' de Tailwind oculta el texto pero mantiene su espacio en el flujo del documento
             */
            <div>
              <p className="body_small_regular invisible text-center lg:body_large_regular">
                Podrás revisar el resumen de tu proyecto junto a las
                recomendaciones de acuerdo al resultado
              </p>
            </div>
          )}
          <UnfinishedSectorsListMessages />
        </div>

        <div className="mb-6 flex w-full justify-end">
          <MyProjectsLinkButton />
        </div>

        <div className="lg:-mx-20 lg:mb-12 lg:rounded-2xl lg:border lg:border-gray-placeholder lg:px-20 lg:py-20">
          <div className="mb-7 w-full lg:mb-6">
            <ProjectOverviewTitle />
            {currentProject && (
              <ProjectOverviewContent project={currentProject} />
            )}
          </div>

          <div className="mb-6 w-full">
            <CalcDataAndResultsHeader />
          </div>

          <div className="mb-6 w-full">
            <SelectedTrayCard />
          </div>

          <div className="mb-8 w-full lg:mb-16">
            <AddedCablesTable cablesInTray={currentCables} />
          </div>

          <LoadAreaTotals />

          <MostConvenientIconLabel />

          {moreConvenientOptionToCard && (
            <TrayRecommendationCard
              title={moreConvenientOptionToCard.title}
              subtitle={moreConvenientOptionToCard.subtitle}
              image={moreConvenientOptionToCard.image}
              alt={moreConvenientOptionToCard.alt}
              description={moreConvenientOptionToCard.description}
              height={moreConvenientOptionToCard.height}
              width={moreConvenientOptionToCard.width}
              firstOption
            />
          )}

          <hr className="my-6 text-gray-placeholder lg:my-12" />

          <OtherTrayOptionsCollapsible />
        </div>

        <div className="flex w-full flex-col gap-4 lg:mb-14 lg:flex-row lg:gap-10">
          <Button
            variant="secondary"
            icon={
              currentProject?.calculationReport ? (
                <DocumentIcon />
              ) : (
                <ArrowDownTrayIcon />
              )
            }
            disabled={isGenerating}
            onClick={() => {
              // Verificamos que tenemos los datos necesarios
              if (currentProject) {
                if (currentProject.calculationReport) {
                  // Si ya existe un reporte, simplemente lo abrimos
                  openReport(currentProject.calculationReport.url)
                } else if (user) {
                  // Si no existe un reporte, lo generamos (necesitamos user)
                  generateReport(user, currentProject)
                }
              }
            }}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                Generando...
                <span className="animate-pulse">◎</span>
              </span>
            ) : currentProject?.calculationReport ? (
              'Abrir reporte de cálculo'
            ) : (
              'Generar reporte de cálculo'
            )}
          </Button>

          <Button icon={<PhoneIcon />}>
            Solicitar Cotización del Proyecto
          </Button>
        </div>

        <hr className="my-6 w-full text-gray-placeholder lg:hidden" />

        <div className="flex w-full flex-col gap-4">
          <Button
            variant="add"
            icon={<PencilIcon />}
            onClick={() => {
              if (currentProject && currentProject.id) {
                router.push(
                  `/dashboard/calculator/edit-project/${currentProject.id}`
                )
              }
            }}
          >
            Editar
          </Button>
          <Button
            variant="destructive"
            onClick={() => setIsDeleteProjectModalVisible(true)}
          >
            Eliminar Proyecto
          </Button>
        </div>
      </div>

      <ModalOverlay isModalVisible={isDeleteProjectModalVisible}>
        <DeleteProjectModal
          isDeleteProjectModalVisible={isDeleteProjectModalVisible}
          setIsDeleteProjectModalVisible={setIsDeleteProjectModalVisible}
        />
      </ModalOverlay>
    </section>
  )
}

'use client'
import Button from '@/components/Button'
import TrayRecommendationCard, {
  TrayRecommendationCardProps,
} from '@/components/TrayRecommendationCard'
import { useReportGeneration } from '@/hooks/useReportGeneration'
import { Results, Sector } from '@/models/project.model' // Added Sector import
import { getProjectById } from '@/services/project.service'
import { useProjectStore } from '@/store/useProjectStore'
import { useUserStore } from '@/store/useStore'
import {
  ArrowPathIcon, // Added for Generate Report
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  PencilIcon,
} from '@heroicons/react/24/outline'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { BsWhatsapp } from 'react-icons/bs'
import { Tray } from '../../../../../../models/tray.model'
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
import SectorsListbox from './components/SectorsListbox' // Ensure SectorsListbox is imported if not already explicitly
import SelectedTrayCard from './components/SelectedTrayCard'
import UnfinishedSectorsListMessages from './components/UnfinishedSectorsListMessages'

export default function ResultsPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectId = params.slug as string
  const { currentProject, setCurrentProject, updateProjectDataWithSector } =
    useProjectStore()
  const { user } = useUserStore()

  // Verificar si se llegó desde el proceso de cálculo
  const fromCalculation = searchParams.get('fromCalculation') === 'true'
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  // Estado para controlar si el reporte necesita regeneración
  // Ya no necesitamos este estado, el hook se encarga de la regeneración
  // const [needsRegeneration, setNeedsRegeneration] = useState(false)
  const [isDeleteProjectModalVisible, setIsDeleteProjectModalVisible] =
    useState(false)
  const [currentButtonAction, setCurrentButtonAction] = useState<
    'generate' | 'open' | null
  >(null)
  const [activeSectorId, setActiveSectorId] = useState<string | null>(null) // State for active sector ID

  // Crear estados para resultados y cables que se actualizarán cuando cambie el sector activo
  const [currentResults, setCurrentResults] = useState<Results | undefined>(
    undefined
  )
  const [currentCables, setCurrentCables] = useState<any[]>([])

  // Logic to determine if action buttons should be shown
  const isUnfinishedProjectForButtonLogic =
    !currentProject?.hasSectors && !currentProject?.results
  const unfinishedSectorsForButtonLogic =
    currentProject?.hasSectors && currentProject?.sectors
      ? currentProject.sectors.filter((sector) => !sector.results)
      : []
  const canShowActionButtons =
    !isUnfinishedProjectForButtonLogic &&
    unfinishedSectorsForButtonLogic.length === 0

  // Derive activeSector object from activeSectorId and currentProject.sectors
  const activeSector = useMemo(() => {
    if (
      !activeSectorId ||
      !currentProject?.hasSectors ||
      !currentProject.sectors
    ) {
      return null
    }
    return (
      currentProject.sectors.find((sector) => sector.id === activeSectorId) ||
      null
    )
  }, [activeSectorId, currentProject])

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
          const projectData = response.data.project
          // Actualizar el store global con los datos del proyecto
          setCurrentProject(projectData)

          // Check if there's a sector ID in the URL
          const sectorIdFromUrl = searchParams.get('sectorId')

          if (
            projectData.hasSectors &&
            projectData.sectors &&
            projectData.sectors.length > 0
          ) {
            // If there's a sector ID in the URL, try to use that
            if (sectorIdFromUrl) {
              const sectorExists = projectData.sectors.some(
                (sector) => sector.id === sectorIdFromUrl
              )
              if (sectorExists) {
                setActiveSectorId(sectorIdFromUrl)
              } else {
                // If the sector from URL doesn't exist, default to the first sector
                setActiveSectorId(projectData.sectors[0]?.id || null)
              }
            } else {
              // No sector ID in URL, default to the first sector
              setActiveSectorId(projectData.sectors[0]?.id || null)
            }
          } else {
            setActiveSectorId(null) // No sectors or not a multi-sector project
          }
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
  }, [projectId, setCurrentProject, searchParams])

  // Usar useCallback para evitar recreaciones de funciones en cada renderizado

  // Obtener los resultados del proyecto (ya sea del sector activo o del proyecto sin sectores)
  const getResults = useCallback(() => {
    if (!currentProject) return undefined

    if (currentProject.hasSectors) {
      // For projects with sectors, use the activeSector's results (derived from activeSectorId)
      return activeSector?.results || undefined
    } else {
      // For projects without sectors, use the project's top-level results
      return currentProject.results || undefined
    }
  }, [currentProject, activeSector]) // <-- Use derived activeSector

  // Obtener los cables del proyecto (ya sea del sector activo o del proyecto sin sectores)
  const getCables = useCallback(() => {
    if (!currentProject) return []

    if (currentProject.hasSectors) {
      // For projects with sectors, use the activeSector's cables (derived from activeSectorId)
      // Ensure to check both possible property names for cables from different data structures
      return activeSector?.cables || activeSector?.cablesInTray || []
    } else {
      // For projects without sectors, use the project's top-level cables
      return currentProject.cables || []
    }
  }, [currentProject, activeSector]) // <-- Use derived activeSector

  // Actualizar los estados currentResults y currentCables reactively
  useEffect(() => {
    if (currentProject) {
      if (currentProject.hasSectors) {
        // If it's a project with sectors, results/cables depend on the activeSector
        setCurrentResults(activeSector?.results || undefined)
        setCurrentCables(
          activeSector?.cables || activeSector?.cablesInTray || []
        )
      } else {
        // If it's a project without sectors, use top-level project results/cables
        setCurrentResults(currentProject.results || undefined)
        setCurrentCables(currentProject.cables || [])
      }
    } else {
      // If no currentProject, clear results and cables
      setCurrentResults(undefined)
      setCurrentCables([])
    }
  }, [currentProject, activeSector]) // Update when project or derived activeSector changes

  // Hook para la generación de la memoria de cálculo
  const {
    isGenerating,
    generateReport,
    openReportWithFreshUrl,
    error: reportError,
  } = useReportGeneration()

  // Usamos un estado local para controlar la visualización del botón
  const [needsGeneration, setNeedsGeneration] = useState(false)
  // const { currentProject } = useProjectStore() // Removed redundant declaration, currentProject is already available from line 38

  useEffect(() => {
    const reportExists = Boolean(currentProject?.calculationReport)
    // console.log(`[ResultsPage] useEffect: currentProject.id=${currentProject?.id}, reportExists=${reportExists}. Current needsGeneration=${needsGeneration}`)

    if (reportExists) {
      if (needsGeneration) {
        // console.log('[ResultsPage] useEffect: Report EXISTS in store. Setting needsGeneration to false.')
        setNeedsGeneration(false)
      }
    } else {
      if (!needsGeneration) {
        // console.log('[ResultsPage] useEffect: Report DOES NOT EXIST in store. Setting needsGeneration to true.')
        setNeedsGeneration(true)
      }
    }
  }, [currentProject, needsGeneration]) // Added needsGeneration to dependency array

  const handleRequestQuoteViaWhatsApp = () => {
    if (!currentProject || !user) return

    const whatsAppPhoneNumber = '59172216766' // Your WhatsApp number

    let message = 'Hola, necesito soporte con el siguiente proyecto:\n\n'

    message += '*Mis Datos de Contacto:*\n'
    message += `Nombre: ${user.name || '[Su Nombre Aquí]'}\n`
    message += `Empresa: ${user.company || 'N/A'}\n`
    message += `Email: ${user.email || '[Su Email Aquí]'}\n\n`

    message += '*Información del Proyecto:*\n'
    message += `Nombre del Proyecto: ${currentProject.projectName || 'N/A'}\n`
    message += `Ubicación: ${currentProject.projectLocation || 'N/A'}\n`
    message += `ID del Proyecto: ${currentProject.id || 'N/A'}\n\n`

    message += '*Resumen del Cálculo:*\n'

    const formatTrayDetails = (tray: Tray | null | undefined) => {
      if (!tray) return 'No disponible'
      const type = tray.trayType || 'N/A'
      const category = tray.trayCategory || 'N/A'
      const width = tray.technicalDetails?.widthInMM
      const height = tray.technicalDetails?.heightInMM
      const dimensions =
        width && height ? `${width}x${height}mm` : 'Dimensiones N/A'
      return `Bandeja portacable ${type}, ${category}, ${dimensions}`
    }

    if (currentProject.hasSectors && currentProject.sectors) {
      currentProject.sectors.forEach((sector, index) => {
        const sectorNumber = index + 1
        const trayDetails = formatTrayDetails(
          sector.results?.moreConvenientOption
        )
        message += `Sector ${sectorNumber}: ${trayDetails}\n`
      })
    } else if (currentProject.results?.moreConvenientOption) {
      const trayDetails = formatTrayDetails(
        currentProject.results.moreConvenientOption
      )
      message += `Bandeja Seleccionada: ${trayDetails}\n`
    } else {
      message += 'Resultados del cálculo no disponibles.\n'
    }

    message += '\nGracias.'

    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${whatsAppPhoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, '_blank')
  }

  // Callback function to handle sector changes from SectorsListbox
  const handleSectorChange = useCallback((selectedSector: Sector) => {
    setActiveSectorId(selectedSector.id || null)
  }, []) // setActiveSectorId is stable, no dependencies needed

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
            {currentProject?.hasSectors &&
              currentProject.sectors &&
              currentProject.sectors.length > 0 && (
                <div className="mb-4 mt-4">
                  <SectorsListbox
                    sectors={currentProject.sectors}
                    activeSectorId={activeSectorId}
                    onSectorChange={handleSectorChange}
                  />
                </div>
              )}
          </div>

          {/* Conditional rendering for the entire Calculation Data and Results section */}
          {(currentProject && !currentProject.hasSectors) ||
          (currentProject && currentProject.hasSectors && activeSector) ? (
            <>
              {/* This div is ALWAYS rendered if the outer condition is met, preserving its mb-6 for spacing */}
              <div className="mb-6 w-full">
                {/* CalcDataAndResultsHeader content is rendered INSIDE this div ONLY if project does NOT have sectors */}
                {currentProject && !currentProject.hasSectors && (
                  <CalcDataAndResultsHeader />
                )}
                {/* If project has sectors, this div is effectively empty but its mb-6 still applies, spacing out the next element. */}
              </div>

              <div className="mb-6 w-full">
                {(() => {
                  const dataSource = currentProject?.hasSectors
                    ? activeSector
                    : currentProject
                  if (!dataSource) return null // Or some placeholder/loading UI

                  // Provide default values if properties are potentially null/undefined from dataSource
                  const trayType = dataSource.trayTypeSelection ?? 'escalerilla'
                  const reservePercentage = dataSource.reservePercentage ?? 20
                  const installationLayer =
                    dataSource.installationLayerSelection ?? 'adosada'

                  return (
                    <SelectedTrayCard
                      trayType={trayType}
                      reservePercentage={reservePercentage}
                      installationLayer={installationLayer}
                    />
                  )
                })()}
              </div>

              <div className="mb-8 w-full lg:mb-16">
                <AddedCablesTable cablesInTray={currentCables} />
              </div>

              <LoadAreaTotals activeSectorId={activeSectorId} />
            </>
          ) : null}
          {/* End of conditional rendering for Calculation Data and Results section */}

          <MostConvenientIconLabel />

          {moreConvenientOptionToCard && (
            <TrayRecommendationCard
              key={moreConvenientOptionToCard.title}
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

          <OtherTrayOptionsCollapsible activeSectorId={activeSectorId} />
        </div>

        {canShowActionButtons && (
          <div className="flex w-full flex-col gap-4 lg:mb-14 lg:flex-row lg:gap-10">
            <Button
              variant="secondary"
              icon={
                isGenerating ? (
                  <ArrowPathIcon className="h-5 w-5 animate-spin" />
                ) : needsGeneration ? (
                  <Cog6ToothIcon className="h-5 w-5" />
                ) : (
                  <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                )
              }
              disabled={isGenerating}
              onClick={() => {
                // console.log('[ResultsPage] onClick: Button clicked. State at click time:', {
                //   reportInStoreOnClick: Boolean(currentProject?.calculationReport),
                //   needsGenerationOnClick: needsGeneration,
                //   isGeneratingOnClick: isGenerating,
                // });

                if (isGenerating) return

                if (currentProject && user) {
                  if (!needsGeneration) {
                    setCurrentButtonAction('open')
                    // console.log('[ResultsPage] onClick: Action based on needsGeneration=false. Attempting to open existing report.');
                    openReportWithFreshUrl(projectId)
                      .then((result) => {
                        // console.log('[ResultsPage] onClick: Result of openReportWithFreshUrl:', result);
                        if (!result.success && result.needsRegeneration) {
                          // console.log('[ResultsPage] onClick: openReportWithFreshUrl indicated needsRegeneration. Reloading page as per user preference.');
                          window.location.reload()
                        } else if (result.success) {
                          // console.log('[ResultsPage] onClick: openReportWithFreshUrl successful. Report should be open.');
                        } else {
                          // console.log('[ResultsPage] onClick: openReportWithFreshUrl failed but no regeneration needed. Error should be displayed by hook.');
                        }
                      })
                      .finally(() => setCurrentButtonAction(null))
                  } else {
                    setCurrentButtonAction('generate')
                    // console.log('[ResultsPage] onClick: Action based on needsGeneration=true. Generating new report.');
                    generateReport(user, currentProject)
                      .then(() => {
                        // console.log('[ResultsPage] onClick: Result of generateReport. Hook updated store. useEffect should sync UI or page will reload if needed.');
                      })
                      .finally(() => setCurrentButtonAction(null))
                  }
                }
              }}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  {currentButtonAction === 'generate' && 'Generando reporte...'}
                  {currentButtonAction === 'open' && 'Abriendo reporte...'}
                  {!currentButtonAction && 'Procesando...'}
                </span>
              ) : needsGeneration ? (
                'Generar reporte de cálculo'
              ) : (
                'Abrir reporte de cálculo'
              )}
            </Button>

            <Button
              icon={<BsWhatsapp />}
              onClick={handleRequestQuoteViaWhatsApp}
              disabled={!currentProject || !user}
            >
              Pedir Soporte vía WhatsApp
            </Button>
          </div>
        )}

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
            Editar Proyecto
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

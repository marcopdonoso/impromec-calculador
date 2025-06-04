'use client'

import Alert from '@/components/Alert'
import Button from '@/components/Button'
import { appLinks } from '@/constants/links.constants'
import { Sector } from '@/models/project.model'
import { TrayType } from '@/models/tray.model'
import { useProjectStore } from '@/store/useProjectStore'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import DataForCalculation from '../../components/DataForCalculation'
import ProjectOverview from '../../components/ProjectOverview'
import SaveAndCalc from '../../components/SaveAndCalc'
import SectorsList from '../../components/SectorsList'
import PreventNavigation from './components/PreventNavigation'

export default function EditProjectPage() {
  const { slug } = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeSectorParam = searchParams.get('activeSector')
  const activeSectorIndex = activeSectorParam
    ? parseInt(activeSectorParam, 10)
    : null

  const {
    currentProject,
    isLoading,
    fetchProject,
    error: projectError,
  } = useProjectStore()
  const [showError, setShowError] = useState(false)
  const [activeSector, setActiveSector] = useState<Sector | null>(null)

  // Estados para los valores de UI que se pasan a SaveAndCalc
  const [trayTypeUI, setTrayTypeUI] = useState<TrayType>('escalerilla')
  const [reservePercentageUI, setReservePercentageUI] = useState<number>(30)

  useEffect(() => {
    if (slug && typeof slug === 'string') {
      fetchProject(slug)
    }
  }, [slug, fetchProject])

  useEffect(() => {
    if (projectError) {
      setShowError(true)
    }
  }, [projectError])

  useEffect(() => {
    if (
      !isLoading &&
      currentProject &&
      currentProject.hasSectors &&
      currentProject.sectors
    ) {
      // Si tenemos un índice de sector especificado en la URL, intentar usar ese sector
      if (
        activeSectorIndex !== null &&
        activeSectorIndex >= 0 &&
        activeSectorIndex < currentProject.sectors.length
      ) {
        // Activando sector especificado en URL
        setActiveSector(currentProject.sectors[activeSectorIndex])
        return
      }

      // Si ya hay un sector activo, buscar su equivalente en el proyecto actualizado
      if (activeSector) {
        const updatedActiveSector = currentProject.sectors.find(
          (s) => s.id === activeSector.id
        )
        if (updatedActiveSector) {
          // Manteniendo el mismo sector activo después de recargar
          setActiveSector(updatedActiveSector)
          return
        }
      }

      // Si no hay sector activo o no se encontró, establecer el primer sector como activo
      if (currentProject.sectors.length > 0) {
        // Estableciendo el primer sector como activo
        setActiveSector(currentProject.sectors[0])
      }
    }
  }, [currentProject, isLoading, activeSector, activeSectorIndex])

  // Actualizar los valores de UI cuando cambia el sector activo o el proyecto
  useEffect(() => {
    // Solo actualizar si hay un sector activo o un proyecto
    if (activeSector) {
      // Actualizando valores UI con datos del sector
      setTrayTypeUI(activeSector.trayTypeSelection || 'escalerilla')
      setReservePercentageUI(activeSector.reservePercentage || 30)
    } else if (currentProject && !currentProject.hasSectors) {
      // Para proyectos sin sectores, los valores están directamente en el objeto del proyecto
      // Actualizando valores UI con datos del proyecto (sin sectores)
      setTrayTypeUI(currentProject.trayTypeSelection || 'escalerilla')
      setReservePercentageUI(currentProject.reservePercentage || 30)
    }
  }, [activeSector, currentProject])

  if (isLoading) {
    return (
      <section className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-2 pb-20 pt-8 lg:gap-12">
        <p className="body_medium_medium">Cargando proyecto...</p>
      </section>
    )
  }

  if (showError) {
    return (
      <section className="flex min-h-screen w-full max-w-4xl flex-col gap-6 px-2 pb-20 pt-8 lg:gap-12">
        <div className="mt-6">
          <Alert
            variant="error"
            paragraph={projectError || 'Error al cargar el proyecto'}
          />
        </div>
        <div className="mt-8">
          <Button onClick={() => router.push(appLinks.calculatorHome.path)}>
            Volver al inicio
          </Button>
        </div>
      </section>
    )
  }

  if (!currentProject) {
    return (
      <section className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-2 pb-20 pt-8 lg:gap-12">
        <p className="body_medium_medium">No se encontró el proyecto</p>
        <Button onClick={() => router.push(appLinks.calculatorHome.path)}>
          Volver al inicio
        </Button>
      </section>
    )
  }

  return (
    <section className="flex min-h-screen w-full max-w-4xl flex-col gap-6 px-2 pb-20 pt-8 lg:gap-12">
      <PreventNavigation backHref="/" />

      {/* Mostrar la lista de sectores solo si el proyecto tiene sectores */}
      {currentProject.hasSectors &&
        currentProject.sectors &&
        currentProject.sectors.length > 0 && (
          <SectorsList
            sectors={currentProject.sectors}
            onSectorChange={(sector) => setActiveSector(sector)}
            initialActiveSector={activeSector}
          />
        )}

      {/* Mostrar la información general del proyecto */}
      <ProjectOverview project={currentProject} />

      {/* Mostrar los datos para cálculo según el tipo de proyecto */}
      {currentProject.hasSectors ? (
        // Para proyectos con sectores, pasar el sector activo Y el proyecto
        <DataForCalculation
          currentSector={
            activeSector ||
            (currentProject.sectors && currentProject.sectors.length > 0
              ? currentProject.sectors[0]
              : null)
          }
          currentProject={currentProject}
          trayType={trayTypeUI}
          reservePercentage={reservePercentageUI}
          onTrayTypeChange={(newType) => {
            console.log('Page: trayTypeUI cambiado a', newType)
            setTrayTypeUI(newType)
          }}
          onReservePercentageChange={(newValue) => {
            console.log('Page: reservePercentageUI cambiado a', newValue)
            setReservePercentageUI(newValue)
          }}
        />
      ) : (
        // Para proyectos sin sectores, pasar el proyecto completo
        <DataForCalculation
          currentProject={currentProject}
          trayType={trayTypeUI}
          reservePercentage={reservePercentageUI}
          onTrayTypeChange={(newType) => {
            console.log('Page: trayTypeUI cambiado a', newType)
            setTrayTypeUI(newType)
          }}
          onReservePercentageChange={(newValue) => {
            console.log('Page: reservePercentageUI cambiado a', newValue)
            setReservePercentageUI(newValue)
          }}
        />
      )}

      <SaveAndCalc
        activeSector={activeSector}
        currentProject={currentProject}
        hasSectors={currentProject.hasSectors}
        activeSectorIndex={
          currentProject.sectors?.findIndex((s) => s.id === activeSector?.id) ??
          -1
        }
        hasCables={
          currentProject.hasSectors
            ? !!(
                (activeSector?.cablesInTray &&
                  activeSector.cablesInTray.length > 0) ||
                (activeSector?.cables && activeSector.cables.length > 0)
              )
            : !!(currentProject.cables && currentProject.cables.length > 0)
        }
        // Pasar los valores actualizados de UI
        trayTypeUI={trayTypeUI}
        reservePercentageUI={reservePercentageUI}
      />
    </section>
  )
}

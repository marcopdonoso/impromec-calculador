'use client'

import DataForCalculation from '../../components/DataForCalculation'
import ProjectOverview from '../../components/ProjectOverview'
import SaveAndCalc from '../../components/SaveAndCalc'
import SectorsList from '../../components/SectorsList'
import PreventNavigation from './components/PreventNavigation'
import { useProjectStore } from '@/store/useProjectStore'
import { useEffect, useState } from 'react'
import { Sector } from '@/models/project.model'
import Alert from '@/components/Alert'
import { useParams, useRouter } from 'next/navigation'
import { appLinks } from '@/constants/links.constants'
import Button from '@/components/Button'

export default function EditProjectPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { currentProject, isLoading, error, fetchProject } = useProjectStore()
  const [showError, setShowError] = useState(false)
  // Inicializar el sector activo como null, se actualizará cuando se cargue el proyecto
  const [activeSector, setActiveSector] = useState<Sector | null>(null)

  useEffect(() => {
    if (slug && typeof slug === 'string') {
      fetchProject(slug)
    }
  }, [slug, fetchProject])

  useEffect(() => {
    if (error) {
      setShowError(true)
    }
  }, [error])

  // Mantener el sector activo cuando se recarga el proyecto
  useEffect(() => {
    if (!isLoading && currentProject && currentProject.hasSectors && currentProject.sectors) {
      // Si ya hay un sector activo, buscar su equivalente en el proyecto actualizado
      if (activeSector) {
        const updatedActiveSector = currentProject.sectors.find(s => s.id === activeSector.id);
        if (updatedActiveSector) {
          console.log('Manteniendo el mismo sector activo después de recargar:', updatedActiveSector.sectorName);
          setActiveSector(updatedActiveSector);
          return;
        }
      }
      
      // Si no hay sector activo o no se encontró, establecer el primer sector como activo
      if (currentProject.sectors.length > 0) {
        console.log('Estableciendo el primer sector como activo');
        setActiveSector(currentProject.sectors[0]);
      }
    }
  }, [currentProject, isLoading, activeSector])

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
          <Alert variant="error" paragraph={error || 'Error al cargar el proyecto'} />
        </div>
        <div className="mt-8">
          <Button onClick={() => router.push(appLinks.calculatorHome.path)}>Volver al inicio</Button>
        </div>
      </section>
    )
  }

  if (!currentProject) {
    return (
      <section className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-6 px-2 pb-20 pt-8 lg:gap-12">
        <p className="body_medium_medium">No se encontró el proyecto</p>
        <Button onClick={() => router.push(appLinks.calculatorHome.path)}>Volver al inicio</Button>
      </section>
    )
  }

  return (
    <section className="flex min-h-screen w-full max-w-4xl flex-col gap-6 px-2 pb-20 pt-8 lg:gap-12">
      <PreventNavigation backHref="/" />

      {/* Mostrar la lista de sectores solo si el proyecto tiene sectores */}
      {currentProject.hasSectors && currentProject.sectors && currentProject.sectors.length > 0 && (
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
          currentSector={activeSector || (currentProject.sectors && currentProject.sectors.length > 0 ? currentProject.sectors[0] : null)}
          currentProject={currentProject} 
        />
      ) : (
        // Para proyectos sin sectores, pasar el proyecto completo
        <DataForCalculation 
          currentProject={currentProject}
        />
      )}
      
      <SaveAndCalc 
        activeSector={activeSector} 
        hasSectors={currentProject.hasSectors}
        activeSectorIndex={currentProject.sectors?.findIndex(s => s.id === activeSector?.id) ?? -1}
        hasCables={currentProject.hasSectors 
          ? !!((activeSector?.cablesInTray && activeSector.cablesInTray.length > 0) || 
              (activeSector?.cables && activeSector.cables.length > 0))
          : !!(currentProject.cables && currentProject.cables.length > 0)
        }
      />
    </section>
  )
}

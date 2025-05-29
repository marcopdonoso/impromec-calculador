'use client'

import DataForCalculation from '../../components/DataForCalculation'
import ProjectOverview from '../../components/ProjectOverview'
import SaveAndCalc from '../../components/SaveAndCalc'
import SectorsList from '../../components/SectorsList'
import PreventNavigation from './components/PreventNavigation'
import { useProjectStore } from '@/store/useProjectStore'
import { useEffect, useState } from 'react'
import Alert from '@/components/Alert'
import { useParams, useRouter } from 'next/navigation'
import { appLinks } from '@/constants/links.constants'
import Button from '@/components/Button'

export default function EditProjectPage() {
  const { slug } = useParams()
  const router = useRouter()
  const { currentProject, isLoading, error, fetchProject } = useProjectStore()
  const [showError, setShowError] = useState(false)

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

      {currentProject.sectors && currentProject.sectors.length > 0 && (
        <SectorsList sectors={currentProject.sectors} />
      )}
      <ProjectOverview project={currentProject} />
      <DataForCalculation 
        currentSector={currentProject.sectors && currentProject.sectors.length > 0 ? currentProject.sectors[0] : null} 
      />
      <SaveAndCalc />
    </section>
  )
}

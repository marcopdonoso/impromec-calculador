import { useProjectStore } from '@/store/useProjectStore'
import UnfinishedSectorMessage from './UnfinishedSectorMessage'
import UnfinishedProjectMessage from './UnfinishedProjectMessage'
import { useParams } from 'next/navigation'

export default function UnfinishedSectorsListMessages() {
  const { currentProject } = useProjectStore()
  const params = useParams()
  const projectId = params.slug as string
  
  // Verificar si es un proyecto sin sectores y sin resultados
  const isUnfinishedProject = !currentProject?.hasSectors && !currentProject?.results
  
  // Extraer sectores sin resultados (results = null)
  const unfinishedSectors = currentProject?.hasSectors && currentProject?.sectors
    ? currentProject.sectors
        .map((sector, index) => ({
          id: sector.id,
          index,
          hasResults: !!sector.results
        }))
        .filter(sector => !sector.hasResults)
    : []

  if (isUnfinishedProject) {
    return (
      <div className="flex w-full flex-col gap-6 lg:gap-8">
        <UnfinishedProjectMessage projectId={projectId} />
      </div>
    )
  }
  
  if (unfinishedSectors.length > 0) {
    return (
      <div className="flex w-full flex-col gap-6 lg:gap-8">
        {unfinishedSectors.map((sector) => (
          <UnfinishedSectorMessage 
            key={sector.id} 
            idx={sector.index} 
            projectId={projectId} 
          />
        ))}
      </div>
    )
  }
  
  return null
}

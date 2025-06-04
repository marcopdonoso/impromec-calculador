import { useProjectStore } from '@/store/useProjectStore'

export default function ProjectOverviewTitle() {
  const { currentProject } = useProjectStore()
  
  // Determinar si el proyecto tiene sectores y cuántos
  const hasSectors = currentProject?.hasSectors && Array.isArray(currentProject?.sectors) && currentProject.sectors.length > 0
  const sectorsCount = Array.isArray(currentProject?.sectors) ? currentProject.sectors.length : 0
  
  // Construir el texto del título
  const titleText = hasSectors
    ? `Resumen de tu proyecto (${sectorsCount} ${sectorsCount === 1 ? 'sector' : 'sectores'})`
    : 'Resumen de tu proyecto'
  
  return (
    <div className="body_small_medium mb-6 flex rounded-lg bg-gray-text_alt px-5 py-3 text-gray-white lg:body_medium_medium">
      {titleText}
    </div>
  )
}

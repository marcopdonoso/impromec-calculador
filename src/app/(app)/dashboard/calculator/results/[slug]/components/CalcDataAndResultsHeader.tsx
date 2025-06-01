import { useProjectStore } from '@/store/useProjectStore'
import DataForCalculationTitle from './DataForCalculationTitle'
import SectorsListbox from './SectorsListbox'
import { Sector } from '@/models/project.model'

export default function CalcDataAndResultsHeader() {
  const { currentProject } = useProjectStore()
  
  // Verificar si el proyecto tiene sectores
  const hasSectors = currentProject?.hasSectors && Array.isArray(currentProject.sectors) && currentProject.sectors.length > 0
  
  // Filtrar solo los sectores que tienen resultados (no null)
  const sectorsWithResults: Sector[] = hasSectors && currentProject && currentProject.sectors
    ? currentProject.sectors.filter(sector => sector.results !== null && sector.results !== undefined)
    : []

  return !hasSectors || sectorsWithResults.length === 0 
    ? <DataForCalculationTitle /> 
    : <SectorsListbox sectors={sectorsWithResults} />
}

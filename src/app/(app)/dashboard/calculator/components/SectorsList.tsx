import Button from '@/components/Button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Sector } from '@/models/project.model'
import SectorsListItem from './SectorsListItem'

interface SectorsListProps {
  sectors: Sector[]
}

export default function SectorsList({ sectors }: SectorsListProps) {
  // Seleccionar el primer sector para mostrar en el título
  const activeSector = sectors.length > 0 ? sectors[0] : null

  return (
    <div className="px-2 lg:px-0">
      {sectors.map((sector, index) => (
        <SectorsListItem 
          key={sector.id || index}
          sectorName={sector.sectorName || ''} 
          sectorNumber={index + 1} 
        />
      ))}
      <Button variant="add" icon={<PlusCircleIcon />}>
        Agregar sector
      </Button>
      <hr className="my-8 text-gray-placeholder lg:my-10" />
      {activeSector && (
        <h4 className="body_large_semibold text-center lg:heading_h6">
          Sector {sectors.indexOf(activeSector) + 1}: {activeSector.sectorName}
        </h4>
      )}
    </div>
  )
}

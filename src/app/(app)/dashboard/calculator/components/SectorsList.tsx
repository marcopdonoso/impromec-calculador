import Button from '@/components/Button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import SectorsListItem from './SectorsListItem'

export default function SectorsList() {
  return (
    <div className="px-2 lg:px-0">
      <SectorsListItem sectorName="[Sala de servidores]" sectorNumber={1} />
      <Button variant="add" icon={<PlusCircleIcon />}>
        Agregar sector
      </Button>
      <hr className="my-8 text-gray-placeholder lg:my-10" />
      <h4 className="body_large_semibold text-center lg:heading_h6">
        Sector [1]: [Sala de servidores]
      </h4>
    </div>
  )
}

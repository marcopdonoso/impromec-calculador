import Button from '@/components/Button'
import Input from '@/components/Input'
import {
  EllipsisVerticalIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'

export default function SectorsList() {
  return (
    <div className="px-2">
      <div className="mb-7 flex items-end gap-2">
        <Input
          label="Nombre del Sector [1]"
          placeholder="[Sala de servidores]"
          className="flex-1"
        />
        <div className="w-12">
          <Button
            variant="tertiary"
            icon={<EllipsisVerticalIcon />}
            iconWidth={8}
          />
        </div>
      </div>
      <Button variant="add" icon={<PlusCircleIcon />}>
        Agregar sector
      </Button>
      <hr className="my-8 text-gray-placeholder" />
      <h4 className="body_large_semibold text-center">
        Sector [1]: [Sala de servidores]
      </h4>
    </div>
  )
}

import Button from '@/components/Button'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import AddCableForm from './AddCableForm'

export default function Cables() {
  return (
    <div className="px-2">
      <div className="mb-5 flex h-12 items-center rounded-lg bg-gray-background px-5 lg:mb-8">
        <h4 className="body_small_medium lg:body_medium_medium">Conductores</h4>
      </div>
      <AddCableForm />
      <div className="mt-6 px-2 lg:px-0">
        <Button variant="add" icon={<PlusCircleIcon />}>
          Agregar cable
        </Button>
      </div>
    </div>
  )
}

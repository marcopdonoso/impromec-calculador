'use client'
import Button from '@/components/Button'
import { CableInTray } from '@/models/cable.model'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import AddCableForm from './AddCableForm'
import AddedCablesTable from './AddedCablesTable'

interface CablesProps {
  cablesInTray: CableInTray[]
}

export default function Cables({ cablesInTray }: CablesProps) {
  const handleDelete = (dataRowIndex: number) => {
    console.log('delete ' + dataRowIndex) // TODO: Agregar lógica de eliminado de cable seleccionado para el cálculo
  }

  return (
    <div>
      <div className="mx-2 mb-6 flex h-12 items-center rounded-lg bg-gray-background px-5 lg:mx-0 lg:mb-8">
        <h4 className="body_small_medium lg:body_medium_medium">Conductores</h4>
      </div>
      {cablesInTray.length > 0 && (
        <div className="px-2 lg:px-0">
          <AddedCablesTable handleDelete={handleDelete} cablesInTray={cablesInTray} />
        </div>
      )}
      <AddCableForm />
      <div className="mt-4 px-2 lg:mt-6 lg:px-0">
        <Button variant="add" icon={<PlusCircleIcon />}>
          Agregar cable
        </Button>
      </div>
    </div>
  )
}

'use client'
import SelectedItemsTable from '@/components/SelectedItemsTable'
import { cables } from '@/constants/cables.constants'
import { Cable, CableInTray } from '@/models/cable.model'

export default function AddedCablesTable() {
  const headers = [
    'Cables',
    'Calibre en mm²',
    'Calibre en AWG',
    'Cantidad',
    'Disposición',
  ]

  const cable1: Cable = cables[0]
  const cable2: Cable = cables[15]
  const cable3: Cable = cables[4]

  const cablesInTray: CableInTray[] = [
    {
      cable: cable1,
      quantity: 10,
    },
    {
      cable: cable2,
      quantity: 40,
      arrangement: 'horizontal',
    },
    {
      cable: cable3,
      quantity: 20,
      arrangement: 'trébol',
    },
  ]

  interface DataRow {
    Cables: string
    'Calibre en mm²': string
    'Calibre en AWG': string
    Cantidad: number
    Disposición?: string
  }

  const dataRows: DataRow[] = cablesInTray.map((cableInTray, index) => {
    return {
      Cables: `Cable ${index + 1}`,
      'Calibre en mm²': cableInTray.cable.nominalSectionMM2,
      'Calibre en AWG': cableInTray.cable.nominalSectionAWG,
      Cantidad: cableInTray.quantity,
      Disposición: cableInTray.arrangement,
    }
  })

  const handleDelete = (dataRowIndex: number) => {
    console.log('delete ' + dataRowIndex)
  }

  return (
    <div className="px-2 py-4">
      <SelectedItemsTable
        headers={headers}
        dataRows={dataRows}
        handleDelete={handleDelete}
      />
    </div>
  )
}

import SelectedItemsTable from '@/components/SelectedItemsTable'
import { CableInTray } from '@/models/cable.model'
import { capitalizeFirstLetter } from '@/utilities/capitalize-first-letter.utility'

interface AddedCablesTableProps {
  handleDelete?: (index: number) => void
  cablesInTray: CableInTray[]
}

export default function AddedCablesTable({
  handleDelete,
  cablesInTray = [],
}: AddedCablesTableProps) {
  const headers = [
    'Cables',
    'Calibre en mm²',
    'Calibre en AWG',
    'Cantidad',
    'Disposición',
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
      'Calibre en mm²': `${cableInTray.cable.nominalSectionMM2} mm²`,
      'Calibre en AWG': `${cableInTray.cable.nominalSectionAWG} AWG`,
      Cantidad: cableInTray.quantity,
      Disposición:
        cableInTray.arrangement &&
        capitalizeFirstLetter(cableInTray.arrangement),
    }
  })

  return (
    <SelectedItemsTable
      headers={headers}
      dataRows={dataRows}
      handleDelete={handleDelete}
    />
  )
}

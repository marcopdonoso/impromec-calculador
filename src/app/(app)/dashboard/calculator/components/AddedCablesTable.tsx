import SelectedItemsTable from '@/components/SelectedItemsTable'
import { CableInTray } from '@/models/cable.model'
import { getArrangementDisplayText } from '@/utilities/cable-arrangement.utility'

interface AddedCablesTableProps {
  handleDelete?: (cableId: string, dataRowIndex: number) => void
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
    id?: string // ID del cable para la eliminación
  }

  const dataRows: DataRow[] = cablesInTray.map((cableInTray, index) => {
    return {
      Cables: `Cable ${index + 1}`,
      'Calibre en mm²': `${cableInTray.cable.nominalSectionMM2} mm²`,
      'Calibre en AWG': `${cableInTray.cable.nominalSectionAWG} AWG`,
      Cantidad: cableInTray.quantity,
      Disposición:
        cableInTray.arrangement &&
        getArrangementDisplayText(cableInTray.arrangement),
      id: cableInTray.id, // Guardar el ID del cable
    }
  })

  const handleDeleteWithId = (dataRowIndex: number) => {
    // Obtener el ID del cable desde los datos de la fila
    const cableId = dataRows[dataRowIndex].id
    if (cableId) {
      handleDelete?.(cableId, dataRowIndex)
    }
  }

  return (
    <SelectedItemsTable
      headers={headers}
      dataRows={dataRows}
      handleDelete={handleDeleteWithId}
    />
  )
}

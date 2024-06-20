'use client'
import TableWithHeaders from '@/components/TableWithHeaders'

export interface Data {
  id?: number
  name: string
  mm: number
  awg: number
  quantity: number
  disp: string
  layers: string
}

export default function Table() {
  const headers = [
    'Cables',
    'Calibre en mm2',
    'Calibre en AWG',
    'Cantidad',
    'Disposición',
    '',
  ]

  const data: Data[] = [
    {
      id: 1,
      name: 'cable 1',
      mm: 1.5,
      awg: 14,
      quantity: 4,
      disp: 'horizontal',
      layers: 'varias capas',
    },
    {
      id: 2,
      name: 'cable 2',
      mm: 2.5,
      awg: 12,
      quantity: 4,
      disp: 'horizontal',
      layers: 'una capa',
    },
    {
      id: 3,
      name: 'cable 3',
      mm: 4,
      awg: 10,
      quantity: 4,
      disp: 'horizontal',
      layers: 'una capa',
    },
  ]

  const adaptedData = data.map((d) => {
    delete d.id
    return d
  })
  return (
    <TableWithHeaders
      headers={headers}
      dataRows={adaptedData}
      handleDelete={() => {
        alert('deleted')
      }}
    />
  )
}

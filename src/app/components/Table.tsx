'use client'

import NavigableItemsTable from '@/components/NavigableItemsTable'
import SelectedItemsTable from '@/components/SelectedItemsTable'

export interface Data {
  id?: number
  name: string
  mm: number
  awg: number
  quantity: number
  disp: string
  layers: string
}

export interface Data2 {
  id?: number
  name: string
  description: string
  createdAt: string
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

  const data2: Data2[] = [
    {
      id: 1,
      name: 'Instalación Electrobol',
      description: '2 Sectores',
      createdAt: '2023-05-01T12:00:00Z',
    },
    {
      id: 2,
      name: 'Instalación Electrocablera',
      description: '1 Sector',
      createdAt: '2023-05-02T09:30:00Z',
    },
    {
      id: 3,
      name: 'Instalación Electromecánica',
      description: '3 Sectores',
      createdAt: '2023-05-03T14:45:00Z',
    },
  ]

  return (
    <>
      <SelectedItemsTable
        headers={headers}
        dataRows={data}
        handleDelete={(id) => {
          alert('deleted:' + id)
        }}
      />
      <br />
      <NavigableItemsTable
        dataRows={data2}
        title="Proyecto"
        handleNavigate={(id) => {
          alert('open:' + id)
        }}
      />
    </>
  )
}

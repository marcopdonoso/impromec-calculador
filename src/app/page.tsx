'use client'
import MyListbox from '@/components/MyListbox'

const opciones = [
  { value: '1.5', text: 'Orden alfabético (A-Z)' },
  { value: '2.5', text: '2.5 mm2' },
  { value: '4', text: '4 mm2' },
  { value: '6', text: '6 mm2' },
]

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <MyListbox variant="small" options={opciones} label="Ordenar por:" />
    </div>
  )
}

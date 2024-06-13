'use client'
import Button from '@/components/Button'
import MyListbox from '@/components/MyListbox'
import MyRadiogroup from '@/components/MyRadiogroup'
import { useState } from 'react'

const opciones = [
  { value: '1.5', text: 'Orden alfabético (A-Z)' },
  { value: '2.5', text: '2.5 mm2' },
  { value: '4', text: '4 mm2' },
  { value: '6', text: '6 mm2' },
]

const items = [
  'Liviana (resiste hasta 100kg/ml)',
  'Semipesado (Resiste hasta 150kg/ml)',
  'Pesado (Resiste hasta 400kg/ml)',
]

export default function Home() {
  const [first, setFirst] = useState('')
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <MyListbox variant="small" options={opciones} label="Ordenar por:" />
      <Button variant="primary">Click me</Button>
      <MyRadiogroup items={items} />
    </div>
  )
}

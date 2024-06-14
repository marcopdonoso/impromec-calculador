import Button from '@/components/Button'
import MyListbox from '@/components/MyListbox'
import MyRadiogroup from '@/components/MyRadiogroup'

const opciones = [
  { value: '1.5', text: 'Orden alfabético (A-Z)' },
  { value: '2.5', text: '2.5 mm2' },
  { value: '4', text: '4 mm2' },
  { value: '6', text: '6 mm2' },
]

const items = [
  { label: 'Escalerilla', image: 'escalerilla' },
  { label: 'Canal', image: 'escalerilla' },
]

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      <MyListbox variant="order" options={opciones} label="Ordenar por:" />
      <Button variant="primary">Click me</Button>
      <MyRadiogroup className="flex gap-2" items={items} />
    </div>
  )
}

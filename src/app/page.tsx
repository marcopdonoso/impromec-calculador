import Button from '@/components/Button'
import MyListbox from '@/components/MyListbox'
import MyRadiogroup from '@/components/MyRadiogroup'
import MySwitch from '@/components/MySwitch'

const opciones = [
  { value: '1.5', text: '1.5 mm2' },
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
      <MyListbox variant="large" options={opciones} label="Secciones:" />
      <Button variant="primary">Click me</Button>
      <MyRadiogroup className="flex gap-2" items={items} />
      <MySwitch />
    </div>
  )
}

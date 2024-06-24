import Input from '@/components/Input'
import MyListbox from '@/components/MyListbox'

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
    <div className="flex h-full flex-col items-center gap-3 py-2">
      <MyListbox variant="large" options={opciones} />
      <Input variant="password" name="inputs" label="Cantidad" />
    </div>
  )
}

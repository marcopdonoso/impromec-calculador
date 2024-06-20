import Button from '@/components/Button'
import ListItem from '@/components/ListItem'
import MyListbox from '@/components/MyListbox'
import MyRadiogroup from '@/components/MyRadiogroup'
import MySlider from '@/components/MySlider'
import MySwitch from '@/components/MySwitch'
import Notification from '@/components/Notification'
import DeleteModal from './components/DeleteModal'
import Table from './components/Table'

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
      <Table />
      <MyListbox variant="large" options={opciones} label="Secciones:" />
      <div>
        {' '}
        <Button variant="primary">Click me</Button>
      </div>
      <MyRadiogroup className="flex gap-2" items={items} />
      <div>
        <MySwitch />
      </div>
      <MySlider />
      <Notification
        paragraph="Cuando divides el proyecto en sectores debes agregar al menos un sector y así podrás comenzar con el calculo (o puedes crear el proyecto desde 0)."
        title="El sector ha sido guardado"
        variant="backgroundedInfo"
      />
      <ul>
        <ListItem variant="checkmark">Hola</ListItem>
        <ListItem>Chau</ListItem>
      </ul>
      <DeleteModal />
    </div>
  )
}

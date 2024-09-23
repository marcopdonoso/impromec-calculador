import AddCableForm from './AddCableForm'

export default function Cables() {
  return (
    <div className="px-2">
      <div className="mb-5 flex h-12 items-center rounded-lg bg-gray-background px-5">
        <h4 className="body_small_medium">Conductores</h4>
      </div>
      <AddCableForm />
    </div>
  )
}

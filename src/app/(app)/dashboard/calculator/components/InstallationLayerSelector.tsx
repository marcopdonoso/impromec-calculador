import MyRadiogroup, { RadioGroupItem } from '@/components/MyRadiogroup'

export default function InstallationLayerSelector() {
  const items: RadioGroupItem[] = [
    {
      label: 'Cables en varias capas',
    },
    {
      label: 'Cables en una sola capa',
    },
  ]
  return (
    <div className="px-2">
      <div className="mb-5 flex h-12 items-center rounded-lg bg-gray-background px-5">
        <h4 className="body_small_medium">Tipo de instalación de cables</h4>
      </div>
      <div className="px-2">
        <MyRadiogroup items={items} className="mb-5 flex flex-col gap-4" />
      </div>
    </div>
  )
}

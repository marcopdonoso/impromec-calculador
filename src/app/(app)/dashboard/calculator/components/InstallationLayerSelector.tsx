import MyRadiogroup, { RadioGroupItem } from '@/components/MyRadiogroup'
import { InstallationLayerType } from '@/models/project.model'

export default function InstallationLayerSelector() {
  const items: RadioGroupItem[] = [
    {
      label: 'Cables en una sola capa',
      value: 'singleLayer' as InstallationLayerType,
    },
    {
      label: 'Cables en varias capas',
      value: 'multiLayer' as InstallationLayerType,
    },
  ]

  // TODO: CAMBIAR A VERIFICACIÓN REAL
  const isCablesArrayEmpty = false

  return (
    <div>
      <div className="mx-2 mb-5 flex h-12 items-center rounded-lg bg-gray-background px-5 lg:mx-0 lg:mb-8">
        <h4 className="body_small_medium lg:body_medium_medium">
          Tipo de instalación de cables
        </h4>
      </div>
      <div className="rounded-2xl bg-gray-white p-2">
        <MyRadiogroup
          items={items}
          className="flex flex-col gap-4 lg:flex-row lg:justify-around"
          disabled={isCablesArrayEmpty}
        />
      </div>
    </div>
  )
}

import MyListbox from '@/components/MyListbox'
import MyRadiogroup, { RadioGroupItem } from '@/components/MyRadiogroup'
import { cables } from '@/constants/cables.constants'
import { Option } from '@/models/listbox.model'

export default function Cables() {
  const items: RadioGroupItem[] = [
    {
      label: 'Cables en varias capas',
    },
    {
      label: 'Cables en una sola capa',
    },
  ]

  const cableGaugesMM2: Option[] = cables.map((cable) => ({
    text: `${cable.nominalSectionMM2} mm²`,
    value: cable.externalDiameterMM,
  }))

  const cableGaugesAWG: Option[] = cables.map((cable) => ({
    text: `${cable.nominalSectionAWG} AWG`,
    value: cable.externalDiameterMM,
  }))

  return (
    <div className="px-2">
      <div className="mb-5 flex h-12 items-center rounded-lg bg-gray-background px-5">
        <h4 className="body_small_medium">Conductores</h4>
      </div>
      <div>
        <h6>Cable 1</h6>
        <MyRadiogroup items={items} />
        <MyListbox label="Calibre en mm²" options={cableGaugesMM2} />
        <MyListbox label="Calibre en AWG" options={cableGaugesAWG} />
      </div>
    </div>
  )
}

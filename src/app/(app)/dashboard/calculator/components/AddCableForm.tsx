import Button from '@/components/Button'
import Input from '@/components/Input'
import MyListbox from '@/components/MyListbox'
import MyRadiogroup, { RadioGroupItem } from '@/components/MyRadiogroup'
import { cableArrangement } from '@/constants/cable-arrangement.constants'
import { cables } from '@/constants/cables.constants'
import { Option } from '@/models/listbox.model'

export default function AddCableForm() {
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
    <div className="rounded-2xl border border-gray-input bg-gray-white px-2 py-5">
      <h6 className="mb-6">Cable 1</h6>
      <MyRadiogroup items={items} className="mb-5 flex flex-col gap-4" />
      <div className="mb-5 flex gap-2">
        <MyListbox label="Calibre en mm²" options={cableGaugesMM2} />
        <MyListbox label="Calibre en AWG" options={cableGaugesAWG} />
      </div>
      <div className="mb-7 flex gap-2">
        <Input label="Cantidad" type="number" />
        <MyListbox label="Disposición" options={cableArrangement} />
      </div>
      <Button>Guardar cable</Button>
    </div>
  )
}

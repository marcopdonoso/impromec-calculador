import Button from '@/components/Button'
import Input from '@/components/Input'
import MyListbox from '@/components/MyListbox'
import { cableArrangement } from '@/constants/cable-arrangement.constants'
import { cables } from '@/constants/cables.constants'
import { Option } from '@/models/listbox.model'

export default function AddCableForm() {
  const cableGaugesMM2: Option[] = cables.map((cable) => ({
    text: `${cable.nominalSectionMM2} mm²`,
    value: cable.externalDiameterMM,
  }))

  const cableGaugesAWG: Option[] = cables.map((cable) => ({
    text: `${cable.nominalSectionAWG} AWG`,
    value: cable.externalDiameterMM,
  }))
  return (
    <div className="mt-8 rounded-2xl border border-gray-input bg-gray-white px-2 py-5 lg:mt-6 lg:p-8">
      <h6 className="body_medium_medium mb-6">Cable 1</h6>
      <div className="flex flex-col lg:mb-6 lg:flex-row lg:gap-6">
        <div className="mb-5 flex gap-2 lg:mb-0 lg:w-1/2 lg:gap-6">
          <MyListbox label="Calibre en mm²" options={cableGaugesMM2} />
          <MyListbox label="Calibre en AWG" options={cableGaugesAWG} />
        </div>
        <div className="mb-7 flex gap-2 lg:mb-0 lg:w-1/2 lg:gap-6">
          <Input label="Cantidad" type="number" />
          <MyListbox label="Disposición" options={cableArrangement} />
        </div>
      </div>
      <div className="text-center">
        <Button className="lg:max-w-md">Guardar cable</Button>
      </div>
    </div>
  )
}

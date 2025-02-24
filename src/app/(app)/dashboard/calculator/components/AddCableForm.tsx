import Button from '@/components/Button'
import Input from '@/components/Input'
import MyListbox, { Option } from '@/components/MyListbox'
import { cables } from '@/constants/cables.constants'
import { CableArrangementType } from '@/models/cable.model'
import { Controller, useForm } from 'react-hook-form'

export default function AddCableForm() {
  const { control, handleSubmit } = useForm()

  const cableGaugesMM2: Option[] = cables.map((cable) => ({
    text: `${cable.nominalSectionMM2} mm²`,
    value: cable.externalDiameterMM,
  }))

  const cableGaugesAWG: Option[] = cables.map((cable) => ({
    text: `${cable.nominalSectionAWG} AWG`,
    value: cable.externalDiameterMM,
  }))

  const cableArrangement: Option[] = [
    {
      text: 'Horizontal',
      value: 'horizontal' as CableArrangementType,
    },
    {
      text: 'Trébol',
      value: 'clover' as CableArrangementType,
    },
  ]

  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <div className="mt-8 rounded-2xl border border-gray-input bg-gray-white px-2 py-5 lg:mt-6 lg:p-8">
      <h6 className="body_medium_medium mb-6">Cable 1</h6>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:mb-6 lg:flex-row lg:gap-6">
          <div className="mb-5 flex gap-2 lg:mb-0 lg:w-1/2 lg:gap-6">
            <Controller
              name="cableGaugesMM2"
              control={control}
              render={({ field }) => (
                <MyListbox
                  label="Calibre en mm²"
                  options={cableGaugesMM2}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="cableGaugesAWG"
              control={control}
              render={({ field }) => (
                <MyListbox
                  label="Calibre en AWG"
                  options={cableGaugesAWG}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="mb-7 flex gap-2 lg:mb-0 lg:w-1/2 lg:gap-6">
            <Input
              label="Cantidad"
              type="number"
              {...control.register('quantity')}
            />
            <Controller
              name="CableArrangement"
              control={control}
              render={({ field }) => (
                <MyListbox
                  label="Disposición"
                  options={cableArrangement}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </div>
        <div className="text-center">
          <Button className="lg:max-w-md" type="submit">
            Guardar cable
          </Button>
        </div>
      </form>
    </div>
  )
}

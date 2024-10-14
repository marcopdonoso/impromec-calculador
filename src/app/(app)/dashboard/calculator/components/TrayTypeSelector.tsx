import MyRadiogroup, { RadioGroupItem } from '@/components/MyRadiogroup'
import { TrayType } from '@/models/product.model'
import clsx from 'clsx'

export default function TrayTypeSelector({
  className,
}: {
  className?: string
}) {
  const trayTypes: RadioGroupItem[] = [
    {
      label: 'Escalerilla',
      value: 'escalerilla' as TrayType,
      image: 'escalerilla',
    },
    { label: 'Canal', value: 'canal' as TrayType, image: 'canal' },
  ]
  return (
    <div
      className={clsx(
        'flex flex-col lg:flex-row lg:items-center lg:justify-between',
        className
      )}
    >
      <div>
        <h6 className="body_small_medium lg:body_medium_medium">
          Tipo de bandeja portacables
        </h6>
        <p className="body_small_regular mb-4 text-gray-text_alt lg:body_medium_regular">
          Selecciona el tipo de bandeja que deseas instalar
        </p>
      </div>
      <MyRadiogroup
        items={trayTypes}
        className="flex justify-center gap-x-4 lg:gap-x-8"
      />
    </div>
  )
}

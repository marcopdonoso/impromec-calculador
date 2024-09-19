import MyRadiogroup, { RadioGroupItem } from '@/components/MyRadiogroup'

export default function TrayTypeSelector({
  className,
}: {
  className?: string
}) {
  const trayTypes: RadioGroupItem[] = [
    { label: 'Escalerilla', image: 'escalerilla' },
    { label: 'Canal', image: 'canal' },
  ]
  return (
    <div className={className}>
      <h6 className="body_small_medium">Tipo de bandeja portacables</h6>
      <p className="body_small_regular mb-4 text-gray-text_alt">
        Selecciona el tipo de bandeja que deseas instalar
      </p>
      <MyRadiogroup items={trayTypes} className="flex gap-x-3" />
    </div>
  )
}

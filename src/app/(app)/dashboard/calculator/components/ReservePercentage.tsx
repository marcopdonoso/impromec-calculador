import MySlider from '@/components/MySlider'
import clsx from 'clsx'

export default function ReservePercentage({
  className,
}: {
  className?: string
}) {
  return (
    <div
      className={clsx(
        'flex flex-col lg:flex-row lg:justify-between',
        className
      )}
    >
      <div>
        <h6 className="body_small_medium lg:body_medium_medium">
          Porcentaje de reserva
        </h6>
        <p className="body_small_regular mb-3 text-gray-text_alt lg:hidden">
          Espacio extra en la bandeja para futuras expansiones
        </p>
        <p className="body_medium_regular hidden text-gray-text_alt lg:block">
          Indica el espacio extra para futuras expansiones
        </p>
      </div>
      <div className="lg:w-[416px]">
        <MySlider />
      </div>
    </div>
  )
}

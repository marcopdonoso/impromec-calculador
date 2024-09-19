import MySlider from '@/components/MySlider'

export default function ReservePercentage({
  className,
}: {
  className?: string
}) {
  return (
    <div className={className}>
      <h6 className="body_small_medium">Porcentaje de reserva</h6>
      <p className="body_small_regular mb-3 text-gray-text_alt">
        Espacio extra en la bandeja para futuras expansiones.
      </p>
      <MySlider />
    </div>
  )
}

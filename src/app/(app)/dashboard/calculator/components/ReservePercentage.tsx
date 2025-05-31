import MySlider from '@/components/MySlider'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

interface ReservePercentageProps {
  className?: string
  value?: number
}

export default function ReservePercentage({
  className,
  value = 30, // Valor por defecto si no se proporciona
}: ReservePercentageProps) {
  // Usamos useState para mantener un registro del valor actual
  const [currentValue, setCurrentValue] = useState(value);
  
  // Este useEffect es crucial para actualizar el valor cuando cambia el prop value
  // por ejemplo, cuando se cambia de sector
  useEffect(() => {
    console.log('ReservePercentage value changed:', value);
    setCurrentValue(value);
  }, [value]);
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
        <MySlider 
          key={`slider-${currentValue}`} // Forzar recreación cuando cambia el valor
          initialValue={currentValue} 
          onChange={(newValue) => {
            console.log('Slider value changed to:', newValue);
            setCurrentValue(newValue);
          }}
        />
      </div>
    </div>
  )
}

import clsx from 'clsx'
import IconTextFeature from './IconTextFeature'

interface FeaturesProps {
  className?: string
}

export default function CalculatorFeatures({ className }: FeaturesProps) {
  return (
    <div className={clsx('flex flex-col gap-4', className)}>
      <div>
        <IconTextFeature
          icon="/svg/Icon_calculator.svg"
          alt="Icono de calculadora"
        >
          Simplifica el proceso de selección y dimensionamiento de tu bandeja.
        </IconTextFeature>
      </div>
      <div>
        <IconTextFeature
          icon="/svg/Icon_ruler-pencil.svg"
          alt="Icono de regla y lápiz"
        >
          Mejora la eficiencia y la precisión en todos tus proyectos de
          cableado.
        </IconTextFeature>
      </div>
      <div>
        <IconTextFeature
          icon="/svg/Icon_laptop-phone.svg"
          alt="Icono de laptop y móvil"
        >
          Optimizada para dispositivos móviles. Disfruta de nuestra herramienta
          en cualquier lugar.
        </IconTextFeature>
      </div>
    </div>
  )
}

import CalculatorFeatures from '@/components/CalculatorFeatures'

export default function LoginFeatures() {
  return (
    <div className="hidden lg:block lg:w-1/2">
      <h4 className="heading_h4">¡Optimiza tus Proyectos!</h4>
      <h4 className="heading_h4 mb-12">
        Calcula la <span className="text-red">bandeja ideal</span> para tu
        instalación.
      </h4>
      <CalculatorFeatures className="gap-8 [&>*:last-child]:hidden" />
    </div>
  )
}

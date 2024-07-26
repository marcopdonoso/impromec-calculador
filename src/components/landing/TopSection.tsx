import Button from '../Button'
import TopImage from './TopImage'

export default function TopSection() {
  return (
    <>
      <section className="mb-14 px-4 text-center lg:mb-16 lg:w-2/3 lg:px-6">
        <p className="body_large_semibold mb-2 lg:heading_h6 lg:mb-6">
          La herramienta que te ayudará a{' '}
          <span className="text-red">calcular la bandeja adecuada</span> para tu
          instalación
        </p>
        <p className="body_small_regular mb-8 lg:body_large_regular lg:mb-6">
          Impromec Calculador te ayudará a determinar la bandeja portacables
          ideal para tu instalación. Ahorra tiempo, reduce errores y mejora la
          eficiencia de tus proyectos.
        </p>
        <Button className="">Comenzar ahora</Button>
      </section>
      <TopImage />
    </>
  )
}

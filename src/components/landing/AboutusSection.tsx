import Image from 'next/image'
import Button from '../Button'

export default function AboutusSection() {
  return (
    <section className="lg:flex lg:w-full">
      <div className="relative flex flex-1 flex-col items-center bg-gray-background px-4 pb-8 pt-12 lg:items-start lg:justify-center lg:px-28">
        <h4 className="body_large_semibold mb-2 lg:heading_h4 lg:mb-9">
          Nosotros
        </h4>
        <p className="body_small_regular mb-2 text-center lg:body_large_regular lg:mb-5 lg:text-start">
          Somos Impromec una empresa que fabrica, comercializa y distribuye
          bandejas portacables y soportería general a todo el sector de la
          construcción.
        </p>
        <p className="body_small_regular mb-8 text-center lg:body_large_regular lg:mb-11 lg:text-start">
          Hemos creado Impromec Calculador, una herramienta que te ayudará a
          calcular la bandeja ideal para tu instalación.{' '}
        </p>
        <Button>Usar Impromec Calculador</Button>
        <Image
          src={'/svg/aboutus_desktop.svg'}
          alt="figuras con los colores de impromec"
          width={1600}
          height={1200}
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-auto lg:block"
        />
      </div>

      <Image
        src={'/img/aboutus_mask.webp'}
        alt="persona soldando metal"
        width={1100}
        height={1208}
        className="h-auto w-full lg:w-2/5"
      />
    </section>
  )
}

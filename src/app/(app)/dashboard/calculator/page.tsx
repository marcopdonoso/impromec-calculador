import Button from '@/components/Button'
import { ChevronRightIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

export default function CalculatorPage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4">
      <Image
        src={'/svg/Logo_text.svg'}
        alt="logo_impromec_calculador"
        width={129}
        height={109}
        className="h-24 w-auto lg:h-28"
      />
      <h4 className="body_large_semibold mt-7 text-center lg:heading_h4 lg:mt-10">
        ¡Bienvenido a Impromec Calculador!
      </h4>
      <p className="body_small_regular mt-2 text-center lg:body_large_regular">
        Calcula la bandeja portacables adecuada para tu instalación.
      </p>
      <div className="mt-14 flex w-full max-w-4xl flex-col gap-4 lg:mt-20">
        <Button variant="icon_right" icon={<ChevronRightIcon />}>
          Mis proyectos (0)
        </Button>
        <Button variant="add" icon={<PlusCircleIcon />}>
          Agregar proyecto
        </Button>
      </div>
    </section>
  )
}

import { appLinks } from '@/constants/links.constants'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'
import CalculatorFeatures from '../CalculatorFeatures'

export default function CalculatorSection() {
  return (
    <section
      className="flex w-full justify-center bg-gray-background px-4 pb-16 pt-12 lg:justify-between lg:p-0"
      id="calculator"
    >
      <div className="flex w-full flex-col items-center gap-8 lg:items-start lg:justify-center lg:py-32 lg:pl-28">
        <Image
          src={'/svg/Logo_text.svg'}
          alt="Logotipo de Impromec"
          width={500}
          height={500}
          className="h-auto w-20 lg:w-32"
        />
        <p className="body_large_semibold text-center lg:heading_h6 lg:max-w-[32vw] lg:text-start">
          Fácil, rápido y preciso:{' '}
          <span className="text-red">Calcula tu Bandeja Portacables</span> ideal
        </p>
        <CalculatorFeatures className={'lg:max-w-[32vw]'} />
        <Link href={appLinks.calculatorHome.path} className="w-full">
          <Button className="lg:w-[32vw]">Usar Impromec Calculador</Button>
        </Link>
      </div>
      <Image
        src={'/img/calculator_desktop.webp'}
        alt="teléfonos móviles"
        width={1464}
        height={1744}
        className="my-auto hidden h-auto w-[55%] lg:block"
      />
    </section>
  )
}

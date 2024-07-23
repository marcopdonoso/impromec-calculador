import Image from 'next/image'
import Button from '../Button'
import Features from './Features'

export default function CalculatorSection() {
  return (
    <section className="flex w-full flex-col items-center gap-8 bg-gray-background px-4 py-12">
      <Image
        src={'/svg/Logo_text.svg'}
        alt="Logotipo de Impromec"
        width={500}
        height={500}
        className="h-auto w-20"
      />
      <p className="body_large_semibold text-center">
        Fácil, rápido y preciso:{' '}
        <span className="text-red">Calcula tu Bandeja Portacables</span> ideal
      </p>
      <Features />
      <Button>Usar Impromec Calculador</Button>
    </section>
  )
}

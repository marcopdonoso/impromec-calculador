import Image from 'next/image'

export default function CalculatorHeader() {
  return (
    <header className="flex w-full flex-col items-center">
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
    </header>
  )
}

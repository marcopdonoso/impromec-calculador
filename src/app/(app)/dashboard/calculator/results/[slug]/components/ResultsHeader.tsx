import Image from 'next/image'

export default function ResultsHeader() {
  return (
    <header className="flex w-full flex-col items-center">
      <Image
        src={'/svg/Logo_text.svg'}
        alt="Logo_Impromec"
        width={258}
        height={218}
        className="mb-6 h-24 w-auto lg:mb-10 lg:h-28"
      />
      <div className="flex w-full flex-col items-center gap-2">
        <h4 className="body_medium_medium text-center lg:heading_h4">
          ¡Hemos calculado tu bandeja ideal!
        </h4>
        <p className="body_small_regular text-center lg:body_large_regular">
          Podrás revisar el resumen de tu proyecto junto a las recomendaciones
          de acuerdo al resultado
        </p>
      </div>
    </header>
  )
}

import Image from 'next/image'

export default function MostConvenientIconLabel() {
  return (
    <div className="mb-4 flex w-full items-center gap-2">
      <Image
        src={'/svg/star-fill.svg'}
        alt="yellow_star_icon"
        width={24}
        height={24}
        className="h-6 w-auto rounded-full border"
      />
      <p className="body_small_medium lg:body_medium_medium">
        Opción más conveniente
      </p>
    </div>
  )
}

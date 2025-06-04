import Image from 'next/image'

interface SelectedItemCardProps {
  image?: string
  alt?: string
  primaryText?: string
  secondaryText?: string
  tertiaryText?: string
}

export default function SelectedItemCard({
  image,
  alt,
  primaryText,
  secondaryText,
  tertiaryText,
}: SelectedItemCardProps) {
  return (
    <div className="flex w-full items-center gap-6">
      <div className="relative size-16 min-w-16 rounded-lg bg-gray-background">
        <Image
          fill
          src={image ?? '/svg/landscape-placeholder.svg'}
          alt={alt ?? 'product'}
          className="object-contain"
          sizes="(max-width: 1024px) 30vw, (max-width: 1536px) 20vw"
        />
      </div>
      <div className="flex flex-col gap-1 lg:gap-0">
        <p className="body_small_medium lg:body_medium_medium">{primaryText}</p>
        <p className="body_small_regular text-gray-text_alt lg:body_medium_regular">
          {secondaryText}
        </p>
        <p className="body_xs_regular text-gray-text_alt lg:body_small_regular">
          {tertiaryText}
        </p>
      </div>
    </div>
  )
}

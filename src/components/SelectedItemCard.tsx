import Image from 'next/image'

interface SelectedItemCardProps {
  image?: string
  alt?: string
  primaryText?: string
  secondaryText?: string
}

export default function SelectedItemCard({
  image,
  alt,
  primaryText,
  secondaryText,
}: SelectedItemCardProps) {
  return (
    <div className="flex w-80 items-center gap-6 lg:w-[66vw]">
      <div className="relative size-16 min-w-16 rounded-lg bg-gray-placeholder/15">
        <Image
          fill
          src={image ?? '/svg/landscape-placeholder.svg'}
          alt={alt ?? 'product'}
          className="object-contain"
          sizes="(max-width: 1024px) 30vw, (max-width: 1536px) 20vw"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium lg:text-base">{primaryText}</p>
        <p className="text-sm lg:text-base">{secondaryText}</p>
      </div>
    </div>
  )
}

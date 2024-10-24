'use client'
import Image from 'next/image'

interface CatalogProductCardProps {
  image?: string
  alt?: string
  primaryText: string
  secondaryText: string
  id?: string
  onClick?: (id: string) => void
  priority?: boolean
}

export default function CatalogProductCard({
  image,
  alt,
  primaryText,
  secondaryText,
  id,
  onClick,
  priority,
}: CatalogProductCardProps) {
  return (
    <div
      onClick={() => (onClick && id ? onClick(id) : null)}
      role="button"
      className="flex w-40 flex-col items-center rounded-md bg-gray-background py-2 hover:shadow-lg active:shadow-none lg:w-72 lg:rounded-lg lg:py-3"
    >
      <div className="relative mb-3 size-36 min-h-36 rounded-sm bg-gray-white lg:mb-4 lg:size-64 lg:min-h-64 lg:rounded-md">
        <Image
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1536px) 20vw"
          src={image ?? '/svg/landscape-placeholder.svg'}
          alt={alt ?? 'product'}
          className="object-contain"
          priority={priority ?? false}
        />
      </div>
      <div className="flex flex-col gap-1 overflow-hidden">
        <p className="text-center text-[10px] text-gray-text lg:text-base lg:font-medium">
          {primaryText}
        </p>
        <p className="text-center text-[10px] text-gray-text lg:text-base">
          {secondaryText}
        </p>
      </div>
    </div>
  )
}

import Image from 'next/image'

interface IconTextFeatureProps {
  icon: string
  alt: string
  children: React.ReactNode
}

export default function IconTextFeature({
  icon,
  alt,
  children,
}: IconTextFeatureProps) {
  return (
    <div className="flex items-center gap-4">
      <Image
        src={icon}
        alt={alt}
        width={80}
        height={80}
        className="h-auto w-14 lg:w-16"
      />
      <p className="body_small_regular lg:body_large_regular lg:flex-1">
        {children}
      </p>
    </div>
  )
}

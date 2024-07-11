import Image from 'next/image'
import ListItem from './ListItem'

interface CalcResultProductCardProps {
  title: string
  subtitle: string
  image?: string
  alt?: string
  description: string
  height: number
  width: number
  firstOption?: boolean
}

export default function CalcResultProductCard({
  title,
  subtitle,
  image,
  alt,
  description,
  height,
  width,
  firstOption,
}: CalcResultProductCardProps) {
  return (
    <div className="w-80 rounded-lg bg-gray-input px-4 py-5 lg:w-[66vw] lg:p-6">
      <div className="lg:flex lg:items-center lg:justify-between">
        <p className="text-sm font-medium lg:text-2xl lg:font-semibold">
          {title}
        </p>
        <p className="text-sm lg:text-lg">{subtitle}</p>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2 lg:flex-nowrap lg:gap-6">
        <div className="relative size-16 min-w-16 rounded-lg bg-gray-background lg:size-36 lg:min-w-36">
          <Image
            fill
            src={image ?? '/svg/landscape-placeholder.svg'}
            alt={alt ?? 'product'}
            className="object-contain"
            sizes="(max-width: 640px) 30vw, (max-width: 1536px) 20vw"
          />
        </div>

        <div>
          <p className="absolute right-0 top-0 max-w-52 text-sm font-medium lg:static lg:mt-2 lg:max-w-full lg:text-base">
            {description}
          </p>
          <div className="mt-4 flex gap-4 lg:mt-1 lg:flex-col lg:gap-1">
            <ListItem style={{ color: '#1F2A37' }}>
              Alto (h): {height} mm
            </ListItem>
            <ListItem style={{ color: '#1F2A37' }}>
              Ancho (w): {width} mm
            </ListItem>
          </div>
          {firstOption && (
            <p className="mt-2 hidden lg:block">
              Materia prima certificada y fabricada bajo normativa{' '}
              <span className="font-medium">ASTM A653</span> de grado
              estructural. Calidad garantizada bajo norma{' '}
              <span className="font-medium">NEMA VE-1</span>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

// w-[var(--button-width)]

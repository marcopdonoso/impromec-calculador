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
    <div className="w-80 rounded-lg bg-gray-input px-4 py-5 sm:w-[66vw] sm:p-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <p className="text-sm font-medium sm:text-2xl sm:font-semibold">
          {title}
        </p>
        <p className="text-sm sm:text-lg">{subtitle}</p>
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2 sm:flex-nowrap sm:gap-6">
        <div className="relative size-16 min-w-16 rounded-lg bg-gray-background sm:size-36 sm:min-w-36">
          <Image
            fill
            src={image ?? '/svg/landscape-placeholder.svg'}
            alt={alt ?? 'product'}
            className="object-contain"
            sizes="(max-width: 640px) 30vw, (max-width: 1536px) 20vw"
          />
        </div>

        <div>
          <p className="absolute right-0 top-0 max-w-52 text-sm font-medium sm:static sm:mt-2 sm:max-w-full sm:text-base">
            {description}
          </p>
          <div className="mt-4 flex gap-4 sm:mt-1 sm:flex-col sm:gap-1">
            <ListItem style={{ color: '#1F2A37' }}>
              Alto (h): {height} mm
            </ListItem>
            <ListItem style={{ color: '#1F2A37' }}>
              Ancho (w): {width} mm
            </ListItem>
          </div>
          {firstOption && (
            <p className="mt-2 hidden sm:block">
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

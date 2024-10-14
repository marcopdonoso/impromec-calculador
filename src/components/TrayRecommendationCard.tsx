import Image from 'next/image'
import ListItem from './ListItem'

export interface TrayRecommendationCardProps {
  title: string
  subtitle: string
  image?: string
  alt?: string
  description: string
  height: number
  width: number
  firstOption?: boolean
}

export default function TrayRecommendationCard({
  title,
  subtitle,
  image,
  alt,
  description,
  height,
  width,
  firstOption,
}: TrayRecommendationCardProps) {
  return (
    <div className="w-full rounded-lg bg-gray-input px-4 py-5 lg:p-6">
      <div className="grid lg:grid-flow-col">
        <p className="text-sm font-medium lg:text-2xl lg:font-semibold">
          {title}
        </p>
        <p className="text-sm lg:text-end lg:text-lg">{subtitle}</p>
      </div>

      <div className="mt-4 grid w-full grid-flow-row grid-cols-[64px,1fr] grid-rows-[64px,1fr] items-center gap-x-2 gap-y-4 lg:mt-6 lg:grid-cols-[144px,1fr] lg:grid-rows-3 lg:gap-x-6 lg:gap-y-1">
        <Image
          src={image ?? '/svg/landscape-placeholder.svg'}
          alt={alt ?? 'product'}
          width={150}
          height={150}
          className="h-16 w-auto min-w-max rounded-lg bg-gray-background lg:row-span-3 lg:h-36 lg:min-w-max"
        />

        <div className="">
          <p className="text-sm font-medium lg:mt-2 lg:text-base">
            {description}
          </p>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <div className="grid grid-cols-2 lg:grid-cols-1">
            <ListItem style={{ color: '#1F2A37' }}>
              Alto (h): {height} mm
            </ListItem>
            <ListItem style={{ color: '#1F2A37' }}>
              Ancho (w): {width} mm
            </ListItem>
          </div>
        </div>

        {firstOption && (
          <p className="hidden lg:block">
            Materia prima certificada y fabricada bajo normativa{' '}
            <span className="font-medium">ASTM A653</span> de grado estructural.
            Calidad garantizada bajo norma{' '}
            <span className="font-medium">NEMA VE-1</span>
          </p>
        )}
      </div>
    </div>
  )
}

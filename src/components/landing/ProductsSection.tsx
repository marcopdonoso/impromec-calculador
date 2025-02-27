import { appLinks } from '@/constants/links.constants'
import Image from 'next/image'
import Link from 'next/link'
import Button from '../Button'

export default function ProductsSection() {
  return (
    <section
      className="flex flex-col items-center py-12 lg:py-40"
      id="products"
    >
      <h4 className="body_large_semibold mb-2 text-center lg:heading_h4 lg:mb-5">
        Productos
      </h4>
      <div className="w-full px-4 lg:px-64">
        <p className="body_small_regular mb-2 text-center lg:body_large_regular">
          Encuentra bandejas portacables tipo escalerilla y canal. Cada tipo con
          sus características específicas para diferentes necesidades y
          entornos.
        </p>
      </div>
      <div className="mb-9 w-full pr-4 lg:m-0 lg:-mb-3 lg:px-44">
        <Image
          src={'/img/products_mobile.webp'}
          alt="products"
          width={1368}
          height={912}
          className="h-auto w-full lg:hidden"
        />
        <Image
          src={'/img/products_desktop.webp'}
          alt="products"
          width={3034}
          height={1360}
          className="hidden h-auto w-full lg:block"
        />
      </div>
      <div className="w-full px-4 text-center">
        <Link href={appLinks.productsHome.path}>
          <Button className="lg:w-[32vw]">Ver todos los productos</Button>
        </Link>
      </div>
    </section>
  )
}

'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import Button from '@/components/Button'
import Carousel, { ImageProps } from '@/components/Carousel'
import { appLinks } from '@/constants/links.constants'
import Link from 'next/link'
import LoadingPage from '../components/LoadingPage'
import CertificationInfoCard from './components/CertificationInfoCard'
import LoadingDiagramsCollapsible from './components/LoadingDiagramsCollapsible'
import OpenTechFiles from './components/OpenTechFiles'
import TechnicalDetails from './components/TechnicalDetails'
import { useProduct } from './hooks/useProduct'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { product, loading, error } = useProduct({ slug: params.slug })

  if (loading) return <LoadingPage />
  if (error) return <p>Error: {error}</p>

  if (!product) return

  const images: ImageProps[] = product.images?.map((image) => {
    return {
      src: image.url,
      alt: image.name,
    }
  })

  return (
    <div className="min-h-screen">
      <Breadcrumbs className="hidden lg:block" />
      <div className="px-2 pb-20 pt-8 lg:px-28 lg:pt-4 lg:text-center">
        <h4 className="heading_h4 hidden lg:mb-14 lg:block lg:text-start">
          {product.name}
        </h4>

        <div className="lg:flex lg:flex-row-reverse lg:justify-end lg:gap-6">
          <div className="flex flex-col justify-center text-center lg:flex-1 lg:justify-start lg:rounded-lg lg:bg-gray-white lg:px-4 lg:text-start">
            <h2 className="body_large_semibold lg:heading_h6 lg:mb-2">
              {product.name}
            </h2>
            <p className="body_small_medium lg:body_large_semibold">
              Tipo {product.type}
            </p>
            <div className="hidden lg:block">
              <TechnicalDetails product={product} />
            </div>
          </div>

          <div className="mt-8 flex w-full justify-center lg:mt-0 lg:w-fit lg:justify-start">
            {images && <Carousel images={images} />}
          </div>
        </div>

        <div className="lg:hidden">
          <TechnicalDetails product={product} />
        </div>

        <OpenTechFiles product={product} />

        <div className="mt-3 rounded-2xl border border-gray-input bg-gray-white px-4 py-5 lg:mt-12 lg:flex lg:justify-between lg:px-10 lg:py-6">
          <p className="body_medium_medium text-gray-placeholder">Material:</p>
          <p className="body_medium_medium">Acero Galvanizado ASTM A653</p>
        </div>

        <CertificationInfoCard />

        <LoadingDiagramsCollapsible product={product} />

        <Link href={appLinks.productsHome.path}>
          <Button variant="secondary" className="mt-4 lg:w-[430px]">
            Volver atrás
          </Button>
        </Link>
      </div>
    </div>
  )
}

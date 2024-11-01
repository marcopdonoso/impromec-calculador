'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import Button from '@/components/Button'
import Carousel, { ImageProps } from '@/components/Carousel'
import ListItem from '@/components/ListItem'
import { appLinks } from '@/constants/links.constants'
import { ProductDetails } from '@/models/product.model'
import { fetchProductById } from '@/services/productService'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FolderOpenIcon,
} from '@heroicons/react/24/outline'
import * as Collapsible from '@radix-ui/react-collapsible'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import TechnicalDetails from './components/TechnicalDetails'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<ProductDetails | null>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setLoading(true)
    const id = params.slug
    void (async () => {
      try {
        const { product } = await fetchProductById(id)
        setProduct(product)
      } catch (error) {
        if (error instanceof Error) setError(error.message)
      } finally {
        setLoading(false)
      }
    })()
  }, [params.slug])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  if (!product) return

  const images: ImageProps[] = product.images?.map((image) => {
    return {
      src: image.url,
      alt: image.name,
    }
  })

  const docsUrls = product.docs?.map((doc) => {
    return `${doc.url}`
  })

  const onDownloadTechFilesClick = () => {
    docsUrls?.map((url) => window.open(url))
  }

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

        <div className="mt-4 flex items-center justify-between lg:mt-7">
          <p className="body_large_semibold lg:heading_h6">
            Documentación técnica
          </p>
          <a onClick={onDownloadTechFilesClick}>
            <Button
              variant="icon_right"
              icon={<FolderOpenIcon />}
              className="lg:hidden"
            />
            <Button
              variant="icon_right"
              icon={<FolderOpenIcon />}
              className="hidden lg:block lg:w-80"
            >
              Abrir documentación técnica
            </Button>
          </a>
        </div>

        <div className="mt-3 rounded-2xl border border-gray-input bg-gray-white px-4 py-5 lg:mt-12 lg:flex lg:justify-between lg:px-10 lg:py-6">
          <p className="body_medium_medium text-gray-placeholder">Material:</p>
          <p className="body_medium_medium">Acero Galvanizado ASTM A653</p>
        </div>

        <div className="mt-4 rounded-2xl border border-gray-input bg-gray-white px-4 pt-5 text-start lg:mt-2 lg:px-10 lg:pt-6">
          <p className="body_small_medium text-gray-placeholder lg:body_medium_medium">
            Certificación:
          </p>
          <ul className="mt-1 flex flex-col gap-1 lg:mt-6">
            <ListItem>
              Materia prima de grado estructural, certificada y fabricada bajo
              normativa ASTM A653.
            </ListItem>
            <ListItem>
              Aseguramos y garantizamos la calidad de nuestros productos en
              cumplimiento de la norma internacional NEMA VE-1.
            </ListItem>
            <ListItem>
              Certificamos nuestras piezas luego de rigurosas pruebas
              destructivas supervisadas por IBNORCA.
            </ListItem>
          </ul>
          <div className="flex w-full items-center justify-center gap-4 lg:justify-start">
            <Image
              src={'/svg/logo_nema.svg'}
              alt="logo_nema"
              width={166}
              height={50}
              className="h-auto w-28 lg:w-40"
            />
            <Image
              src={'/svg/logo_astm.svg'}
              alt="logo_nema"
              width={201.49}
              height={40}
              className="h-auto w-28 lg:w-40"
            />
          </div>
        </div>

        <Collapsible.Root
          open={isOpen}
          onOpenChange={setIsOpen}
          className="mt-6 w-full"
        >
          <Collapsible.Trigger className="mb-4 flex h-12 w-full items-center justify-between rounded-lg bg-gray-input px-4 lg:mb-8">
            <p className="body_small_medium lg:body_medium_medium">
              Diagramas de carga
            </p>
            {isOpen ? (
              <ChevronUpIcon className="w-5" />
            ) : (
              <ChevronDownIcon className="w-5" />
            )}
          </Collapsible.Trigger>
          <Collapsible.Content className="flex justify-center">
            <div className="flex max-w-[752px] flex-wrap gap-5 lg:max-w-[800px] lg:gap-8 xl:max-w-[1056px]">
              {product.categories.map((category) => {
                return category.loadingDiagrams?.map((diagram) => {
                  return (
                    <Image
                      src={diagram.url}
                      alt={diagram.name}
                      key={diagram.documentId}
                      height={371}
                      width={600}
                      className="h-auto w-full max-w-[366px] lg:max-w-[384px] xl:max-w-lg"
                    />
                  )
                })
              })}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
        <Link href={appLinks.productsHome.path}>
          <Button variant="secondary" className="mt-4 lg:w-[430px]">
            Volver atrás
          </Button>
        </Link>
      </div>
    </div>
  )
}

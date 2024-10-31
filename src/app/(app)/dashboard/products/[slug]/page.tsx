'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import Button from '@/components/Button'
import Carousel, { ImageProps } from '@/components/Carousel'
import ListItem from '@/components/ListItem'
import MyListbox, { Option } from '@/components/MyListbox'
import MyRadiogroup, { RadioGroupItem } from '@/components/MyRadiogroup'
import { appLinks } from '@/constants/links.constants'
import { ProductDetails } from '@/models/product.model'
import { fetchProductById } from '@/services/productService'
import { capitalizeFirstLetter } from '@/utilities/capitalize-first-letter.utility'
import {
  ArrowDownTrayIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import * as Collapsible from '@radix-ui/react-collapsible'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<ProductDetails | null>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0)

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

  const radioGroupItems: RadioGroupItem[] = product.categories.map(
    (category, idx) => {
      return {
        label: `${capitalizeFirstLetter(category.name)} (resiste hasta ${category.loadResistanceInKgM}kg/ml)`,
        value: idx,
      }
    }
  )

  const onSelecCategory = (selectedOption: any) => {
    const selectedOptionIdx = selectedOption
    setSelectedCategoryIdx(selectedOptionIdx)
  }

  const heightsListboxOptions: Option[] = product.categories[
    selectedCategoryIdx
  ].heights.map((height) => {
    return { text: height.name.slice(2) + 'mm', value: height.name }
  })

  const widthsListboxOptions: Option[] = product.categories[
    selectedCategoryIdx
  ].widths.map((width) => {
    return { text: width.name.slice(2) + 'mm', value: width.name }
  })

  return (
    <div className="min-h-screen">
      <Breadcrumbs className="hidden lg:block" />
      <div className="px-2 pb-20 pt-8">
        <div className="flex flex-col justify-center">
          <h2 className="body_large_semibold text-center">{product.name}</h2>
          <p className="body_small_medium text-center">Tipo {product.type}</p>
        </div>

        <div className="mt-8 flex w-full justify-center">
          {images && <Carousel images={images} />}
        </div>

        <div className="rounded-lg bg-gray-white px-2 pb-3">
          <div className="mt-8 flex items-center gap-2 text-green-success">
            <CheckCircleIcon className="w-6" />
            <p className="body_small_regular">Disponible</p>
          </div>

          <div className="body_small_regular flex flex-col gap-6 pt-6">
            <p>{product.description}</p>
            <p>
              Diseñamos nuestros productos priorizando la seguridad, resistencia
              y durabilidad, sometiéndolos a exhaustivas pruebas antes de
              ofrecerlos a los clientes.
            </p>
            <p className="text-gray-text_inactive">
              Referencia {product?.code}
            </p>
          </div>

          <Button icon={<PhoneIcon />} className="mt-6">
            Solicitar asesoría de un ejecutivo
          </Button>

          <div className="mt-4 flex flex-col gap-6 p-4">
            <h4 className="body_large_semibold">Detalles del producto</h4>
            <MyRadiogroup
              items={radioGroupItems}
              className="flex flex-col gap-4"
              onChange={onSelecCategory}
            />
            <hr className="text-gray-placeholder" />
          </div>

          <div className="mt-6 flex gap-2">
            <MyListbox
              variant="standard"
              label="Altura"
              options={heightsListboxOptions}
            />
            <MyListbox
              variant="standard"
              label="Ancho"
              options={widthsListboxOptions}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="body_large_semibold">Ficha técnica</p>
          <Button
            variant="icon_right"
            icon={<ArrowDownTrayIcon />}
            className="lg:hidden"
          />
          <Button
            variant="icon_right"
            icon={<ArrowDownTrayIcon />}
            className="hidden lg:block"
          >
            Descargar documentación técnica
          </Button>
        </div>

        <div className="mt-3 rounded-2xl border border-gray-input bg-gray-white px-4 py-5">
          <p className="body_medium_medium text-gray-placeholder">Material:</p>
          <p className="body_medium_medium">Acero Galvanizado ASTM A653</p>
        </div>

        <div className="mt-4 rounded-2xl border border-gray-input bg-gray-white px-4 py-5">
          <p className="body_small_medium text-gray-placeholder">
            Certificación:
          </p>
          <ul className="mt-1">
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
          <div className="mt-4 flex items-center justify-center gap-4">
            <Image
              src={'/svg/logo_nema.svg'}
              alt="logo_nema"
              width={166}
              height={50}
              className="h-9 w-auto"
            />
            <Image
              src={'/svg/logo_astm.svg'}
              alt="logo_nema"
              width={201.49}
              height={40}
              className="h-8 w-auto"
            />
          </div>
        </div>

        <Collapsible.Root
          open={isOpen}
          onOpenChange={setIsOpen}
          className="mt-6 w-full"
        >
          <Collapsible.Trigger className="mb-4 flex h-12 w-full items-center justify-between rounded-lg bg-gray-input px-4">
            <p className="body_small_medium lg:body_medium_medium">
              Diagramas de carga
            </p>
            {isOpen ? (
              <ChevronUpIcon className="w-5" />
            ) : (
              <ChevronDownIcon className="w-5" />
            )}
          </Collapsible.Trigger>
          <Collapsible.Content>
            <div className="flex flex-col gap-5">
              {product.categories.map((category) => {
                return category.loadingDiagrams?.map((diagram) => {
                  return (
                    <Image
                      src={diagram.url}
                      alt={diagram.name}
                      key={diagram.documentId}
                      height={371}
                      width={600}
                      className="h-auto w-full"
                    />
                  )
                })
              })}
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
        <Link href={appLinks.productsHome.path}>
          <Button variant="secondary" className="mt-4">
            Volver atrás
          </Button>
        </Link>
      </div>
    </div>
  )
}

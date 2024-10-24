'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import CatalogProductCard from '@/components/CatalogProductCard'
import CheckboxList from '@/components/CheckboxList'
import InputSearch from '@/components/InputSearch'
import MyListbox, { Option } from '@/components/MyListbox'
import Pagination from '@/components/Pagination/Pagination'
import { ProductToCard } from '@/models/product.model'
import { trayTypes } from '@/models/tray.model'
import { capitalizeFirstLetter } from '@/utilities/capitalize-first-letter.utility'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

interface TrayToCard {
  id: string
  name: string
  type: string
  image?: string
}

interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

interface Meta {
  pagination: Pagination
}

export default function ProductsPage() {
  const paginationSize = 6
  const [currPage, setCurrPage] = useState(1)
  const [products, setProducts] = useState<ProductToCard[] | null>()
  const [paginationMetadata, setPaginationMetadata] =
    useState<Pagination | null>()
  const [sortValue, setSortValue] = useState('asc')
  const [trayTypesFilter, setTrayTypesFilter] = useState<string[]>([
    'escalerilla',
    'canal',
  ])
  const [query, setQuery] = useState<string | null>()
  const [value] = useDebounce(query, 300)

  const searchParams = useSearchParams()

  useEffect(() => {
    const search = searchParams.get('query')
    setQuery(search)
  }, [searchParams])

  // TODO: Cambiar a fetching de datos definitivo
  useEffect(() => {
    const searchFilter = value ? `&filters[name][$containsi]=${value}` : ''

    const filtersMapping = trayTypesFilter.map((filterValue, idx) => {
      return `filters[$or][${idx}][type][$eqi]=${filterValue}`
    })

    const filters = `${filtersMapping.join('&')}${searchFilter}`

    void (async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products?${filters}&populate[images][populate]&sort=name:${sortValue}&pagination[page]=${currPage}&pagination[pageSize]=${paginationSize}`
      )
      if (!res.ok) return
      const data = await res.json()
      const products: ProductToCard[] = data.data
      const metadata: Meta = data.meta
      const pagination: Pagination = metadata.pagination
      setProducts(products)
      setPaginationMetadata(pagination)
    })()
  }, [currPage, value, sortValue, trayTypesFilter])

  if (!products || !paginationMetadata) return <p>Loading...</p>

  const trays: TrayToCard[] = products.map((product) => {
    return {
      id: product.documentId,
      name: product.name,
      type: `Tipo ${capitalizeFirstLetter(product.type)}`,
      image: `${process.env.NEXT_PUBLIC_BASE_URL}${product.images[0].url}`,
    }
  })

  const trayTypeListoptions = trayTypes.map((trayType) =>
    capitalizeFirstLetter(trayType)
  )
  const sortListboxOptions: Option[] = [
    {
      text: 'Orden alfabético (A-Z)',
      value: 'asc',
    },
    {
      text: 'Orden alfabético (Z-A)',
      value: 'desc',
    },
  ]

  const onPageChange = (currPage: number) => {
    setCurrPage(currPage)
  }

  const onChangeSort = (selectedOption: Option) => {
    setSortValue(selectedOption.value as string)
  }

  const onChangeTrayTypeCheckbox = (selectedOptions: string[]) => {
    setTrayTypesFilter(selectedOptions)
  }

  return (
    <div className="mx-auto min-h-screen max-w-xl lg:mx-0 lg:max-w-none">
      <Breadcrumbs className="hidden lg:block" />
      <div className="w-full px-4 pb-20 pt-10 lg:flex lg:flex-col lg:px-28 lg:pt-4">
        <h4 className="heading_h4 hidden lg:mb-8 lg:block">
          Bandejas portacables
        </h4>
        <InputSearch placeholder="Buscar" />
        <div className="mb-8 lg:mb-20 lg:flex lg:flex-grow lg:gap-8">
          <div className="mt-6 w-full lg:mt-[72px] lg:w-fit">
            <CheckboxList
              legend="Tipo de bandeja"
              options={trayTypeListoptions}
              onChange={onChangeTrayTypeCheckbox}
            />
          </div>
          <div className="flex flex-col lg:w-full lg:items-end">
            <div className="mb-8 mt-6 lg:my-6">
              <MyListbox
                variant="sorting"
                label="Ordenar por:"
                options={sortListboxOptions}
                className="justify-end"
                onChange={onChangeSort}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-2 lg:justify-end lg:gap-4">
              {trays.map((tray, idx) => {
                return (
                  <CatalogProductCard
                    key={tray.id}
                    image={tray.image}
                    alt={tray.name}
                    primaryText={tray.name}
                    secondaryText={tray.type}
                    id={tray.id}
                    priority={idx < 4}
                  />
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <Pagination
            totalPages={paginationMetadata.pageCount}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  )
}

// http://localhost:1337/api/products?populate[categories][populate][0]=heights&populate[categories][populate][1]=widths&populate[images][populate]&populate[docs][populate]

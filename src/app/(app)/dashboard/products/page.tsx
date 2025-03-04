'use client'
import Breadcrumbs from '@/components/Breadcrumbs'
import CatalogProductCard from '@/components/CatalogProductCard'
import CheckboxList from '@/components/CheckboxList'
import InputSearch from '@/components/InputSearch'
import MyListbox, { Option } from '@/components/MyListbox'
import Pagination from '@/components/Pagination/Pagination'
import { appLinks } from '@/constants/links.constants'
import { trayTypes } from '@/models/tray.model'
import { capitalizeFirstLetter } from '@/utilities/capitalize-first-letter.utility'
import Link from 'next/link'
import { useState } from 'react'
import NoSearchResults from './components/NoSearchResults'
import ProductsSkeleton from './components/ProductsSkeleton'
import { useFilters } from './hooks/useFilters'
import { useProducts } from './hooks/useProducts'

interface TrayToCard {
  id: string
  name: string
  type: string
  image?: string
}

export default function ProductsPage() {
  const paginationSize = 6
  const [currPage, setCurrPage] = useState(1)
  const [sortValue, setSortValue] = useState('asc')
  const [trayTypesFilter, setTrayTypesFilter] = useState<string[]>([])

  const { filters } = useFilters({
    trayTypesFilter,
  })

  const { products, paginationMetadata, error, loading } = useProducts({
    filters,
    sortValue,
    currPage,
    paginationSize,
  })

  if (error) throw error

  const trays: TrayToCard[] | null = products
    ? products.map((product) => {
        return {
          id: product.documentId,
          name: product.name,
          type: `Tipo ${capitalizeFirstLetter(product.type)}`,
          image: product.images
            ? product.images[0].url
            : '/svg/landscape-placeholder.svg',
        }
      })
    : null

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
          <div className="flex flex-col pt-6 lg:w-full lg:items-end">
            {!loading && trays && trays?.length > 0 ? (
              <div className="mb-8 lg:mb-6">
                <MyListbox
                  variant="sorting"
                  label="Ordenar por:"
                  options={sortListboxOptions}
                  className="justify-end"
                  value={
                    sortListboxOptions.find(
                      (option) => option.value === sortValue
                    ) || sortListboxOptions[0]
                  }
                  onChange={onChangeSort}
                />
              </div>
            ) : (
              <div className="h-14 lg:h-12" />
            )}

            <div className="flex flex-wrap justify-center gap-2 lg:justify-end lg:gap-4">
              {!loading && trays && trays?.length > 0 ? (
                trays?.map((tray, idx) => {
                  return (
                    <Link
                      href={`${appLinks.productsHome.path}/${tray.id}`}
                      key={tray.id}
                    >
                      <CatalogProductCard
                        image={tray.image}
                        alt={tray.name}
                        primaryText={tray.name}
                        secondaryText={tray.type}
                        id={tray.id}
                        priority={idx < 4}
                      />
                    </Link>
                  )
                })
              ) : !loading && trays?.length === 0 ? (
                <NoSearchResults />
              ) : (
                <ProductsSkeleton />
              )}
            </div>
          </div>
        </div>
        {!loading && trays && trays?.length > 0 && (
          <div className="flex w-full justify-center">
            <Pagination
              totalPages={paginationMetadata?.pageCount ?? 0}
              onChange={onPageChange}
            />
          </div>
        )}
      </div>
    </div>
  )
}

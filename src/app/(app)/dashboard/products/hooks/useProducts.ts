import { PaginationMetadata, ProductToCard } from '@/models/product.model'
import { fetchProducts } from '@/services/productService'
import { useEffect, useState } from 'react'

interface UseProductsProps {
  filters: string
  sortValue: string
  currPage: number
  paginationSize: number
}

export function useProducts({
  filters,
  sortValue,
  currPage,
  paginationSize,
}: UseProductsProps) {
  const [products, setProducts] = useState<ProductToCard[] | null>()
  const [paginationMetadata, setPaginationMetadata] =
    useState<PaginationMetadata | null>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // TODO: Cambiar a fetching de datos definitivo
  useEffect(() => {
    setLoading(true)
    void (async () => {
      try {
        const { products, pagination } = await fetchProducts({
          filters,
          sortValue,
          currPage,
          paginationSize,
        })
        setProducts(products)
        setPaginationMetadata(pagination)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        }
      } finally {
        setLoading(false)
      }
    })()
  }, [currPage, filters, paginationSize, sortValue])

  return {
    products,
    paginationMetadata,
    error,
    loading,
  }
}

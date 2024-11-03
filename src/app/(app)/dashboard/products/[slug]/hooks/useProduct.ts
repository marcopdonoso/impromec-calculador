import { ProductDetails } from '@/models/product.model'
import { fetchProductById } from '@/services/productService'
import { useEffect, useState } from 'react'

interface UseProductProps {
  slug: string
}

export function useProduct({ slug }: UseProductProps) {
  const [product, setProduct] = useState<ProductDetails | null>()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const id = slug
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
  }, [slug])

  return { product, loading, error }
}

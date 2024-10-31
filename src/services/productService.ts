interface FetchProductsProps {
  filters: string
  sortValue: string
  currPage: number
  paginationSize: number
}

export async function fetchProducts({
  filters,
  sortValue,
  currPage,
  paginationSize,
}: FetchProductsProps) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CATALOG_BASE_URL}/api/products?${filters}&populate[images][populate]&sort=name:${sortValue}&pagination[page]=${currPage}&pagination[pageSize]=${paginationSize}`
  )
  if (!res.ok) throw new Error('Error al traer los productos')

  const data = await res.json()
  return {
    products: data.data,
    pagination: data.meta.pagination,
  }
}

export async function fetchProductById(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_CATALOG_BASE_URL}/api/products/${id}?populate[categories][populate][0]=heights&populate[categories][populate][1]=widths&populate[categories][populate][2]=loadingDiagrams&populate[images][populate]&populate[docs][populate]`
  )
  if (!res.ok) throw new Error('Error al traer el producto')

  const data = await res.json()
  return { product: data.data }
}

// http://localhost:1337/api/products?populate[categories][populate][0]=heights&populate[categories][populate][1]=widths&populate[images][populate]&populate[docs][populate]

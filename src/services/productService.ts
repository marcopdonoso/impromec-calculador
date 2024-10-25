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

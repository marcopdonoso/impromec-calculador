import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDebounce } from 'use-debounce'

interface UseFiltersProps {
  trayTypesFilter: string[]
}

export function useFilters({ trayTypesFilter }: UseFiltersProps) {
  const [query, setQuery] = useState<string | null>(null)
  const [debouncedQuery] = useDebounce(query, 300)

  const searchParams = useSearchParams()
  const searchFilter = debouncedQuery
    ? `&filters[name][$containsi]=${debouncedQuery}`
    : ''

  const filtersMapping = trayTypesFilter.map((filterValue, idx) => {
    return `filters[$or][${idx}][type][$eqi]=${filterValue}`
  })

  const filters = `${filtersMapping.join('&')}${searchFilter}`

  useEffect(() => {
    const search = searchParams.get('query')
    setQuery(search)
  }, [searchParams])

  return { filters }
}

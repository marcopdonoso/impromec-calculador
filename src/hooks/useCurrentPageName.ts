import { getNameByPathname } from '@/utilities/get-name-by-pathname.utility'
import { usePathname } from 'next/navigation'

export default function useCurrentPageName() {
  const pathname = usePathname()
  const currPage = getNameByPathname(pathname) || null
  return currPage
}

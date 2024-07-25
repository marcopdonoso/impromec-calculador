import { usePathname } from 'next/navigation'

export default function useCurrentPageName() {
  const pathname = usePathname()
  const currPage = pathname.split('/').pop() || 'inicio'

  return currPage
}

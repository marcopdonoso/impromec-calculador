'use client'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type BreadcrumbItem = {
  name: string
  path: string
}

const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const pathnames = pathname.split('/').filter((x) => x)
  return pathnames.map((_, idx) => {
    const path = `/${pathnames.slice(0, idx + 1).join('/')}`
    const name = pathnames[idx]
    return { name, path }
  })
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <nav>
      <ol className="flex gap-2">
        <li>
          <Link className="flex gap-2 text-gray-text_inactive" href={'/'}>
            <HomeIcon className="w-6" />
            Inicio
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, idx) => {
          return (
            <li key={breadcrumb.path} className="flex gap-2">
              <ChevronRightIcon className="w-5 text-gray-text_inactive" />
              {idx === breadcrumbs.length - 1 ? (
                <span className="font-medium text-gray-text">
                  {breadcrumb.name}
                </span>
              ) : (
                <Link
                  className="text-gray-text_inactive"
                  href={breadcrumb.path}
                >
                  {breadcrumb.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

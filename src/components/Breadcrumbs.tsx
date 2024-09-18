'use client'
import { getNameByPathname } from '@/utilities/get-name-by-pathname.utility'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type BreadcrumbItem = {
  name: string | null
  path: string
}

const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const pathnames = pathname.split('/').filter((x) => x)
  const breadcrumbs: BreadcrumbItem[] = pathnames
    .map((_, idx) => {
      const path = `/${pathnames.slice(0, idx + 1).join('/')}`
      const name = getNameByPathname(path)
      return { name, path }
    })
    .filter((breadcrumb) => breadcrumb.name !== null)
  return breadcrumbs
}

interface BreadcrumbsProps {
  className?: string
}

export default function Breadcrumbs({ className }: BreadcrumbsProps) {
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)

  return (
    <nav className={clsx('hidden lg:block', className)}>
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

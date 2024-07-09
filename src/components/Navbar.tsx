import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export interface Navlink {
  name: string
  path: string
}

interface NavbarProps {
  navlinks: Navlink[]
}

export default function Navbar({ navlinks }: NavbarProps) {
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setActiveLink(pathname)
  }, [pathname])

  return (
    <nav className="flex flex-col sm:flex-row sm:gap-10">
      {navlinks.map((navlink) => {
        return (
          <Link
            key={navlink.name}
            href={navlink.path}
            onClick={() => setActiveLink(navlink.path)}
            className={clsx(
              'w-52 py-3 pl-4 text-sm text-gray-text hover:bg-gray-button_primary hover:text-gray-white sm:w-auto sm:p-0 sm:text-base sm:font-medium sm:text-gray-text_inactive sm:hover:bg-gray-white sm:hover:text-gray-text',
              {
                'bg-gray-button_primary text-gray-white sm:bg-gray-white sm:text-gray-text':
                  activeLink === navlink.path,
              }
            )}
          >
            {navlink.name}
          </Link>
        )
      })}
    </nav>
  )
}

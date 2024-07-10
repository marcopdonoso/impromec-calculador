'use client'
import { navlinks } from '@/app/page'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    setActiveLink(pathname)
  }, [pathname])

  return (
    <nav className="flex flex-col sm:flex-row sm:items-center sm:gap-10">
      {navlinks.map((navlink) => {
        return (
          <Link
            key={navlink.name}
            href={navlink.path}
            onClick={() => setActiveLink(navlink.path)}
            className={clsx(
              'w-52 py-3 pl-4 text-sm hover:bg-gray-button_primary hover:text-gray-white sm:w-auto sm:p-0 sm:text-base sm:font-medium sm:hover:bg-gray-white sm:hover:text-gray-text',
              {
                'bg-gray-button_primary text-gray-white sm:bg-gray-white sm:text-gray-text':
                  activeLink === navlink.path,
                'text-gray-text sm:text-gray-text_inactive':
                  activeLink !== navlink.path,
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

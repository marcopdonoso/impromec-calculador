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
    <nav className="flex flex-col lg:flex-row lg:items-center lg:gap-10">
      {navlinks.map((navlink) => {
        return (
          <Link
            key={navlink.name}
            href={navlink.path}
            onClick={() => setActiveLink(navlink.path)}
            className={clsx(
              'w-52 py-3 pl-4 text-sm hover:bg-gray-button_primary hover:text-gray-white lg:w-auto lg:p-0 lg:text-base lg:font-medium lg:hover:bg-gray-white lg:hover:text-gray-text',
              {
                'bg-gray-button_primary text-gray-white lg:bg-gray-white lg:text-gray-text':
                  activeLink === navlink.path,
                'text-gray-text lg:text-gray-text_inactive':
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

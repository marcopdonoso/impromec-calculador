'use client'
import {
  loggedNavbarLinks,
  noLoggedNavbarLinks,
} from '@/constants/links.constants'
import { useUserStore } from '@/store/useStore'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

interface NavbarProps {
  className?: string
  footer?: boolean
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>
}

export default function Navbar({
  className,
  footer,
  setIsMenuOpen,
}: NavbarProps) {
  const [activeLink, setActiveLink] = useState<string | null>(null)
  const pathname = usePathname()
  const { user } = useUserStore()

  const navlinks = user ? loggedNavbarLinks : noLoggedNavbarLinks

  useEffect(() => {
    setActiveLink(pathname)
  }, [pathname])

  return (
    <nav
      className={clsx(
        'lg:flex-row lg:items-center lg:gap-4 xl:gap-10',
        className
      )}
    >
      {navlinks.map((navlink) => {
        return (
          <Link
            key={navlink.name}
            href={navlink.path}
            onClick={() => {
              setActiveLink(navlink.path)
              setIsMenuOpen && setIsMenuOpen(false)
            }}
            className={clsx(
              'w-52 py-3 pl-4 text-sm hover:bg-gray-button_primary hover:text-gray-white lg:w-auto lg:p-0 lg:text-base lg:font-medium',
              {
                'bg-gray-button_primary text-gray-white lg:bg-gray-white lg:text-gray-text':
                  activeLink === navlink.path && !footer,
                'text-gray-text lg:text-gray-text_inactive':
                  activeLink !== navlink.path && !footer,
                'lg:text-gray-white lg:hover:text-gray-input': footer,
                'lg:hover:bg-gray-white lg:hover:text-gray-text': !footer,
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

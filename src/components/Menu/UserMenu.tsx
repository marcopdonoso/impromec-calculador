'use client'
import { authLinks } from '@/constants/links.constants'
import { logoutUser } from '@/services/user.service'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import ClickAwayListener from 'react-click-away-listener'

export default function UserMenu({
  setIsMenuOpen,
  setShowUserMenu,
  showUserMenu,
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
  setShowUserMenu: Dispatch<SetStateAction<boolean>>
  showUserMenu: boolean
}) {
  const router = useRouter()
  const handleCloseSession = async () => {
    await logoutUser()
    router.push(authLinks.login.path)
    router.refresh()
    setIsMenuOpen(false)
    setShowUserMenu(false)
  }

  const handleLinkButtonClick = () => {
    setIsMenuOpen(false)
    setShowUserMenu(false)
  }

  const handleClickAway = () => {
    if (!showUserMenu) return
    setTimeout(() => {
      setShowUserMenu(false)
    }, 10)
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="z-50 flex w-52 flex-col bg-gray-white lg:rounded-md lg:py-2 lg:shadow lg:shadow-shadow">
        <Link
          onClick={handleLinkButtonClick}
          href={'/dashboard/profile'}
          className="w-full py-3 pl-4 text-sm text-gray-text hover:bg-gray-button_primary hover:text-gray-white lg:py-2 lg:pl-5 lg:text-base"
        >
          Mi perfil
        </Link>
        <Link
          onClick={handleLinkButtonClick}
          href={'/dashboard/calculator/projects-list'}
          className="w-full py-3 pl-4 text-sm text-gray-text hover:bg-gray-button_primary hover:text-gray-white lg:border lg:border-x-0 lg:border-y-gray-background lg:py-2 lg:pl-5 lg:text-base"
        >
          Mis proyectos
        </Link>
        <button
          onClick={handleCloseSession}
          className="w-full py-3 pl-4 text-start text-sm text-gray-text hover:bg-gray-button_primary hover:text-gray-white lg:py-2 lg:pl-5 lg:text-base"
        >
          Cerrar sesión
        </button>
      </div>
    </ClickAwayListener>
  )
}

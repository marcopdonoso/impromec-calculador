import { Transition } from '@headlessui/react'
import { Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import Button from '../Button'
import AuthButtons from './AuthButtons'
import Logo from './Logo'
import Navbar from './Navbar'
import UserMenu from './UserMenu'
import UserSection from './UserSection'

interface MenuContentProps {
  showMenu: boolean
  toggleMenu: () => void
}

export default function MenuContent({
  showMenu,
  toggleMenu,
}: MenuContentProps) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const user = null // TODO CREAR STORE PARA ALMACENAR EL USUARIO

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleUserSectionClick = useCallback(() => {
    setShowUserMenu((prevShowUserMenu) => !prevShowUserMenu)
  }, [])

  return (
    <Transition
      show={showMenu || !isMobile}
      enter="ease-in-out transition duration-500"
      enterFrom="-translate-x-full opacity-0"
      enterTo="translate-x-0 opacity-100"
      leave="ease-out transition duration-500"
      leaveFrom="translate-x-0 opacity-100"
      leaveTo="-translate-x-full opacity-0"
    >
      <div
        className={clsx(
          'fixed left-0 top-0 z-50 flex min-h-screen w-fit flex-col bg-gray-white px-8 py-6 lg:static lg:h-fit lg:min-h-fit lg:w-screen lg:flex-row-reverse lg:justify-between lg:px-28 lg:py-6 lg:shadow-md'
        )}
      >
        {user ? (
          <div
            onClick={handleUserSectionClick}
            role="button"
            className="pointer-events-none lg:pointer-events-auto"
          >
            <UserSection user={user} />
          </div>
        ) : (
          <>
            <Bars3Icon
              onClick={toggleMenu}
              role="button"
              className="mb-3 w-7 text-gray-text lg:hidden"
            />
            <div className="hidden lg:block">
              <AuthButtons toggleMenu={toggleMenu} />
            </div>
          </>
        )}

        <hr className="my-5 text-gray-input lg:hidden" />
        <Navbar className="flex flex-col" toggleMenu={toggleMenu} />
        <hr className="my-5 text-gray-input lg:hidden" />
        {user ? (
          <div
            className={clsx('grow lg:absolute lg:top-20', {
              'lg:hidden': !showUserMenu,
            })}
          >
            <UserMenu />
          </div>
        ) : (
          <div className="mb-6 flex grow flex-col-reverse lg:hidden">
            <AuthButtons toggleMenu={toggleMenu} />
          </div>
        )}
        <div className="lg:hidden">
          <Button
            onClick={toggleMenu}
            type="button"
            variant="secondary"
            className="w-full"
            icon={<XCircleIcon className="w-6" />}
          >
            Cerrar
          </Button>
        </div>
        <div className="h-11 w-20">
          <Logo className="hidden lg:block" />
        </div>
      </div>
    </Transition>
  )
}

'use client'
import { userFromStore } from '@/app/page'
import { Transition } from '@headlessui/react'
import { Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Button from '../Button'
import AuthButtons from './AuthButtons'
import CollapsedHeaderMenu from './CollapsedHeaderMenu'
import Logo from './Logo'
import Navbar from './Navbar'
import UserMenu from './UserMenu'
import UserSection from './UserSection'

export default function HeaderMenu() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const user = userFromStore

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const showMenuToggler = () => {
    setShowMenu(!showMenu)
  }

  const handleUserSectionClick = () => {
    setShowUserMenu(!showUserMenu)
  }

  return (
    <>
      <div className="sm:hidden">
        <CollapsedHeaderMenu handleClick={showMenuToggler} />
      </div>
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
            'absolute left-0 flex h-screen flex-col bg-gray-white px-8 py-6 sm:fixed sm:h-fit sm:w-screen sm:flex-row-reverse sm:justify-between sm:px-28 sm:py-6 sm:shadow-md'
          )}
        >
          {user ? (
            <div
              onClick={handleUserSectionClick}
              role="button"
              className="pointer-events-none sm:pointer-events-auto"
            >
              <UserSection user={user} />
            </div>
          ) : (
            <>
              <Bars3Icon
                onClick={showMenuToggler}
                role="button"
                className="mb-3 w-7 text-gray-text sm:hidden"
              />
              <div className="hidden sm:block">
                <AuthButtons />
              </div>
            </>
          )}

          <hr className="my-5 text-gray-input sm:hidden" />
          <Navbar />
          <hr className="my-5 text-gray-input sm:hidden" />
          {user ? (
            <div
              className={clsx('grow sm:absolute sm:top-20', {
                'sm:hidden': !showUserMenu,
              })}
            >
              <UserMenu />
            </div>
          ) : (
            <div className="mb-6 flex grow flex-col-reverse sm:hidden">
              <AuthButtons />
            </div>
          )}
          <div className="sm:hidden">
            <Button
              onClick={showMenuToggler}
              type="button"
              variant="secondary"
              className="w-full"
              icon={<XCircleIcon className="w-6" />}
            >
              Cerrar
            </Button>
          </div>
          <Logo />
        </div>
      </Transition>
    </>
  )
}

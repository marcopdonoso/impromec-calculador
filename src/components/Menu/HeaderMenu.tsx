'use client'
import { Bars3Icon, XCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Button from '../Button'
import AuthButtons from './AuthButtons'
import Navbar from './Navbar'
import UserMenu from './UserMenu'
import UserSection from './UserSection'

export default function HeaderMenu() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const user = null
  const router = useRouter()

  const handleClose = () => {
    console.log('cerrar')
  }

  const handleUserSectionClick = () => {
    setShowUserMenu(!showUserMenu)
  }

  return (
    <div className="flex h-screen flex-col px-8 py-6 sm:h-fit sm:w-screen sm:flex-row-reverse sm:justify-between sm:px-28 sm:py-6">
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
          <Bars3Icon className="mb-3 w-7 sm:hidden" />
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
          onClick={handleClose}
          type="button"
          variant="secondary"
          className="w-full"
          icon={<XCircleIcon className="w-6" />}
        >
          Cerrar
        </Button>
      </div>
      <div
        role="button"
        onClick={() => {
          router.push('/')
        }}
        className="relative hidden h-auto min-w-20 sm:block"
      >
        <Image src="svg/Logo_iso.svg" alt="logo" fill priority />
      </div>
    </div>
  )
}

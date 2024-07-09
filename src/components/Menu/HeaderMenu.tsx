'use client'
import { XCircleIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import Button from '../Button'
import Navbar from './Navbar'
import UserMenu from './UserMenu'
import UserSection from './UserSection'

export default function HeaderMenu() {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const handleClose = () => {
    console.log('cerrar')
  }

  const handleUserSectionClick = () => {
    setShowUserMenu(!showUserMenu)
  }

  return (
    <div className="flex h-screen flex-col justify-between px-8 py-6 sm:h-fit sm:w-screen sm:flex-row-reverse sm:px-28 sm:py-6">
      <div
        onClick={handleUserSectionClick}
        role="button"
        className="pointer-events-none sm:pointer-events-auto"
      >
        <UserSection />
      </div>
      <hr className="my-5 text-gray-input sm:hidden" />
      <Navbar />
      <hr className="my-5 text-gray-input sm:hidden" />
      <div
        className={clsx('sm:absolute sm:top-20', {
          'sm:hidden': !showUserMenu,
        })}
      >
        <UserMenu />
      </div>
      <div className="h-12 sm:hidden">
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
      <div className="hidden min-w-20 sm:block">
        <Image
          src="svg/Logo_iso.svg"
          alt="logo"
          width={80}
          height={0}
          priority
        />
      </div>
    </div>
  )
}

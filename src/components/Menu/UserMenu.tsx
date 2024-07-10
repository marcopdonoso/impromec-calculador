'use client'
import Link from 'next/link'

export default function UserMenu() {
  const handleCloseSession = () => {}

  return (
    <div className="z-50 flex w-52 flex-col bg-gray-white sm:rounded-md sm:py-2 sm:shadow sm:shadow-shadow">
      <Link
        href={'/dashboard/profile'}
        className="w-full py-3 pl-4 text-sm text-gray-text hover:bg-gray-button_primary hover:text-gray-white sm:py-2 sm:pl-5 sm:text-base"
      >
        Mi perfil
      </Link>
      <Link
        href={'/dashboard/projects'}
        className="w-full py-3 pl-4 text-sm text-gray-text hover:bg-gray-button_primary hover:text-gray-white sm:border sm:border-x-0 sm:border-y-gray-background sm:py-2 sm:pl-5 sm:text-base"
      >
        Mis proyectos
      </Link>
      <button
        onClick={handleCloseSession}
        className="w-full py-3 pl-4 text-start text-sm text-gray-text hover:bg-gray-button_primary hover:text-gray-white sm:py-2 sm:pl-5 sm:text-base"
      >
        Cerrar sesión
      </button>
    </div>
  )
}

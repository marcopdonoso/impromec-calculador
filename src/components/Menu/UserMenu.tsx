'use client'
import Link from 'next/link'

export default function UserMenu() {
  const handleCloseSession = () => {
    console.log('Cerrar sesión')
  }

  return (
    <div className="z-50 flex w-52 flex-col bg-gray-white lg:rounded-md lg:py-2 lg:shadow lg:shadow-shadow">
      <Link
        href={'/dashboard/profile'}
        className="w-full py-3 pl-4 text-sm text-gray-text hover:bg-gray-button_primary hover:text-gray-white lg:py-2 lg:pl-5 lg:text-base"
      >
        Mi perfil
      </Link>
      <Link
        href={'/dashboard/projects'}
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
  )
}

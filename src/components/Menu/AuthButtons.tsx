import { authLinks } from '@/constants/links.constants'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import Button from '../Button'

export default function AuthButtons({
  setIsMenuOpen,
}: {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}) {
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-0">
      <Link href={authLinks.register.path} className="rounded-lg">
        <Button variant="register" onClick={closeMenu}>
          Registrarme
        </Button>
      </Link>

      <Link href={authLinks.login.path} className="rounded-lg">
        <Button variant="login" onClick={closeMenu}>
          Iniciar sesión
        </Button>
      </Link>
    </div>
  )
}

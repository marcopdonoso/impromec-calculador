import Link from 'next/link'
import Button from '../Button'

export default function AuthButtons({
  toggleMenu,
}: {
  toggleMenu: () => void
}) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-0">
      <Link href={'/register'} className="rounded-lg">
        <Button variant="register" onClick={toggleMenu}>
          Registrarme
        </Button>
      </Link>

      <Link href={'/login'} className="rounded-lg">
        <Button variant="login" onClick={toggleMenu}>
          Iniciar sesión
        </Button>
      </Link>
    </div>
  )
}

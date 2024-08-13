import Link from 'next/link'
import Button from '../Button'

export default function AuthButtons({
  toggleMenu,
}: {
  toggleMenu: () => void
}) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-0">
      <Button variant="register" onClick={toggleMenu}>
        <Link href={'/register'}>Registrarme</Link>
      </Button>
      <Button variant="login" onClick={toggleMenu}>
        <Link href={'/login'}>Iniciar sesión</Link>
      </Button>
    </div>
  )
}

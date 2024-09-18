import Button from '@/components/Button'
import Input from '@/components/Input'
import InputPass from '@/components/InputPass'
import { authLinks } from '@/constants/links.constants'
import Link from 'next/link'

export default function LoginForm() {
  return (
    <form className="mt-10 flex w-full flex-col items-center">
      <Input
        type="email"
        label="Correo electrónico"
        placeholder="Ej: yo@correo.com"
        className="mb-6"
      />
      <InputPass label="Contraseña" />
      <Link
        href={authLinks.forgotPass.path}
        className="body_small_regular mb-20 mt-1 w-full text-end text-gray-text_alt"
      >
        ¿Olvidaste tu contraseña?
      </Link>
      <Button>Iniciar sesión</Button>
    </form>
  )
}

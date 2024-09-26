import Button from '@/components/Button'
import InputPass from '@/components/InputPass'
import { authLinks } from '@/constants/links.constants'
import Link from 'next/link'

export default function ResetPasswordForm() {
  return (
    <form className="mt-6 flex w-full flex-col items-center lg:mt-10">
      <InputPass
        label="Nueva contraseña"
        placeholder="8+caracteres: letras, números, símbolos"
        className="mb-4 lg:mb-6"
      />
      <InputPass
        label="Confirmar contraseña"
        placeholder="8+caracteres: letras, números, símbolos"
        className="mb-14 lg:mb-20"
      />
      <Button type="submit" className="mb-4">
        Cambiar contraseña
      </Button>
      <Link href={authLinks.login.path} className="w-full rounded-lg">
        <Button type="button" variant="secondary">
          Cancelar
        </Button>
      </Link>
    </form>
  )
}

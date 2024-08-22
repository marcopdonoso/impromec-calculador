import Button from '@/components/Button'
import InputPass from '@/components/InputPass'
import Link from 'next/link'
import AuthFormCard from '../components/AuthFormCard'

export default function ResetPasswordPage() {
  return (
    <main className="px-2 pb-20 pt-24 lg:flex lg:items-center lg:justify-center lg:gap-28 lg:px-28 lg:py-7">
      <AuthFormCard
        title="Restablecer contraseña"
        description="Crea una nueva contraseña con al menos 8 caracteres, letras, números y símbolos  (!$@%)."
        footer="¿No tienes cuenta?"
        footerLink="/register"
        footerLinkText="Registrate"
        fullwidth={false}
      >
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
          <Link href={'/login'} className="w-full rounded-lg">
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </Link>
        </form>
      </AuthFormCard>
    </main>
  )
}

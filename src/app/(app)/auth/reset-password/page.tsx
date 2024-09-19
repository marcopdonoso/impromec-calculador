import { authLinks } from '@/constants/links.constants'
import AuthFormCard from '../components/AuthFormCard'
import ResetPasswordForm from './components/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-2 py-8 lg:px-28">
      <AuthFormCard
        title="Restablecer contraseña"
        description="Crea una nueva contraseña con al menos 8 caracteres, letras, números y símbolos  (!$@%)."
        footer="¿No tienes cuenta?"
        footerLink={authLinks.register.path}
        footerLinkText="Registrate"
        fullwidth={false}
      >
        <ResetPasswordForm />
      </AuthFormCard>
    </main>
  )
}

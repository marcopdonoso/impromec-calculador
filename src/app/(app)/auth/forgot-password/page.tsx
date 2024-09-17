import { authLinks } from '@/constants/links.constants'
import AuthFormCard from '../components/AuthFormCard'
import ForgotPassForm from './components/ForgotPassForm'

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-2 py-8 lg:px-28">
      <AuthFormCard
        title="¡Olvidaste tu contraseña!"
        description="Escribe el correo electrónico asociado a tu cuenta. Te enviaremos las instrucciones para restablecer tu contraseña."
        footer="¿No tienes cuenta?"
        footerLink={authLinks.register.path}
        footerLinkText="Registrate"
        fullwidth={false}
      >
        <ForgotPassForm />
      </AuthFormCard>
    </main>
  )
}

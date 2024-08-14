import AuthFormCard from '../components/AuthFormCard'
import ForgotPassForm from './components/ForgotPassForm'

export default function ForgotPasswordPage() {
  return (
    <main className="px-2 pb-20 pt-24 lg:flex lg:items-center lg:justify-center lg:gap-28 lg:px-28 lg:py-7">
      <AuthFormCard
        title="¡Olvidaste tu contraseña!"
        description="Escribe el correo electrónico asociado a tu cuenta. Te enviaremos las instrucciones para restablecer tu contraseña."
        footer="¿No tienes cuenta?"
        footerLink="/register"
        footerLinkText="Registrate"
        fullwidth={false}
      >
        <ForgotPassForm />
      </AuthFormCard>
    </main>
  )
}

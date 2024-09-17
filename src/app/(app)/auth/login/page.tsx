import { authLinks } from '@/constants/links.constants'
import AuthFormCard from '../components/AuthFormCard'
import LoginFeatures from './components/LoginFeatures'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-2 py-8 lg:gap-28 lg:px-28">
      <LoginFeatures />
      <AuthFormCard
        title="¡Bienvenido de vuelta!"
        description="Estamos felices de tenerte de vuelta. Accede a tu cuenta y continua con tus cálculos."
        footer="¿No tienes cuenta?"
        footerLink={authLinks.register.path}
        footerLinkText="Registrate"
        fullwidth={false}
      >
        <LoginForm />
      </AuthFormCard>
    </main>
  )
}

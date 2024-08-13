import AuthFormCard from '../components/AuthFormCard'
import LoginFeatures from './components/LoginFeatures'
import LoginForm from './components/LoginForm'

export default function LoginPage() {
  return (
    <main className="px-2 pb-20 pt-8 lg:flex lg:items-center lg:gap-28 lg:px-28 lg:py-7">
      <LoginFeatures />
      <AuthFormCard
        title="¡Bienvenido de vuelta!"
        description="Estamos felices de tenerte de vuelta. Accede a tu cuenta y continua con tus cálculos."
        footer="¿No tienes cuenta?"
        footerLink="/register"
        footerLinkText="Registrate"
        fullwidth={false}
      >
        <LoginForm />
      </AuthFormCard>
    </main>
  )
}

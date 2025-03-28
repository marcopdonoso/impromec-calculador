import { authLinks } from '@/constants/links.constants'
import AuthFormCard from '../components/AuthFormCard'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-2 py-8 lg:px-28">
      <AuthFormCard
        title="¡Regístrate y comienza hoy!"
        description="Accede y utiliza nuestra calculadora de bandejas portacables de forma segura y confiable."
        footer="¿Ya tienes una cuenta?"
        footerLink={authLinks.login.path}
        footerLinkText="Inicia sesión"
      >
        <RegisterForm />
      </AuthFormCard>
    </main>
  )
}

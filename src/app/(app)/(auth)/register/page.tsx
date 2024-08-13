import 'react-phone-number-input/style.css'
import AuthFormCard from '../components/AuthFormCard'
import RegisterForm from './components/RegisterForm'

export default function RegisterPage() {
  return (
    <main className="px-2 pb-20 pt-8 lg:px-28 lg:py-12">
      <AuthFormCard
        title="¡Regístrate y comienza hoy!"
        description="Accede y utiliza nuestra calculadora de bandejas portacables de forma segura y confiable."
        footer="¿Ya tienes una cuenta?"
        footerLink="/login"
        footerLinkText="Inicia sesión"
      >
        <RegisterForm />
      </AuthFormCard>
    </main>
  )
}

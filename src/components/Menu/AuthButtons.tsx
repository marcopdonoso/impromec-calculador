import Button from '../Button'

export default function AuthButtons() {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-0">
      <Button variant="register">Registrarme</Button>
      <Button variant="login">Iniciar sesión</Button>
    </div>
  )
}

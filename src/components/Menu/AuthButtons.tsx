import Button from '../Button'

export default function AuthButtons() {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:gap-0">
      <Button variant="register">Registrarme</Button>
      <Button variant="login">Iniciar sesión</Button>
    </div>
  )
}

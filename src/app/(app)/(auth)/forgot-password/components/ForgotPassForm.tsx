import Button from '@/components/Button'
import Input from '@/components/Input'

export default function ForgotPassForm() {
  return (
    <form className="mt-6 flex w-full flex-col items-center">
      <Input
        type="email"
        label="Correo electrónico"
        placeholder="Ej: yo@correo.com"
        className="mb-32"
      />
      <Button type="submit" variant="full">
        Enviar enlace
      </Button>
      <Button type="button" variant="secondary">
        Volver atrás
      </Button>
    </form>
  )
}

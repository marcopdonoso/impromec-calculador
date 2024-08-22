import Button from '@/components/Button'
import Input from '@/components/Input'
import Link from 'next/link'

export default function ForgotPassForm() {
  return (
    <form className="mt-6 flex w-full flex-col items-center lg:mt-10">
      <Input
        type="email"
        label="Correo electrónico"
        placeholder="Ej: yo@correo.com"
        className="mb-32"
      />
      <Button type="submit" className="mb-4 lg:mb-6">
        Enviar enlace
      </Button>
      <Link href={'/login'} className="w-full rounded-lg">
        <Button type="button" variant="secondary">
          Volver atrás
        </Button>
      </Link>
    </form>
  )
}

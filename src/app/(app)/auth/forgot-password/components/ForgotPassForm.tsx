'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { authLinks } from '@/constants/links.constants'
import { forgotPassword } from '@/services/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email('Correo inválido'),
})

export default function ForgotPassForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: { email: string }) => {
    const res = await forgotPassword(data.email)

    if (res.error) {
      setError('email', { message: res.error.message })
    }

    if (res.data) {
      alert(res.data.message)
      reset()
      window.location.href = authLinks.login.path
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex w-full flex-col items-center lg:mt-10"
    >
      <div className="mb-32 w-full">
        <Input
          type="email"
          label="Correo electrónico"
          placeholder="Ej: yo@correo.com"
          {...register('email')}
          error={errors.email?.message}
          className="mb-4"
        />
      </div>
      <Button type="submit" disabled={isSubmitting} className="mb-4 lg:mb-6">
        {isSubmitting ? 'Enviando...' : 'Enviar enlace'}
      </Button>
      <Link href={authLinks.login.path} className="w-full rounded-lg">
        <Button type="button" variant="secondary">
          Volver atrás
        </Button>
      </Link>
    </form>
  )
}

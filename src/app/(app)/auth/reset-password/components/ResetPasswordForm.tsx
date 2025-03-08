'use client'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import InputPass from '@/components/InputPass'
import { authLinks } from '@/constants/links.constants'
import { resetPassword } from '@/services/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z
  .object({
    password: z
      .string({
        required_error: 'Ingresa una contraseña.',
      })
      .min(8, 'Debe contener 8+caracteres')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        'Debe contener letras, números y símbolos'
      ),
    confirmPassword: z.string({
      required_error: 'Confirma tu contraseña.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  })

export default function ResetPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const token = useSearchParams().get('token')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const onSubmit = async (data: { password: string }) => {
    if (!token) {
      setError(
        'No hay token de restablecimiento. Por favor, solicita un nuevo enlace.'
      )
      return
    }

    const res = await resetPassword(token, data.password)

    if (res.error) {
      setSuccessMessage(null)
      setError(res.error.message)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }

    if (res.data) {
      setError(null)
      setSuccessMessage(res.data.message)
      setTimeout(() => {
        setSuccessMessage(null)
        window.location.href = authLinks.login.path
      }, 3000)
    }

    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex w-full flex-col items-center lg:mt-10"
    >
      <div className="mb-14 flex w-full flex-col gap-4 lg:mb-20 lg:gap-6">
        <InputPass
          label="Nueva contraseña"
          placeholder="8+caracteres: letras, números, símbolos"
          {...register('password')}
          error={errors.password?.message}
        />
        <InputPass
          label="Confirmar contraseña"
          placeholder="8+caracteres: letras, números, símbolos"
          {...register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />
      </div>
      {error && <Alert variant="error" paragraph={error} />}
      {successMessage && (
        <p className="body_small_regular text-center text-green-success lg:body_medium_regular">
          {successMessage}
        </p>
      )}
      <Button type="submit" className="my-4" disabled={isSubmitting}>
        {isSubmitting ? 'Cambiando...' : 'Cambiar contraseña'}
      </Button>
      <Link href={authLinks.login.path} className="w-full rounded-lg">
        <Button type="button" variant="secondary">
          Cancelar
        </Button>
      </Link>
    </form>
  )
}

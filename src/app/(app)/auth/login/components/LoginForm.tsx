'use client'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputPass from '@/components/InputPass'
import { appLinks, authLinks } from '@/constants/links.constants'
import { loginUser } from '@/services/user.service'
import { useUserStore } from '@/store/useStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { setCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ResendVerificationLink from './ResendVerificationLink'

const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})

export default function LoginForm() {
  const { setUser } = useUserStore()
  const router = useRouter()
  const [error, setError] = useState('')
  const [showResendVerification, setShowResendVerification] = useState(false)
  const [currentEmail, setCurrentEmail] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    setError('')
    const res = await loginUser(data)
    if (res.error) {
      // Si el error es específicamente que la cuenta no está verificada
      if (res.error.message?.includes('Cuenta no verificada')) {
        setCurrentEmail(data.email)
        setShowResendVerification(true)
      } else {
        setError(res.error.message)
      }
    }

    if (res.data) {
      const { access_token, user } = res.data
      setCookie('token', access_token, {
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
      })
      setUser(user)
      router.push(appLinks.home.path)
      router.refresh()
    }
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-10 flex w-full flex-col items-center"
    >
      <div className="flex w-full flex-col gap-6">
        <Input
          {...register('email')}
          type="email"
          label="Correo electrónico"
          placeholder="Ej: yo@correo.com"
          error={errors.email?.message}
        />
        <InputPass
          {...register('password')}
          label="Contraseña"
          error={errors.password?.message}
        />
      </div>
      <div className="mb-20 mt-1 w-full text-end">
        <Link
          href={authLinks.forgotPass.path}
          className="body_small_regular text-gray-text_alt"
        >
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      {showResendVerification && (
        <div className="mb-4">
          <ResendVerificationLink
            email={currentEmail}
            onClose={() => setShowResendVerification(false)}
          />
        </div>
      )}

      {error && !showResendVerification && (
        <div className="mb-4">
          <Alert paragraph={error} variant="error" />
        </div>
      )}
      <Button type="submit">Iniciar sesión</Button>
    </form>
  )
}

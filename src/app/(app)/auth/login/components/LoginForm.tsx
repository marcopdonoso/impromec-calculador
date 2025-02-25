'use client'
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

const loginSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})

export default function LoginForm() {
  const { setUser } = useUserStore()
  const router = useRouter()
  const [error, setError] = useState('')
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
      setError(res.error.message)
    }

    if (res.data) {
      const { access_token, user } = res.data
      setCookie('token', access_token, {
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
      })
      setUser(user)
    }
    router.push(appLinks.home.path)
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
      <Link
        href={authLinks.forgotPass.path}
        className="body_small_regular mb-20 mt-1 w-full text-end text-gray-text_alt"
      >
        ¿Olvidaste tu contraseña?
      </Link>
      {error && <p className="mb-4 text-center text-red">{error}</p>}
      <Button>Iniciar sesión</Button>
    </form>
  )
}

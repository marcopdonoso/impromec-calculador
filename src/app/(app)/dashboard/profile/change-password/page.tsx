'use client'
import Alert from '@/components/Alert'
import Button from '@/components/Button'
import InputPass from '@/components/InputPass'
import { appLinks, authLinks } from '@/constants/links.constants'
import { changePassword } from '@/services/profile.service'
import { useUserStore } from '@/store/useStore'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ProfileAvatar from '../components/ProfileAvatar'

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'La contraseña actual es requerida'),
    newPassword: z
      .string()
      .min(8, 'Debe contener 8+ caracteres')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        'Debe contener letras, números y símbolos'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const router = useRouter()
  const { user } = useUserStore()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit = async (data: ChangePasswordFormData) => {
    setLoading(true)
    setError(null)

    const response = await changePassword(
      data.currentPassword,
      data.newPassword
    )

    if (response.data) {
      setSuccess('Contraseña actualizada exitosamente')
      reset()
      setTimeout(() => {
        router.push(appLinks.profile.path)
      }, 5000)
    }

    if (response.error) {
      setError(response.error.message)
    }

    setLoading(false)
  }

  if (!user) {
    return <div className="flex justify-center p-8">Cargando perfil...</div>
  }

  return (
    <>
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-gray-placeholder bg-gray-white px-2 pb-12 pt-16 lg:px-28 lg:pt-14">
        <ProfileAvatar user={user} isFormDisabled={true} />

        <div className="w-full lg:items-end lg:gap-8">
          {error && (
            <div className="mb-4 w-full">
              <Alert variant="error" paragraph={error} />
            </div>
          )}

          {success && (
            <div className="mb-4 w-full">
              <Alert variant="success" paragraph={success} />
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <InputPass
              label="Contraseña actual"
              {...register('currentPassword')}
              error={errors.currentPassword?.message}
            />

            <div className="mt-1 w-full text-end lg:text-start">
              <Link
                href={authLinks.forgotPass.path}
                className="body_small_regular hover:text-green-success hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
              <p className="body_medium_regular">
                Última modificación:{' '}
                {user?.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString('es-ES')
                  : 'N/A'}
              </p>
            </div>

            <hr className="my-8 w-full text-gray-placeholder lg:my-6" />

            <div className="flex w-full flex-col gap-6 lg:flex-row lg:gap-8">
              <InputPass
                label="Contraseña nueva"
                placeholder="8+caracteres: letras, números, símbolos"
                {...register('newPassword')}
                error={errors.newPassword?.message}
              />
              <InputPass
                label="Confirmar nueva contraseña"
                placeholder="Repite la contraseña"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
            </div>

            <div className="mt-8 flex w-full flex-col gap-6 lg:mt-36 lg:flex-row-reverse lg:gap-8">
              <Button type="submit" disabled={loading}>
                {loading ? 'Guardando...' : 'Guardar'}
              </Button>
              <Link href={appLinks.profile.path} className="w-full">
                <Button variant="secondary" disabled={loading}>
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputPass from '@/components/InputPass'
import MyListbox from '@/components/MyListbox'
import MyPhoneInput from '@/components/MyPhoneInput'
import { authLinks } from '@/constants/links.constants'
import { specializationAreas } from '@/constants/specialization-areas.constants'
import { registerUser } from '@/services/user.service'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { isValidPhoneNumber, Value } from 'react-phone-number-input'
import { z } from 'zod'

const registerSchema = z
  .object({
    name: z
      .string({
        required_error: 'Ingresa un nombre y apellido.',
        invalid_type_error: 'Nombre inválido.',
      })
      .min(3, 'Mínimo 3 caracteres'),
    email: z
      .string({
        required_error: 'Ingresa un correo electrónico.',
      })
      .email('El formato del correo electrónico es inválido.'),
    company: z.string().optional(),
    category: z
      .object({
        text: z.string(),
        value: z.enum([
          'commercial',
          'construction',
          'industry',
          'installations',
          'projects',
        ]),
      })
      .default(specializationAreas[0]),
    phone: z
      .string({
        required_error: 'Ingresa un número.',
      })
      .refine((value) => isValidPhoneNumber(value), {
        message: 'Ingresa un número válido.',
      })
      .transform((value) => value.trim()),
    location: z
      .string({
        required_error: 'Ingresa una locación.',
      })
      .min(3, 'Mínimo 3 caracteres'),
    password: z
      .string({
        required_error: 'Ingresa una contraseña.',
      })
      .min(8, 'Debe contener 8+caracteres')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
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

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      category: specializationAreas[0],
      phone: '',
      location: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (formData: RegisterFormData) => {
    try {
      setLoading(true)

      const { data, error } = await registerUser({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        category: formData.category,
        phone: formData.phone,
        location: formData.location,
        password: formData.password,
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data) {
        router.push(authLinks.successfulReg.path)
      }
    } catch (error) {
      setError('Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex w-full flex-col items-center gap-6"
    >
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              label="Nombre completo"
              placeholder="Ej: José Rodríguez Soto"
              error={errors.name?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              type="email"
              label="Correo electrónico"
              placeholder="Ej: yo@correo.com"
              error={errors.email?.message}
              {...field}
            />
          )}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <Input
              label="Empresa (opcional)"
              placeholder="Ej: Empresa ABC"
              error={errors.company?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <MyListbox
              label="Área de especialización"
              options={specializationAreas}
              value={field.value}
              onChange={field.onChange}
              error={errors.category?.message}
            />
          )}
        />
      </div>

      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <MyPhoneInput
              value={field.value as Value | undefined}
              onChange={(value) => field.onChange(value || '')}
              error={errors.phone?.message}
            />
          )}
        />

        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <Input
              label="Locación"
              placeholder="Cochabamba, Bolivia"
              error={errors.location?.message}
              {...field}
            />
          )}
        />
      </div>

      <div className="mb-20 flex w-full flex-col items-center gap-6 lg:mb-24 lg:flex-row lg:gap-8">
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <InputPass
              label="Contraseña"
              placeholder="8+caracteres: letras, números, símbolos"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <InputPass
              label="Confirmar contraseña"
              placeholder="Repite la contraseña"
              error={fieldState.error?.message}
              {...field}
            />
          )}
        />
      </div>

      {error && (
        <div className="flex items-center gap-3">
          <XCircleIcon className="h-5 w-5 text-red" />
          <p className="body_small_regular text-red lg:body_medium_regular">
            {error}
          </p>
        </div>
      )}

      <Button className="lg:w-[32vw]" type="submit" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarme'}
      </Button>
    </form>
  )
}

'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputPass from '@/components/InputPass'
import MyListbox from '@/components/MyListbox'
import MyPhoneInput from '@/components/MyPhoneInput'
import { specializationAreas } from '@/constants/specialization-areas.constants'
import { registerUser } from '@/services/user.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerSchema = z
  .object({
    name: z.string().min(3, 'Mínimo 3 caracteres'),
    email: z.string().email('Correo inválido'),
    company: z.string().optional(),
    category: z.object({
      text: z.string(),
      value: z.enum([
        'commercial',
        'construction',
        'industry',
        'installations',
        'projects',
      ]),
    }),
    phone: z.string().min(7, 'Número inválido'),
    location: z.string().min(3, 'Mínimo 3 caracteres'),
    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres')
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        'Debe contener letras, números y símbolos'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contrasenas no coinciden',
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
        router.push('/')
      }
    } catch (error) {
      setError('Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="mt-6 flex w-full flex-col items-center gap-6">
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <Input label="Nombre completo" placeholder="Ej: José Rodríguez Soto" />
        <Input
          type="email"
          label="Correo electrónico"
          placeholder="Ej: yo@correo.com"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <Input label="Empresa (opcional)" placeholder="Ej: Empresa ABC" />
        <MyListbox
          label="Área de especialización"
          options={specializationAreas}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <MyPhoneInput />
        <Input label="Locación" placeholder="Cochabamba, Bolivia" />
      </div>
      <div className="flex w-full flex-col items-center gap-6 lg:mb-24 lg:flex-row lg:gap-8">
        <InputPass
          label="Contraseña"
          placeholder="8+caracteres: letras, números, símbolos"
        />
        <InputPass
          label="Confirmar contraseña"
          placeholder="Repite la contraseña"
          className="mb-20 lg:mb-0"
        />
      </div>
      <Button className="lg:w-[32vw]">Registrarme</Button>
    </form>
  )
}

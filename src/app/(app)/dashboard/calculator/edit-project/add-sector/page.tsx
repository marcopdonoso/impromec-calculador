'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import { Suspense, useState } from 'react'
import DeleteSingleSectorMessageWrapper from './components/DeleteSingleSectorMessageWrapper'
import { useSearchParams, useRouter } from 'next/navigation'
import { createSector } from '@/services/project.service'
import Alert from '@/components/Alert'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import { appLinks } from '@/constants/links.constants'

// Esquema de validación para el formulario de sector
const sectorSchema = z.object({
  sectorName: z
    .string({
      required_error: 'Ingresa un nombre para el sector.',
      invalid_type_error: 'Nombre de sector inválido.',
    })
    .min(3, 'El nombre del sector debe tener al menos 3 caracteres.'),
})

type SectorFormData = z.infer<typeof sectorSchema>

export default function AddSectorPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const projectId = searchParams.get('projectId')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SectorFormData>({
    resolver: zodResolver(sectorSchema),
    mode: 'onChange',
    defaultValues: {
      sectorName: '',
    },
  })

  const onSubmit = async (formData: SectorFormData) => {
    if (!projectId) {
      setError('No se encontró el ID del proyecto')
      return
    }

    try {
      setLoading(true)
      setError(null)

      const { data, error } = await createSector(projectId, formData.sectorName)

      if (error) {
        setError(error.message)
        return
      }

      if (data) {
        // Redirigir a la página principal de la calculadora o a la página de edición del proyecto
        router.push(appLinks.calculatorHome.path)
      }
    } catch (error) {
      setError('Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  // Si no hay ID de proyecto, mostrar un mensaje de error
  if (!projectId) {
    return (
      <section className="flex min-h-screen w-full max-w-4xl flex-col px-4 pt-8">
        <div className="mt-6">
          <Alert variant="error" paragraph="No se encontró el ID del proyecto. Por favor, intenta crear el proyecto nuevamente." />
        </div>
        <div className="mt-8">
          <Button onClick={() => router.push(appLinks.calculatorHome.path)}>Volver al inicio</Button>
        </div>
      </section>
    )
  }

  return (
    <section className="flex min-h-screen w-full max-w-4xl flex-col px-4 pt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="sectorName"
          control={control}
          render={({ field }) => (
            <Input
              label="Nombre del sector [1]"
              placeholder="Ej: Sala de servidores"
              className="mb-16 lg:mb-6"
              error={errors.sectorName?.message}
              {...field}
            />
          )}
        />
        
        {error && <div className="mb-6"><Alert variant="error" paragraph={error} /></div>}
        
        <div className="flex flex-col gap-4 lg:flex-row-reverse lg:gap-9">
          <Button type="submit" disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar sector'}
          </Button>
          <Button 
            variant="secondary" 
            type="button" 
            onClick={() => router.push(appLinks.calculatorHome.path)}
          >
            Volver atrás
          </Button>
        </div>
      </form>
      <Suspense>
        <DeleteSingleSectorMessageWrapper />
      </Suspense>
    </section>
  )
}

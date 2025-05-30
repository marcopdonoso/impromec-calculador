'use client'

import Alert from '@/components/Alert'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { appLinks } from '@/constants/links.constants'
import { createSector } from '@/services/project.service'
import { useProjectStore } from '@/store/useProjectStore'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import DeleteSingleSectorMessageWrapper from './components/DeleteSingleSectorMessageWrapper'

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
  const [sectorNumber, setSectorNumber] = useState(1)
  const { currentProject, fetchProject } = useProjectStore()

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
        // Redirigir a la página de edición del proyecto
        const editProjectUrl = `${appLinks.calculatorEditProject.path}/${projectId}`;
        console.log(`Redirigiendo a: ${editProjectUrl}`);
        
        // Usar window.location para una redirección directa del navegador
        window.location.href = editProjectUrl;
      }
    } catch (error) {
      setError('Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  // Cargar el proyecto para obtener los sectores existentes
  useEffect(() => {
    const loadProject = async () => {
      if (projectId) {
        try {
          // Cargar el proyecto usando el store
          await fetchProject(projectId)
        } catch (err) {
          console.error('Error al cargar el proyecto:', err)
          setError('Error al cargar el proyecto')
        }
      }
    }

    loadProject()
  }, [projectId, fetchProject])

  // Actualizar el número del sector cuando se carga el proyecto
  useEffect(() => {
    if (currentProject && currentProject.sectors) {
      // El número del nuevo sector será el total de sectores + 1
      setSectorNumber(currentProject.sectors.length + 1)
    }
  }, [currentProject])

  // Si no hay ID de proyecto, mostrar un mensaje de error
  if (!projectId) {
    return (
      <section className="flex min-h-screen w-full max-w-4xl flex-col px-4 pt-8">
        <div className="mt-6">
          <Alert
            variant="error"
            paragraph="No se encontró el ID del proyecto. Por favor, intenta crear el proyecto nuevamente."
          />
        </div>
        <div className="mt-8">
          <Button onClick={() => router.push(appLinks.calculatorHome.path)}>
            Volver al inicio
          </Button>
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
              label={`Nombre del sector ${sectorNumber}`}
              placeholder="Ej: Sala de servidores"
              className="mb-16 lg:mb-6"
              error={errors.sectorName?.message}
              {...field}
            />
          )}
        />

        {error && (
          <div className="mb-6">
            <Alert variant="error" paragraph={error} />
          </div>
        )}

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

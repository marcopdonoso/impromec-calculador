'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { appLinks } from '@/constants/links.constants'
import Link from 'next/link'
import SectorSwitch from './SectorSwitch'
import { useState } from 'react'
import { createProject } from '@/services/project.service'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewProjectFormData, newProjectSchema } from '@/schemas/project.schema'
import { Controller } from 'react-hook-form'
import Alert from '@/components/Alert'

export default function NewProjectForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewProjectFormData>({
    resolver: zodResolver(newProjectSchema),
    mode: 'onChange',
    defaultValues: {
      projectName: '',
      projectCompany: '',
      projectLocation: '',
      hasSectors: false,
    },
  })

  const onSubmit = async (formData: NewProjectFormData) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await createProject(formData)

      if (error) {
        setError(error.message)
        return
      }

      if (data) {
        // Redirigir según si el proyecto tiene sectores o no
        if (formData.hasSectors) {
          // Si tiene sectores, redirigir a la página para agregar sectores
          router.push(`/dashboard/calculator/edit-project/add-sector?projectId=${data.project.id}`)
        } else {
          // Si no tiene sectores, por ahora no hacemos nada adicional
          // En el futuro, redirigir a la página de edición del proyecto
          // router.push(`/dashboard/calculator/edit-project/${data.project.id}`)
          router.push(appLinks.calculatorHome.path)
        }
      }
    } catch (error) {
      setError('Error al procesar la solicitud')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="mt-12 w-full lg:mt-14" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="projectName"
        control={control}
        render={({ field }) => (
          <Input
            label="Nombre del proyecto"
            placeholder="Ej: Instalación planta de fabricación"
            error={errors.projectName?.message}
            {...field}
          />
        )}
      />
      <div className="mt-4 flex flex-col gap-4 lg:mt-6 lg:flex-row lg:gap-8">
        <Controller
          name="projectCompany"
          control={control}
          render={({ field }) => (
            <Input 
              label="Empresa" 
              placeholder="Ej: Empresa ABC" 
              error={errors.projectCompany?.message}
              {...field}
            />
          )}
        />
        <Controller
          name="projectLocation"
          control={control}
          render={({ field }) => (
            <Input 
              label="Locación" 
              placeholder="Ej: Cochabamba, Bolivia" 
              error={errors.projectLocation?.message}
              {...field}
            />
          )}
        />
      </div>
      <SectorSwitch name="hasSectors" control={control} />
      
      {error && <div className="mt-6"><Alert variant="error" paragraph={error} /></div>}
      
      <div className="mt-8 flex w-full flex-col gap-4 lg:flex-row-reverse lg:gap-9">
        <Button type="submit" disabled={loading}>
          {loading ? 'Procesando...' : 'Continuar'}
        </Button>
        <Link href={appLinks.calculatorHome.path} className="lg:w-full">
          <Button variant="secondary" type="button">
            Volver atrás
          </Button>
        </Link>
      </div>
    </form>
  )
}

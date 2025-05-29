import { z } from 'zod'

export const newProjectSchema = z.object({
  projectName: z
    .string({
      required_error: 'Ingresa un nombre para el proyecto.',
      invalid_type_error: 'Nombre de proyecto inválido.',
    })
    .min(3, 'El nombre del proyecto debe tener al menos 3 caracteres.'),
  projectCompany: z
    .string({
      required_error: 'Ingresa el nombre de la empresa.',
      invalid_type_error: 'Nombre de empresa inválido.',
    })
    .min(2, 'El nombre de la empresa debe tener al menos 2 caracteres.'),
  projectLocation: z
    .string({
      required_error: 'Ingresa la locación del proyecto.',
      invalid_type_error: 'Locación inválida.',
    })
    .min(3, 'La locación debe tener al menos 3 caracteres.'),
  hasSectors: z.boolean().default(false),
})

export type NewProjectFormData = z.infer<typeof newProjectSchema>

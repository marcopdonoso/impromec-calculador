import { api } from './api.service'
import { Project } from '@/models/project.model'
import { NewProjectFormData } from '@/schemas/project.schema'

export interface CreateProjectResponse {
  data: Project | null
  error: {
    message: string
  } | null
}

/**
 * Crea un nuevo proyecto
 * @param projectData Datos del proyecto a crear
 * @returns Respuesta con el proyecto creado o error
 */
export const createProject = async (
  projectData: NewProjectFormData
): Promise<CreateProjectResponse> => {
  try {
    const response = await api.post<Project>('/projects', projectData)
    return {
      data: response.data,
      error: null
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || 'Error al crear el proyecto'
      }
    }
  }
}

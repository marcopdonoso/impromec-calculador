import { api } from './api.service'
import { Project, Sector } from '@/models/project.model'
import { CableInTray } from '@/models/cable.model'
import { NewProjectFormData } from '@/schemas/project.schema'

export interface ApiResponse<T> {
  success: boolean
  message: string
  [key: string]: any
}

export interface GetProjectResponse {
  data: {
    project: Project
  } | null
  error: {
    message: string
    statusCode?: number
  } | null
}

export interface CreateProjectResponse {
  data: {
    project: Project
  } | null
  error: {
    message: string
  } | null
}

export interface CreateSectorResponse {
  data: {
    sector: Sector
    project: {
      id: string
      projectName: string
      sectorsCount: number
    }
  } | null
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
    const response = await api.post<ApiResponse<{ project: Project }>>('/projects', projectData)
    
    if (response.data.success) {
      return {
        data: {
          project: response.data.project
        },
        error: null
      }
    } else {
      return {
        data: null,
        error: {
          message: response.data.message || 'Error al crear el proyecto'
        }
      }
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

/**
 * Crea un nuevo sector para un proyecto
 * @param projectId ID del proyecto
 * @param sectorName Nombre del sector
 * @returns Respuesta con el sector creado o error
 */
export const createSector = async (
  projectId: string,
  sectorName: string
): Promise<CreateSectorResponse> => {
  try {
    const response = await api.post<ApiResponse<{
      sector: Sector,
      project: {
        id: string
        projectName: string
        sectorsCount: number
      }
    }>>(`/projects/${projectId}/sectors`, { sectorName })
    
    if (response.data.success) {
      return {
        data: {
          sector: response.data.sector,
          project: response.data.project
        },
        error: null
      }
    } else {
      return {
        data: null,
        error: {
          message: response.data.message || 'Error al crear el sector'
        }
      }
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || 'Error al crear el sector'
      }
    }
  }
}

/**
 * Obtiene un proyecto por su ID
 * @param projectId ID del proyecto
 * @returns Respuesta con el proyecto o error
 */
export const getProjectById = async (
  projectId: string
): Promise<GetProjectResponse> => {
  try {
    const response = await api.get<ApiResponse<{ project: Project }>>(`/projects/${projectId}`)
    
    if (response.data.success) {
      return {
        data: {
          project: response.data.project
        },
        error: null
      }
    } else {
      return {
        data: null,
        error: {
          message: response.data.message || 'Error al obtener el proyecto',
          statusCode: response.data.statusCode
        }
      }
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || 'Error al obtener el proyecto',
        statusCode: error.response?.data?.statusCode || error.response?.status
      }
    }
  }
}

export interface AddCableRequest {
  cable: {
    nominalSectionMM2: string
    nominalSectionAWG: string
    externalDiameterMM: number
    externalAreaMM2: number
    weightPerMeterKG: number
  }
  quantity: number
  arrangement?: string
}

export interface AddCableResponse {
  data: {
    cable: CableInTray
    sector: {
      id: string
      sectorName: string
      cablesCount: number
    }
    project: {
      id: string
      projectName: string
    }
  } | null
  error: {
    message: string
  } | null
}

/**
 * Agrega un cable a un sector
 * @param projectId ID del proyecto
 * @param sectorId ID del sector
 * @param cableData Datos del cable a agregar
 * @returns Respuesta con el cable agregado o error
 */
export const addCableToSector = async (
  projectId: string,
  sectorId: string,
  cableData: AddCableRequest
): Promise<AddCableResponse> => {
  try {
    const response = await api.post<ApiResponse<{
      cable: CableInTray,
      sector: {
        id: string
        sectorName: string
        cablesCount: number
      },
      project: {
        id: string
        projectName: string
      }
    }>>(`/projects/${projectId}/sectors/${sectorId}/cables`, cableData)
    
    if (response.data.success) {
      return {
        data: {
          cable: response.data.cable,
          sector: response.data.sector,
          project: response.data.project
        },
        error: null
      }
    } else {
      return {
        data: null,
        error: {
          message: response.data.message || 'Error al agregar el cable'
        }
      }
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || 'Error al agregar el cable'
      }
    }
  }
}

export interface AddCableToProjectResponse {
  data: {
    cable: CableInTray
    project: {
      id: string
      projectName: string
      hasSectors: boolean
      defaultSector?: {
        id: string
        sectorName: string
      }
    }
  } | null
  error: {
    message: string
  } | null
}

/**
 * Agrega un cable directamente a un proyecto (sin sectores)
 * @param projectId ID del proyecto
 * @param cableData Datos del cable a agregar
 * @returns Respuesta con el cable agregado o error
 */
export const addCableToProject = async (
  projectId: string,
  cableData: AddCableRequest
): Promise<AddCableToProjectResponse> => {
  try {
    const response = await api.post<ApiResponse<{
      cable: CableInTray,
      project: {
        id: string
        projectName: string
        cablesCount: number
      }
    }>>(`/projects/${projectId}/cables`, cableData)
    
    if (response.data.success) {
      return {
        data: {
          cable: response.data.cable,
          project: response.data.project
        },
        error: null
      }
    } else {
      return {
        data: null,
        error: {
          message: response.data.message || 'Error al agregar el cable'
        }
      }
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || 'Error al agregar el cable'
      }
    }
  }
}

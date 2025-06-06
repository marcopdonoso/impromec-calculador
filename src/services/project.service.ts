import { CableInTray } from '@/models/cable.model'
import { CalculationReport, InstallationLayerType, Project, Sector } from '@/models/project.model'
import { TrayType } from '@/models/tray.model'
import { NewProjectFormData } from '@/schemas/project.schema'
import { api } from './api.service'

export interface ApiResponse<T> {
  success: boolean
  message: string
  [key: string]: any
}

export interface CalculateTrayResponse {
  success: boolean
  message: string
  data: {
    projectId: string
    sectorId: string
    sectorName: string
    results: {
      moreConvenientOption: {
        id: string
        trayType: TrayType
        trayCategory: string
        technicalDetails: {
          thicknessInMM: number
          widthInMM: number
          heightInMM: number
          loadResistanceInKgM: number
        }
      }
      otherRecommendedOptions: Array<{
        id: string
        trayType: TrayType
        trayCategory: string
        technicalDetails: {
          thicknessInMM: number
          widthInMM: number
          heightInMM: number
          loadResistanceInKgM: number
        }
      }>
    }
  } | null
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
    const response = await api.post<ApiResponse<{ project: Project }>>(
      '/projects',
      projectData
    )

    if (response.data.success) {
      return {
        data: {
          project: response.data.project,
        },
        error: null,
      }
    } else {
      return {
        data: null,
        error: {
          message: response.data.message || 'Error al crear el proyecto',
        },
      }
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || 'Error al crear el proyecto',
      },
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
    const response = await api.post<
      ApiResponse<{
        sector: Sector
        project: {
          id: string
          projectName: string
          sectorsCount: number
        }
      }>
    >(`/projects/${projectId}/sectors`, { sectorName })

    if (response.data.success) {
      return {
        data: {
          sector: response.data.sector,
          project: response.data.project,
        },
        error: null,
      }
    } else {
      return {
        data: null,
        error: {
          message: response.data.message || 'Error al crear el sector',
        },
      }
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || 'Error al crear el sector',
      },
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
      // Proyecto recuperado correctamente
      return {
        data: {
          project: response.data.project,
        },
        error: null,
      }
    } else {
      return {
        data: null,
        error: {
          message: response.data.message || 'Error al obtener el proyecto',
          statusCode: response.data.statusCode,
        },
      }
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message:
          error.response?.data?.message || 'Error al obtener el proyecto',
        statusCode: error.response?.data?.statusCode || error.response?.status,
      },
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
    const response = await api.post<
      ApiResponse<{
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
      }>
    >(`/projects/${projectId}/sectors/${sectorId}/cables`, cableData)

    if (response.data.success) {
      return {
        data: {
          cable: response.data.cable,
          sector: response.data.sector,
          project: response.data.project,
        },
        error: null,
      }
    } else {
      return {
        data: null,
        error: {
          message: response.data.message || 'Error al agregar el cable',
        },
      }
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || 'Error al agregar el cable',
      },
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

export interface DeleteCableFromSectorResponse {
  data: {
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

export interface DeleteCableFromProjectResponse {
  data: {
    project: {
      id: string
      projectName: string
      cablesCount: number
    }
  } | null
  error: {
    message: string
  } | null
}

export interface UpdateSectorNameResponse {
  success?: boolean
  message?: string
  sector?: {
    id: string
    sectorName: string
    trayTypeSelection?: string
    reservePercentage?: number
    installationLayerSelection?: string
    cablesCount?: number
  }
  project?: {
    id: string
    projectName: string
  }
  error?: {
    message: string
  }
}

export interface DeleteSectorResponse {
  success?: boolean
  message?: string
  project?: {
    id: string
    projectName: string
    sectorsCount: number
  }
  error?: {
    message: string
  }
}

/**
 * Interfaz para la respuesta de la eliminación de un proyecto
 */
export interface DeleteProjectResponse {
  success: boolean
  message: string
  error?: {
    message: string
    statusCode?: number
  }
}

export interface UpdateSectorInstallationLayerResponse {
  success?: boolean
  message?: string
  sector?: {
    id: string
    sectorName: string
    trayTypeSelection?: string
    reservePercentage?: number
    installationLayerSelection?: string
    cablesCount?: number
  }
  project?: {
    id: string
    projectName: string
  }
  error?: {
    message: string
  }
}

/**
 * Actualiza el tipo de instalación de cables de un sector
 * @param projectId ID del proyecto
 * @param sectorId ID del sector
 * @param installationLayerType Tipo de instalación de cables ('singleLayer' o 'multiLayer')
 * @returns Respuesta con el sector actualizado o error
 */
export const updateSectorInstallationLayer = async (
  projectId: string,
  sectorId: string,
  installationLayerType: InstallationLayerType
): Promise<UpdateSectorInstallationLayerResponse> => {
  try {
    const response = await api.patch<
      ApiResponse<{
        sector: {
          id: string
          sectorName: string
          trayTypeSelection?: string
          reservePercentage?: number
          installationLayerSelection?: string
          cablesCount?: number
        }
        project: {
          id: string
          projectName: string
        }
      }>
    >(`/projects/${projectId}/sectors/${sectorId}`, {
      installationLayerSelection: installationLayerType,
    })

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        sector: response.data.data?.sector,
        project: response.data.data?.project,
      }
    } else {
      return {
        success: false,
        message: response.data.message,
        error: {
          message:
            response.data.message ||
            'Error al actualizar el tipo de instalación',
        },
      }
    }
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        'Error al actualizar el tipo de instalación',
      error: {
        message:
          error.response?.data?.message ||
          'Error al actualizar el tipo de instalación',
      },
    }
  }
}

/**
 * Obtiene el sector por defecto de un proyecto sin sectores
 * @param projectId ID del proyecto
 * @returns Respuesta con el sector por defecto o error
 */
export const getDefaultSector = async (
  projectId: string
): Promise<{
  success: boolean
  defaultSector?: {
    id: string
    sectorName: string
  } | null
  error?: {
    message: string
  }
}> => {
  try {
    const response = await api.get<
      ApiResponse<{
        project: {
          id: string
          projectName: string
          hasSectors: boolean
          defaultSector: {
            id: string
            sectorName: string
          } | null
        }
      }>
    >(`/projects/${projectId}`)

    if (response.data.success) {
      return {
        success: true,
        defaultSector: response.data.data?.project.defaultSector || null,
      }
    } else {
      return {
        success: false,
        error: {
          message:
            response.data.message || 'Error al obtener el sector por defecto',
        },
      }
    }
  } catch (error: any) {
    return {
      success: false,
      error: {
        message:
          error.response?.data?.message ||
          'Error al obtener el sector por defecto',
      },
    }
  }
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
    const response = await api.post<
      ApiResponse<{
        cable: CableInTray
        project: {
          id: string
          projectName: string
          cablesCount: number
        }
      }>
    >(`/projects/${projectId}/cables`, cableData)

    if (response.data.success) {
      return {
        data: {
          cable: response.data.cable,
          project: response.data.project,
        },
        error: null,
      }
    } else {
      return {
        data: null,
        error: {
          message: response.data.message || 'Error al agregar el cable',
        },
      }
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || 'Error al agregar el cable',
      },
    }
  }
}

/**
 * Elimina un cable de un sector
 * @param projectId ID del proyecto
 * @param sectorId ID del sector
 * @param cableId ID del cable a eliminar
 * @returns Respuesta con la confirmación o error
 */
export const deleteCableFromSector = async (
  projectId: string,
  sectorId: string,
  cableId: string
): Promise<DeleteCableFromSectorResponse> => {
  try {
    const response = await api.delete<
      ApiResponse<{
        sector: {
          id: string
          sectorName: string
          cablesCount: number
        }
        project: {
          id: string
          projectName: string
        }
      }>
    >(`/projects/${projectId}/sectors/${sectorId}/cables/${cableId}`)

    if (response.data.success) {
      return {
        data: {
          sector: response.data.sector,
          project: response.data.project,
        },
        error: null,
      }
    } else {
      return {
        data: null,
        error: {
          message: response.data.message || 'Error al eliminar el cable',
        },
      }
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || 'Error al eliminar el cable',
      },
    }
  }
}

/**
 * Actualiza el nombre de un sector
 * @param projectId ID del proyecto
 * @param sectorId ID del sector
 * @param sectorName Nuevo nombre del sector
 * @returns Respuesta con la confirmación o error
 */
export const updateSectorName = async (
  projectId: string,
  sectorId: string,
  sectorName: string
): Promise<UpdateSectorNameResponse> => {
  try {
    const response = await api.patch<{
      success: boolean
      message: string
      sector: {
        id: string
        sectorName: string
        trayTypeSelection?: string
        reservePercentage?: number
        installationLayerSelection?: string
        cablesCount?: number
      }
      project: {
        id: string
        projectName: string
      }
    }>(`/projects/${projectId}/sectors/${sectorId}`, { sectorName })

    // Verificar si la respuesta es exitosa
    if (response.data && response.data.success) {
      // La respuesta ya tiene el formato correcto, la devolvemos directamente
      return response.data
    }

    // Si llegamos aquí, algo salió mal con la respuesta
    // Respuesta del servidor procesada
    return {
      success: false,
      error: {
        message:
          response.data?.message || 'Error al actualizar el nombre del sector',
      },
    }
  } catch (error: any) {
    // Error capturado y manejado
    return {
      success: false,
      error: {
        message:
          error.response?.data?.message ||
          'Error al actualizar el nombre del sector',
      },
    }
  }
}

export const deleteCableFromProject = async (
  projectId: string,
  cableId: string
): Promise<DeleteCableFromProjectResponse> => {
  try {
    const response = await api.delete<
      ApiResponse<{
        project: {
          id: string
          projectName: string
          cablesCount: number
        }
      }>
    >(`/projects/${projectId}/cables/${cableId}`)

    if (response.data.success) {
      return {
        data: {
          project: response.data.project,
        },
        error: null,
      }
    } else {
      return {
        data: null,
        error: {
          message: response.data.message || 'Error al eliminar el cable',
        },
      }
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message: error.response?.data?.message || 'Error al eliminar el cable',
      },
    }
  }
}

/**
 * Elimina un sector de un proyecto
 * @param projectId ID del proyecto
 * @param sectorId ID del sector a eliminar
 * @returns Respuesta con la confirmación o error
 */
/**
 * Calcula la bandeja para un proyecto sin sectores
 * @param projectId ID del proyecto
 * @param trayTypeSelection Tipo de bandeja seleccionado
 * @param reservePercentage Porcentaje de reserva
 * @returns Respuesta con los resultados del cálculo o error
 */
export const calculateProjectTray = async (
  projectId: string,
  trayTypeSelection: TrayType,
  reservePercentage: number
): Promise<CalculateTrayResponse> => {
  try {
    const response = await api.post<CalculateTrayResponse>(
      `/projects/${projectId}/calculate-general-tray`
    )

    if (response.data.success) {
      return response.data
    }

    return {
      success: false,
      message: response.data.message || 'Error al calcular la bandeja',
      data: null,
    }
  } catch (error: any) {
    // Error capturado y manejado
    return {
      success: false,
      message: error.response?.data?.message || 'Error al calcular la bandeja',
      data: null,
    }
  }
}

/**
 * Calcula la bandeja para un sector específico de un proyecto
 * @param projectId ID del proyecto
 * @param sectorId ID del sector
 * @param trayTypeSelection Tipo de bandeja seleccionado
 * @param reservePercentage Porcentaje de reserva
 * @returns Respuesta con los resultados del cálculo o error
 */
export const calculateSectorTray = async (
  projectId: string,
  sectorId: string,
  trayTypeSelection: TrayType,
  reservePercentage: number
): Promise<CalculateTrayResponse> => {
  try {
    const response = await api.post<CalculateTrayResponse>(
      `/projects/${projectId}/sectors/${sectorId}/calculate-tray`
    )

    if (response.data.success) {
      return response.data
    }

    return {
      success: false,
      message: response.data.message || 'Error al calcular la bandeja',
      data: null,
    }
  } catch (error: any) {
    // Error capturado y manejado
    return {
      success: false,
      message: error.response?.data?.message || 'Error al calcular la bandeja',
      data: null,
    }
  }
}

export const deleteSector = async (
  projectId: string,
  sectorId: string
): Promise<DeleteSectorResponse> => {
  try {
    const response = await api.delete<{
      success: boolean
      message: string
      project: {
        id: string
        projectName: string
        sectorsCount: number
      }
    }>(`/projects/${projectId}/sectors/${sectorId}`)

    // Verificar si la respuesta es exitosa
    if (response.data && response.data.success) {
      // La respuesta ya tiene el formato correcto, la devolvemos directamente
      return response.data
    }

    // Si llegamos aquí, algo salió mal con la respuesta
    // Respuesta del servidor procesada
    return {
      success: false,
      error: {
        message: response.data?.message || 'Error al eliminar el sector',
      },
    }
  } catch (error: any) {
    // Error capturado y manejado
    return {
      success: false,
      error: {
        message: error.response?.data?.message || 'Error al eliminar el sector',
      },
    }
  }
}

/**
 * Elimina un proyecto por su ID
 * @param projectId ID del proyecto a eliminar
 * @returns Respuesta con confirmación de éxito o error
 */
export const deleteProject = async (
  projectId: string
): Promise<DeleteProjectResponse> => {
  try {
    const response = await api.delete<{
      success: boolean
      message: string
    }>(`/projects/${projectId}`)

    return {
      success: response.data.success,
      message: response.data.message || 'Proyecto eliminado exitosamente',
    }
  } catch (error: any) {
    const statusCode = error.response?.status
    const errorMessage = error.response?.data?.message || 'Error al eliminar el proyecto'
    
    // Error capturado y manejado al eliminar el proyecto
    return {
      success: false,
      message: errorMessage,
      error: {
        message: errorMessage,
        statusCode: statusCode,
      },
    }
  }
}

/**
 * Interfaz para la respuesta de actualización del tipo de bandeja de un sector
 */
export interface UpdateSectorTrayTypeResponse {
  success?: boolean
  message?: string
  sector?: {
    id: string
    sectorName: string
    trayTypeSelection?: string
    reservePercentage?: number
    installationLayerSelection?: string
    cablesCount?: number
  }
  project?: {
    id: string
    projectName: string
  }
  error?: {
    message: string
  }
}

/**
 * Actualiza el tipo de bandeja de un sector
 * @param projectId ID del proyecto
 * @param sectorId ID del sector
 * @param trayType Tipo de bandeja ('escalerilla' o 'bandeja')
 * @returns Respuesta con el sector actualizado o error
 */
export const updateSectorTrayType = async (
  projectId: string,
  sectorId: string,
  trayType: TrayType
): Promise<UpdateSectorTrayTypeResponse> => {
  try {
    // Actualizando tipo de bandeja para proyecto/sector
    
    const response = await api.patch<
      ApiResponse<{
        sector: {
          id: string
          sectorName: string
          trayTypeSelection?: string
          reservePercentage?: number
          installationLayerSelection?: string
          cablesCount?: number
        }
        project: {
          id: string
          projectName: string
        }
      }>
    >(`/projects/${projectId}/sectors/${sectorId}`, {
      trayTypeSelection: trayType,
    })

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        sector: response.data.data?.sector,
        project: response.data.data?.project,
      }
    } else {
      return {
        success: false,
        message: response.data.message,
        error: {
          message:
            response.data.message ||
            'Error al actualizar el tipo de bandeja',
        },
      }
    }
  } catch (error: any) {
    // Error capturado y manejado
    return {
      success: false,
      message:
        error.response?.data?.message ||
        'Error al actualizar el tipo de bandeja',
      error: {
        message:
          error.response?.data?.message ||
          'Error al actualizar el tipo de bandeja',
      },
    }
  }
};

/**
 * Interfaz para la respuesta de actualización del porcentaje de reserva de un sector
 */
export interface UpdateSectorReservePercentageResponse {
  success?: boolean
  message?: string
  sector?: {
    id: string
    sectorName: string
    trayTypeSelection?: string
    reservePercentage?: number
    installationLayerSelection?: string
    cablesCount?: number
  }
  project?: {
    id: string
    projectName: string
  }
  error?: {
    message: string
  }
}

/**
 * Actualiza el porcentaje de reserva de un sector
 * @param projectId ID del proyecto
 * @param sectorId ID del sector
 * @param reservePercentage Porcentaje de reserva (0-100)
 * @returns Respuesta con el sector actualizado o error
 */
export const updateSectorReservePercentage = async (
  projectId: string,
  sectorId: string,
  reservePercentage: number
): Promise<UpdateSectorReservePercentageResponse> => {
  try {
    // Actualizando porcentaje de reserva para proyecto/sector
    
    const response = await api.patch<
      ApiResponse<{
        sector: {
          id: string
          sectorName: string
          trayTypeSelection?: string
          reservePercentage?: number
          installationLayerSelection?: string
          cablesCount?: number
        }
        project: {
          id: string
          projectName: string
        }
      }>
    >(`/projects/${projectId}/sectors/${sectorId}`, {
      reservePercentage: reservePercentage,
    })

    if (response.data.success) {
      return {
        success: true,
        message: response.data.message,
        sector: response.data.data?.sector,
        project: response.data.data?.project,
      }
    } else {
      return {
        success: false,
        message: response.data.message,
        error: {
          message:
            response.data.message ||
            'Error al actualizar el porcentaje de reserva',
        },
      }
    }
  } catch (error: any) {
    // Error capturado y manejado
    return {
      success: false,
      message:
        error.response?.data?.message ||
        'Error al actualizar el porcentaje de reserva',
      error: {
        message:
          error.response?.data?.message ||
          'Error al actualizar el porcentaje de reserva',
      },
    }
  }
};

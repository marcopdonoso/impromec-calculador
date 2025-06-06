import { CalculationReport, Project } from '@/models/project.model'
import { api } from './api.service'

export interface SaveCalculationReportResponse {
  data: {
    project: Project;
  } | null;
  error: {
    message: string;
    statusCode?: number;
  } | null;
}

/**
 * Guarda el reporte de cálculo en el backend para un proyecto específico
 * @param projectId ID del proyecto
 * @param reportData Datos del reporte (URL y ID del archivo)
 * @returns Respuesta con el proyecto actualizado
 */
export const saveCalculationReport = async (
  projectId: string,
  reportData: CalculationReport
): Promise<SaveCalculationReportResponse> => {
  try {
    const response = await api.patch<{
      success: boolean;
      message: string;
      project: Project;
    }>(
      `/projects/${projectId}/calculation-report`,
      reportData
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
          message: response.data.message || 'Error al guardar el reporte de cálculo',
        },
      }
    }
  } catch (error: any) {
    return {
      data: null,
      error: {
        message:
          error.response?.data?.message || 'Error al guardar el reporte de cálculo',
        statusCode: error.response?.data?.statusCode || error.response?.status,
      },
    }
  }
}

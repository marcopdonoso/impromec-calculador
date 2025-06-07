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
 * @param reportData Datos del reporte (fileId del documento en PDFMonkey)
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

/**
 * Obtiene una URL válida para descargar el reporte de cálculo
 * @param projectId ID del proyecto 
 * @returns URL válida para descargar el reporte
 */
export const getReportDownloadUrl = async (
  projectId: string
): Promise<{
  data: { downloadUrl: string } | null;
  error: { message: string; needsRegeneration?: boolean } | null;
}> => {
  try {
    const response = await api.get<{
      success: boolean;
      message: string;
      url?: string;
      expiresIn?: string;
      needsRegeneration?: boolean;
    }>(`/projects/${projectId}/calculation-report/download-url`);
    
    // Agregar logs detallados para verificar la respuesta
    // console.log('[getReportDownloadUrl] Respuesta completa:', JSON.stringify(response.data, null, 2));
    // console.log('[getReportDownloadUrl] needsRegeneration:', response.data.needsRegeneration);
    // console.log('[getReportDownloadUrl] Tipo de needsRegeneration:', typeof response.data.needsRegeneration);
    
    if (response.data.success && response.data.url) {
      return {
        data: { downloadUrl: response.data.url },
        error: null,
      };
    } else {
      // Aseguramos que needsRegeneration sea procesado correctamente
      let needsRegen = false;
      
      // Verificamos todos los posibles valores que podrían representar "true"
      const needsRegenValue: unknown = response.data.needsRegeneration;
      // Validación segura para diferentes tipos
      if (needsRegenValue === true || 
          (typeof needsRegenValue === 'string' && needsRegenValue.toLowerCase() === 'true') ||
          (typeof needsRegenValue === 'number' && needsRegenValue === 1)) {
        needsRegen = true;
      }
      
      // console.log('[getReportDownloadUrl] Error procesado:', { 
      //   message: response.data.message, 
      //   needsRegeneration: needsRegen
      // });
      
      return {
        data: null,
        error: { 
          message: response.data.message || 'Error al obtener la URL de descarga',
          needsRegeneration: needsRegen
        },
      };
    }
  } catch (error: any) {
    // Log the caught error structure for debugging
    // console.log('[getReportDownloadUrl] CATCH block error object:', JSON.stringify(error, null, 2));
    // console.log('[getReportDownloadUrl] CATCH block error.response?.data:', JSON.stringify(error.response?.data, null, 2));

    const needsRegen = error.response?.data?.needsRegeneration === true;
    return {
      data: null,
      error: {
        message: error.response?.data?.message || 'Error al obtener la URL de descarga',
        needsRegeneration: needsRegen,
      },
    };
  }
}

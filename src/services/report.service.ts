import { Project } from '@/models/project.model'

export interface ReportGenerationResponse {
  success: boolean
  message?: string
  pdf_url?: string
  document_id?: string
  error?: string
}

/**
 * Genera una memoria de cálculo enviando los datos del proyecto y usuario a un webhook externo
 * @param {Object} data - Los datos a enviar
 * @param {any} data.user - Información del usuario
 * @param {Project} data.project - Proyecto para el que generar la memoria
 * @returns {Promise<ReportGenerationResponse>} - Respuesta con la URL del PDF generado
 */
export const generateCalculationReport = async ({
  user,
  project,
}: {
  user: any
  project: Project
}): Promise<ReportGenerationResponse> => {
  try {
    // URL del webhook de n8n
    const webhookUrl =
      'https://marcopdonoso.app.n8n.cloud/webhook/generar-memoria'

    // Realizar la petición POST al webhook
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user,
        project,
      }),
    })

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorText = await response.text()
      return {
        success: false,
        message: 'Error al generar la memoria de cálculo',
        error: errorText,
      }
    }

    // Extraer los datos de la respuesta
    const data = await response.json()

    return {
      success: true,
      message: 'Memoria de cálculo generada exitosamente',
      pdf_url: data.pdf_url,
      document_id: data.document_id,
    }
  } catch (error) {
    console.error('Error al generar la memoria de cálculo:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error desconocido',
      error: 'Error en la comunicación con el servidor',
    }
  }
}

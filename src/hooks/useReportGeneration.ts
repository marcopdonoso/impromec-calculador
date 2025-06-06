import { useState } from 'react'
import { Project } from '@/models/project.model'
import { generateCalculationReport } from '@/services/report.service'

interface UseReportGenerationReturn {
  isGenerating: boolean
  generateReport: (userData: any, projectData: Project) => Promise<void>
  error: string | null
}

/**
 * Hook personalizado para manejar la generación de reportes/memorias de cálculo
 * @returns {UseReportGenerationReturn} - Estados y función para generar reportes
 */
export function useReportGeneration(): UseReportGenerationReturn {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Genera un reporte/memoria de cálculo y abre el PDF en una nueva ventana
   * @param {any} userData - Datos del usuario
   * @param {Project} projectData - Datos del proyecto
   */
  const generateReport = async (userData: any, projectData: Project) => {
    setIsGenerating(true)
    setError(null)
    
    try {
      const response = await generateCalculationReport({
        user: userData,
        project: projectData,
      })

      if (response.success && response.pdf_url) {
        // Abrir el PDF en una nueva pestaña
        window.open(response.pdf_url, '_blank')
        console.log('Memoria de cálculo generada exitosamente')
      } else {
        // Manejar el error
        setError(response.error || 'Error al generar la memoria')
        console.error('Error:', response.message || 'No se pudo generar la memoria de cálculo')
      }
    } catch (err) {
      console.error('Error al generar el reporte:', err)
      setError('Error al comunicarse con el servidor')
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    isGenerating,
    generateReport,
    error,
  }
}

import { useState } from 'react'
import { CalculationReport, Project } from '@/models/project.model'
import { generateCalculationReport } from '@/services/report.service'
import { saveCalculationReport } from '@/services/calculation-report.service'
import { useProjectStore } from '@/store/useProjectStore'

interface UseReportGenerationReturn {
  isGenerating: boolean
  generateReport: (userData: any, projectData: Project) => Promise<void>
  error: string | null
  openReport: (url: string) => void
}

/**
 * Hook personalizado para manejar la generación de reportes/memorias de cálculo
 * @returns {UseReportGenerationReturn} - Estados y función para generar reportes
 */
export function useReportGeneration(): UseReportGenerationReturn {
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /**
   * Abre un reporte ya generado en una nueva ventana
   * @param {string} url - URL del reporte PDF
   */
  const openReport = (url: string) => {
    window.open(url, '_blank')
  }

  /**
   * Genera un reporte/memoria de cálculo, guarda la referencia en el backend y abre el PDF en una nueva ventana
   * @param {any} userData - Datos del usuario
   * @param {Project} projectData - Datos del proyecto
   */
  const generateReport = async (userData: any, projectData: Project) => {
    setIsGenerating(true)
    setError(null)
    const { setCurrentProject } = useProjectStore.getState()
    
    try {
      // 1. Generar el reporte a través del webhook
      const response = await generateCalculationReport({
        user: userData,
        project: projectData,
      })

      if (response.success && response.pdf_url) {
        // 2. Guardar la referencia del reporte en el backend
        const reportData: CalculationReport = {
          url: response.pdf_url,
          fileId: response.document_id || `report_${projectData.id}`
        }
        
        const saveResult = await saveCalculationReport(projectData.id, reportData)
        
        if (saveResult.data?.project) {
          // 3. Actualizar el proyecto en el store con la referencia del reporte
          setCurrentProject(saveResult.data.project)
          console.log('Reporte guardado exitosamente en el proyecto')
        } else {
          console.warn('El reporte se generó pero no se pudo guardar en el proyecto:', 
            saveResult.error?.message)
        }
        
        // 4. Abrir el PDF en una nueva pestaña
        openReport(response.pdf_url)
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
    openReport,
    error,
  }
}

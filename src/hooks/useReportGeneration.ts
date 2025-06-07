import { CalculationReport, Project } from '@/models/project.model' // User removed from here
import { User } from '@/models/user.model' // User imported from correct path
import {
  getReportDownloadUrl,
  saveCalculationReport,
} from '@/services/calculation-report.service'
import { generateCalculationReport } from '@/services/report.service'
import { useProjectStore } from '@/store/useProjectStore'
import { useState } from 'react'

interface UseReportGenerationReturn {
  isGenerating: boolean
  generateReport: (userData: User, projectData: Project) => Promise<void>
  openReportWithFreshUrl: (
    projectId: string,
    silentMode?: boolean
  ) => Promise<{
    success: boolean
    needsRegeneration?: boolean
  }>
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
   * Obtiene la URL actualizada y abre el reporte en una nueva ventana
   * @param {string} projectId - ID del proyecto
   * @param {boolean} silentMode - Si es true, no abre el reporte automáticamente
   * @returns Objeto indicando si tuvo éxito y si necesita regeneración
   */
  const openReportWithFreshUrl = async (
    projectId: string,
    silentMode?: boolean
  ): Promise<{
    success: boolean
    needsRegeneration?: boolean
  }> => {
    setIsGenerating(true)
    setError(null)

    try {
      // console.log('[useReportGeneration] Obteniendo URL fresca para el reporte...');
      const result = await getReportDownloadUrl(projectId)

      // console.log('[useReportGeneration] Respuesta completa:', result);

      // Si hay URL de descarga válida
      if (result.data?.downloadUrl) {
        // Si no estamos en modo silencioso, abrimos el PDF
        if (!silentMode) {
          window.open(result.data.downloadUrl, '_blank')
        }
        return { success: true }
      }
      // Si hay error, verificamos si necesita regeneración
      else if (result.error) {
        const errorMessage =
          result.error.message || 'No se pudo obtener la URL del reporte'
        setError(errorMessage)

        // Check if the error message implies regeneration OR if needsRegeneration flag is explicitly true
        const impliesRegeneration =
          errorMessage.includes('debe ser regenerado') ||
          errorMessage.includes('no está disponible')

        if (result.error.needsRegeneration || impliesRegeneration) {
          // console.log('[useReportGeneration] ALERTA: Reporte necesita regeneración (detectado por flag o mensaje). Actualizando store...');
          const { currentProject, setCurrentProject } =
            useProjectStore.getState()
          // console.log('[useReportGeneration] Estado del proyecto antes:', JSON.stringify(currentProject?.calculationReport));

          if (currentProject?.calculationReport) {
            const updatedProject = JSON.parse(JSON.stringify(currentProject))
            delete updatedProject.calculationReport
            // console.log('[useReportGeneration] FORZANDO ACTUALIZACIÓN DEL STORE');
            setCurrentProject(updatedProject)
            // const afterUpdate = useProjectStore.getState().currentProject;
            // console.log('[useReportGeneration] Estado del proyecto después:', JSON.stringify(afterUpdate?.calculationReport));
          }
          return { success: false, needsRegeneration: true }
        }

        return { success: false }
      }

      // Si no hay datos ni error definido
      setError('Respuesta inesperada del servidor')
      return { success: false }
    } catch (err: any) {
      console.error('[useReportGeneration] Error al abrir reporte:', err)
      setError(err.message || 'Ocurrió un error procesando el reporte.')
      return {
        success: false,
        needsRegeneration: err?.error?.needsRegeneration === true,
      } // Propagate needsRegeneration if available in error
    } finally {
      setIsGenerating(false)
      // console.log('[useReportGeneration] openReportWithFreshUrl finished, isGenerating set to false.');
    }
  }

  /**
   * Genera un reporte/memoria de cálculo, guarda la referencia en el backend y abre el PDF en una nueva ventana
   * @param {User} userData - Datos del usuario
   * @param {Project} projectData - Datos del proyecto
   */
  const generateReport = async (user: User, project: Project) => {
    setIsGenerating(true)
    setError(null)
    const { setCurrentProject } = useProjectStore.getState()

    try {
      // 1. Generar el reporte a través del webhook
      const response = await generateCalculationReport({
        user: user,
        project: project,
      })

      if (response.success && response.pdf_url) {
        // 2. Guardar la referencia del reporte en el backend (solo el fileId)
        const reportData: CalculationReport = {
          fileId: response.document_id || `report_${project.id}`,
        }

        const saveResult = await saveCalculationReport(project.id, reportData)

        if (saveResult.data?.project) {
          const projectFromBackend = saveResult.data.project as Project // Cast to Project type

          // ---- START Temporary Fix ----
          if (projectFromBackend._id && !projectFromBackend.id) {
            projectFromBackend.id = projectFromBackend._id
            console.log(
              '[useReportGeneration] Applied temporary fix: mapped _id to id for project object from backend.'
            )
          }
          // ---- END Temporary Fix ----

          // 3. Actualizar el proyecto en el store con la referencia del reporte
          setCurrentProject(projectFromBackend) // Use the potentially modified object
          console.log(
            'Reporte guardado exitosamente en el proyecto. Project data being set to store:',
            projectFromBackend
          )
          window.open(response.pdf_url, '_blank')
        } else {
          throw new Error(
            'No se pudo guardar la referencia del reporte en el proyecto'
          )
        }
      } else {
        throw new Error(response.error || 'No se pudo generar el reporte')
      }
    } catch (error: any) {
      console.error('[useReportGeneration] Error al generar reporte:', error) // Corrected variable name
      setError(error.message || 'Error al generar el reporte')
      // console.error('Error al generar el reporte:', err) // This line seems redundant and uses the wrong variable, removing it.
      // setError('Error al comunicarse con el servidor') // This setError overwrites the more specific one above, removing it.
    } finally {
      setIsGenerating(false)
    }
  }

  return {
    isGenerating,
    generateReport,
    openReportWithFreshUrl,
    error,
  }
}

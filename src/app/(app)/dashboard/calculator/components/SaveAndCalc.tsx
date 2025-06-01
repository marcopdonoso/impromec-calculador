import Alert from '@/components/Alert'
import Button from '@/components/Button'
import { Project, Sector } from '@/models/project.model'
import { TrayType } from '@/models/tray.model'
import { useProjectStore } from '@/store/useProjectStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface SaveAndCalcProps {
  activeSector?: Sector | null
  currentProject?: Project | null
  hasSectors?: boolean
  activeSectorIndex?: number
  // Prop para verificar si hay cables
  hasCables?: boolean
  // Nuevos props para valores de UI
  trayTypeUI?: TrayType
  reservePercentageUI?: number
}

export default function SaveAndCalc({
  activeSector,
  currentProject,
  hasSectors = false,
  activeSectorIndex = -1,
  hasCables = false,
  trayTypeUI = 'escalerilla',
  reservePercentageUI = 30,
}: SaveAndCalcProps) {
  const router = useRouter()
  const { calculateTray } = useProjectStore()
  const [isCalculating, setIsCalculating] = useState(false)
  const [alertInfo, setAlertInfo] = useState<{
    show: boolean
    message: string
    type: 'success' | 'error'
  }>({
    show: false,
    message: '',
    type: 'success',
  })

  // Determinar el texto del botón según si hay sectores y si hay un sector activo
  const buttonText =
    hasSectors && activeSector && activeSectorIndex !== -1
      ? `Guardar y Calcular Sector ${activeSectorIndex + 1}`
      : 'Guardar y Calcular'

  // Si no hay cables, no mostrar el botón
  if (!hasCables || !currentProject) {
    return null
  }

  const handleCalculate = async () => {
    if (!currentProject) return

    try {
      setIsCalculating(true)
      setAlertInfo({ show: false, message: '', type: 'success' })

      // Determinar los parámetros según si es un proyecto con sectores o no
      const projectId = currentProject.id
      // Asegurarse de que sectorId sea un string o null, nunca undefined
      const sectorId =
        hasSectors && activeSector && activeSector.id ? activeSector.id : null

      // Usar los valores de UI pasados como props
      let trayType: TrayType = trayTypeUI || 'escalerilla'
      let reservePercentage = reservePercentageUI || 30

      console.log('SaveAndCalc - Usando valores actualizados:', {
        trayType,
        reservePercentage,
        // Para comparación, mostrar también los valores originales
        originalTrayType: hasSectors
          ? activeSector?.trayTypeSelection
          : currentProject?.trayTypeSelection,
        originalReservePercentage: hasSectors
          ? activeSector?.reservePercentage
          : currentProject?.reservePercentage,
      })

      // Llamar al servicio para calcular la bandeja
      const result = await calculateTray(
        projectId,
        sectorId,
        trayType,
        reservePercentage
      )

      if (result.success) {
        // Mostrar alerta de éxito
        setAlertInfo({
          show: true,
          message: result.message,
          type: 'success',
        })

        // Redireccionar a la página de resultados con parámetro para indicar que viene de calcular
        setTimeout(() => {
          router.push(`/dashboard/calculator/results/${projectId}?fromCalculation=true`)
        }, 1500) // Esperar 1.5 segundos para que el usuario vea el mensaje
      } else {
        // Mostrar alerta de error
        setAlertInfo({
          show: true,
          message: result.message,
          type: 'error',
        })
      }
    } catch (error) {
      console.error('Error al calcular la bandeja:', error)
      setAlertInfo({
        show: true,
        message: 'Error al calcular la bandeja',
        type: 'error',
      })
    } finally {
      setIsCalculating(false)
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 px-2 lg:mt-6">
      {alertInfo.show && (
        <Alert variant={alertInfo.type} paragraph={alertInfo.message} />
      )}
      <hr className="w-full text-gray-placeholder lg:hidden" />
      <Button
        className="lg:max-w-md"
        onClick={handleCalculate}
        disabled={isCalculating}
      >
        {isCalculating ? 'Calculando...' : buttonText}
      </Button>
    </div>
  )
}

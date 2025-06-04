import SelectedItemCard from '@/components/SelectedItemCard'
import { TrayType } from '@/models/tray.model'
import { useProjectStore } from '@/store/useProjectStore'
import { useCallback, useEffect, useState } from 'react'

// Importar la variable global desde SectorsListbox
import { activeSectorGlobal } from './SectorsListbox'

export default function SelectedTrayCard() {
  const { currentProject } = useProjectStore()
  const [trayType, setTrayType] = useState<TrayType>('escalerilla')
  const [reservePercent, setReservePercent] = useState<number>(20)
  const [installationType, setInstallationType] = useState<string>('adosada')

  // Crear una función para verificar cambios en el sector activo usando useCallback
  // para evitar que se recree en cada renderizado
  const checkForActiveSectorChanges = useCallback(() => {
    // Obtener el tipo de bandeja del sector activo
    if (activeSectorGlobal) {
      // Usar trayTypeSelection y installationLayerSelection del sector activo
      if (activeSectorGlobal.trayTypeSelection) {
        setTrayType(activeSectorGlobal.trayTypeSelection)
      }
      setReservePercent(activeSectorGlobal.reservePercentage || 20)
      // Obtener el tipo de instalación del sector activo
      if (activeSectorGlobal.installationLayerSelection) {
        setInstallationType(activeSectorGlobal.installationLayerSelection)
      }
    }
    // Si no hay sector activo o para proyectos sin sectores
    else if (currentProject && !currentProject.hasSectors) {
      // Usar datos directamente del proyecto
      if (currentProject.trayTypeSelection) {
        setTrayType(currentProject.trayTypeSelection)
      }
      setReservePercent(currentProject.reservePercentage || 20)
      // Obtener el tipo de instalación del proyecto
      if (currentProject.installationLayerSelection) {
        setInstallationType(currentProject.installationLayerSelection)
      }
      // Datos del proyecto sin sectores disponibles
    }
  }, [currentProject, setTrayType, setReservePercent, setInstallationType])

  // Ejecutar la verificación cuando cambia el proyecto
  useEffect(() => {
    checkForActiveSectorChanges()
  }, [currentProject, checkForActiveSectorChanges])

  // Establecer un intervalo para verificar cambios en activeSectorGlobal
  useEffect(() => {
    // Verificar inicialmente
    checkForActiveSectorChanges()

    // Establecer un intervalo para verificar periódicamente si activeSectorGlobal ha cambiado
    const intervalId = setInterval(() => {
      checkForActiveSectorChanges()
    }, 500) // Verificar cada 500ms

    // Limpiar el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId)
  }, [checkForActiveSectorChanges])

  // Determinar la imagen según el tipo de bandeja
  const trayImage =
    trayType === 'canal' ? '/img/canal.png' : '/img/escalerilla.png'

  // Formatear el texto para el tipo de bandeja
  const trayTypeText =
    trayType === 'canal' ? 'Bandeja tipo Canal' : 'Bandeja tipo Escalerilla'

  // Formatear el texto para el tipo de instalación
  const installationTypeText = (() => {
    switch (installationType) {
      case 'singleLayer':
        return 'Cables en una sola capa'
      case 'multiLayer':
        return 'Cables en varias capas'
      default:
        return installationType
    }
  })()

  return (
    <SelectedItemCard
      image={trayImage}
      primaryText={trayTypeText}
      secondaryText={`${reservePercent}% de reserva`}
      tertiaryText={installationTypeText}
    />
  )
}

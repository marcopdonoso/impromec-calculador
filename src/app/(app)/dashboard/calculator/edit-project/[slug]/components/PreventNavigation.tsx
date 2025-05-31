'use client'
import { useEffect, useState } from 'react'
import ModalOverlay from '../../../components/ModalOverlay'
import ExitModal from './ExitModal'

export default function PreventNavigation({ backHref }: { backHref: string }) {
  const [leavingPage, setLeavingPage] = useState(false)
  const [destinationUrl, setDestinationUrl] = useState('')

  // Evitar que se abandone la página sin confirmación
  useEffect(() => {
    let isNavigating = false;

    // Prevenir navegación hacia atrás
    const handlePopState = () => {
      // Revertir la navegación hacia atrás
      window.history.pushState(null, document.title, window.location.href)
      
      if (!isNavigating) {
        setDestinationUrl(backHref)
        setLeavingPage(true)
      }
    }

    // Capturar clics en enlaces
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a');
      
      if (link && link.href && !link.href.includes(window.location.pathname)) {
        e.preventDefault()
        setDestinationUrl(link.href)
        setLeavingPage(true)
      }
    }

    // Prevenir recarga de página
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }

    // Inicializar el estado del historial
    if (typeof window !== 'undefined') {
      window.history.pushState(null, document.title, window.location.href)
    }

    // Agregar event listeners
    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleLinkClick, true) // Usar captura para interceptar antes
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      // Eliminar event listeners
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleLinkClick, true)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [backHref])

  // Manejar la confirmación para salir de la página
  const handleConfirmNavigation = () => {
    if (destinationUrl) {
      // Usar una navegación completa para actualizar la URL
      window.location.href = destinationUrl
    }
  }

  return (
    <ModalOverlay isModalVisible={leavingPage}>
      <ExitModal
        showModal={leavingPage}
        setShowModal={setLeavingPage}
        onCancel={() => setLeavingPage(false)}
        onConfirm={handleConfirmNavigation}
      />
    </ModalOverlay>
  )
}

'use client'

import Modal, { ModalButton } from '@/components/Modal'
import { deleteSector } from '@/services/project.service'
import { useProjectStore } from '@/store/useProjectStore'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

interface DeleteSectorModalProps {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
  sectorId: string
}

export default function DeleteSectorModal({
  showModal,
  setShowModal,
  sectorId,
}: DeleteSectorModalProps) {
  const params = useParams()
  const router = useRouter()
  const projectId = params.slug as string
  const { fetchProject } = useProjectStore()
  const [isDeleting, setIsDeleting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  
  const handleDeleteSector = async () => {
    if (!sectorId || !projectId) return
    
    try {
      setIsDeleting(true)
      setErrorMessage(null)
      
      const response = await deleteSector(projectId, sectorId)
      
      if (!response.success) {
        setErrorMessage(response.error?.message || 'Error al eliminar el sector')
        setIsDeleting(false)
        return
      }
      
      // Actualizar el proyecto en el store para reflejar los cambios
      await fetchProject(projectId)
      
      // Cerrar el modal
      setShowModal(false)
      
      // Refrescar la página para mostrar los cambios
      router.refresh()
      
    } catch (error) {
      console.error('Error al eliminar el sector:', error)
      setErrorMessage('Error al eliminar el sector')
    } finally {
      setIsDeleting(false)
    }
  }
  
  // Modificamos el párrafo para incluir el mensaje de error si existe
  const paragraph = errorMessage 
    ? `Error: ${errorMessage}. En caso de haber ingresado datos de calculo, al eliminar este sector, se borrarán los datos respectivos.`
    : "En caso de haber ingresado datos de calculo, al eliminar este sector, se borrarán los datos respectivos."
  
  const buttons: ModalButton[] = [
    {
      variant: 'secondary',
      children: 'Cancelar',
      onClick: () => setShowModal(false),
    },
    {
      variant: 'destructive',
      children: isDeleting ? 'Eliminando...' : 'Eliminar sector',
      onClick: handleDeleteSector,
    },
  ]
  
  return (
    <Modal
      icon="trash"
      title="¿Seguro que deseas eliminarlo?"
      paragraph={paragraph}
      buttons={buttons}
      showModal={showModal}
      setShowModal={setShowModal}
    />
  )
}

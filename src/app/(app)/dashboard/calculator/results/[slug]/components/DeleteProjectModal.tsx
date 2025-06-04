import Modal, { ModalButton } from '@/components/Modal'
import { deleteProject } from '@/services/project.service'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

interface DeleteProjectModalProps {
  isDeleteProjectModalVisible: boolean
  setIsDeleteProjectModalVisible: (value: boolean) => void
}

export default function DeleteProjectModal({
  isDeleteProjectModalVisible,
  setIsDeleteProjectModalVisible,
}: DeleteProjectModalProps) {
  const params = useParams()
  const router = useRouter()
  const projectId = params.slug as string
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Función para manejar la eliminación del proyecto
  const handleDeleteProject = async () => {
    if (!projectId) return
    
    try {
      setIsDeleting(true)
      // Inicio del proceso de eliminación
      
      // Llamar al servicio para eliminar el proyecto
      const response = await deleteProject(projectId)
      
      if (response.success) {
        // Proyecto eliminado correctamente
        // Cerrar el modal
        setIsDeleteProjectModalVisible(false)
        
        // Redirigir a la lista de proyectos después de un breve retraso
        // para que el usuario vea que el modal se cierra
        setTimeout(() => {
          router.push('/dashboard/calculator/projects-list')
        }, 300)
      } else {
        // Error manejado con toast
        alert(`Error: ${response.message || 'No se pudo eliminar el proyecto'}`)
        setIsDeleting(false)
      }
    } catch (error) {
      // Error general manejado con toast
      alert('Error al eliminar el proyecto')
      setIsDeleting(false)
    }
  }
  
  const deleteProjectModalButtons: ModalButton[] = [
    {
      variant: 'secondary',
      children: 'Cancelar',
      onClick: () => {
        if (!isDeleting) {
          setIsDeleteProjectModalVisible(false)
        }
      },
    },
    {
      variant: 'destructive',
      children: isDeleting ? 'Eliminando...' : 'Eliminar',
      onClick: isDeleting ? () => {} : handleDeleteProject,
    },
  ]

  return (
    <Modal
      icon="trash"
      title="¿Seguro que deseas eliminar
el proyecto?"
      paragraph="Si eliminas este proyecto, no podrás recuperarlo. Todos los datos y cálculos se perderán de forma permanente."
      buttons={deleteProjectModalButtons}
      showModal={isDeleteProjectModalVisible}
      setShowModal={setIsDeleteProjectModalVisible}
    />
  )
}

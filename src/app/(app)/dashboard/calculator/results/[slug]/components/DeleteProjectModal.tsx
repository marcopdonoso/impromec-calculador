import Modal, { ModalButton } from '@/components/Modal'

interface DeleteProjectModalProps {
  isDeleteProjectModalVisible: boolean
  setIsDeleteProjectModalVisible: (value: boolean) => void
}

export default function DeleteProjectModal({
  isDeleteProjectModalVisible,
  setIsDeleteProjectModalVisible,
}: DeleteProjectModalProps) {
  const deleteProjectModalButtons: ModalButton[] = [
    {
      variant: 'secondary',
      children: 'Cancelar',
      onClick: () => {
        setIsDeleteProjectModalVisible(false)
      },
    },
    {
      variant: 'destructive',
      children: 'Eliminar',
      onClick: () => {},
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

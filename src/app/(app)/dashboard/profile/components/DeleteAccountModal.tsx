import Modal, { ModalButton } from '@/components/Modal'
import { Dispatch, SetStateAction } from 'react'
import ModalOverlay from '../../calculator/components/ModalOverlay'

interface DeleteAccountModalProps {
  isModalVisible: boolean
  setIsModalVisible: Dispatch<SetStateAction<boolean>>
  onConfirmDelete: () => void
  isDeleting: boolean
}

export default function DeleteAccountModal({
  isModalVisible,
  setIsModalVisible,
  onConfirmDelete,
  isDeleting,
}: DeleteAccountModalProps) {
  const modalButtons: ModalButton[] = [
    {
      variant: 'secondary',
      children: 'Cancelar',
      onClick: () => {
        setIsModalVisible(false)
      },
    },
    {
      variant: 'destructive',
      children: isDeleting ? 'Eliminando...' : 'Eliminar cuenta',
      onClick: onConfirmDelete,
    },
  ]

  return (
    <ModalOverlay isModalVisible={isModalVisible}>
      <Modal
        icon="trash"
        title="¿Seguro que quieres eliminar tu cuenta?"
        paragraph="Esta es una acción permanente y no se puede deshacer. Perderás acceso a todos tus proyectos y cálculos asociados.
¿Deseas continuar?"
        buttons={modalButtons}
        showModal={isModalVisible}
        setShowModal={setIsModalVisible}
      />
    </ModalOverlay>
  )
}

'use client'

import Modal, { ModalButton } from '@/components/Modal'

interface DeleteSectorModalProps {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}

export default function DeleteSectorModal({
  showModal,
  setShowModal,
}: DeleteSectorModalProps) {
  const buttons: ModalButton[] = [
    {
      variant: 'secondary',
      children: 'Cancelar',
      onClick: () => setShowModal(false),
    },
    {
      variant: 'destructive',
      children: 'Eliminar sector',
      onClick: () => {},
    },
  ]
  return (
    <Modal
      icon="trash"
      title="¿Seguro que deseas eliminarlo?"
      paragraph="En caso de haber ingresado datos de calculo, al eliminar este sector, se borrarán los datos respectivos."
      buttons={buttons}
      showModal={showModal}
      setShowModal={setShowModal}
    />
  )
}

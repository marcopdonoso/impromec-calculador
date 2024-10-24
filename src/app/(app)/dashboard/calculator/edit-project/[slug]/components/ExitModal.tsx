import Modal, { ModalButton } from '@/components/Modal'
import { Dispatch, SetStateAction } from 'react'

interface ExitModalProps {
  showModal: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  onCancel: () => void
  onConfirm: () => void
}

export default function ExitModal({
  showModal,
  setShowModal,
  onCancel,
  onConfirm,
}: ExitModalProps) {
  const modalButtons: ModalButton[] = [
    {
      variant: 'secondary',
      children: 'Cancelar',
      onClick: onCancel,
    },
    {
      variant: 'destructive',
      children: 'Salir',
      onClick: onConfirm,
    },
  ]
  return (
    <Modal
      icon="info"
      title="¿Seguro que deseas salir?"
      paragraph="Si sales del proceso de cálculo, la información ingresada se perderá."
      buttons={modalButtons}
      showModal={showModal}
      setShowModal={setShowModal}
    />
  )
}

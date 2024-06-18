'use client'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import { useState } from 'react'

export default function DeleteModal() {
  const [showModal, setShowModal] = useState(false)
  return (
    <div className="flex flex-col">
      <Button variant="primary_small" onClick={() => setShowModal(!showModal)}>
        {showModal ? 'Ocultar' : 'Mostrar'}
      </Button>
      <Modal
        closable
        showModal={showModal}
        setShowModal={setShowModal}
        icon="trash"
        title="¿Seguro que deseas eliminarlo?"
        paragraph="En caso de haber ingresado datos de calculo, al eliminar este sector, se borrarán los datos respectivos."
        buttons={[
          {
            variant: 'secondary_small',
            children: 'Cancelar',
            onClick: () => setShowModal(false),
          },
          {
            variant: 'destructive_small',
            children: 'Eliminar sector',
            onClick: () => {},
          },
        ]}
      />
    </div>
  )
}

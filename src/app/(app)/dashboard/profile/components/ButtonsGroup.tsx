import Button from '@/components/Button'
import clsx from 'clsx'
import { Dispatch, SetStateAction } from 'react'

interface ButtonsGroupProps {
  isFormDisabled: boolean
  setIsFormDisabled: Dispatch<SetStateAction<boolean>>
}

export default function ButtonsGroup({
  isFormDisabled,
  setIsFormDisabled,
}: ButtonsGroupProps) {
  const onCancelEdit = () => {
    window.location.reload()
  }
  return (
    <div
      className={clsx(
        'mt-8 flex flex-col gap-6 lg:mt-6 lg:flex-row-reverse lg:gap-8'
      )}
    >
      {isFormDisabled ? (
        <>
          <Button onClick={() => setIsFormDisabled(false)}>
            Editar perfil
          </Button>
          <Button variant="destructive">Eliminar cuenta</Button>
        </>
      ) : (
        <>
          <Button>Guardar</Button>
          <Button variant="secondary" onClick={onCancelEdit}>
            Cancelar
          </Button>
        </>
      )}
    </div>
  )
}

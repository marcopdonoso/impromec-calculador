import Button from '@/components/Button'
import { authLinks } from '@/constants/links.constants'
import { deleteAccount } from '@/services/profile.service'
import { logoutUser } from '@/services/user.service'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import DeleteAccountModal from './DeleteAccountModal'

interface ButtonsGroupProps {
  isFormDisabled: boolean
  setIsFormDisabled: Dispatch<SetStateAction<boolean>>
  onSave?: () => void
  onCancel?: () => void
  loading?: boolean
}

export default function ButtonsGroup({
  isFormDisabled,
  setIsFormDisabled,
  onSave,
  onCancel,
  loading = false,
}: ButtonsGroupProps) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleConfirmDelete = async () => {
    setIsDeleting(true)

    try {
      const response = await deleteAccount()
      if (response.data) {
        await logoutUser()
        router.push(authLinks.deletedAccount.path)
      }
    } catch (error) {
      console.log('Error al eliminar la cuenta:', error)
    } finally {
      setIsDeleting(false)
      setIsModalVisible(false)
    }
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
          <Button
            variant="destructive"
            onClick={() => setIsModalVisible(true)}
            disabled={isDeleting}
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar cuenta'}
          </Button>
        </>
      ) : (
        <>
          <Button onClick={onSave} disabled={loading}>
            {loading ? 'Guardando...' : 'Guardar'}
          </Button>
          <Button variant="secondary" onClick={onCancel} disabled={loading}>
            Cancelar
          </Button>
        </>
      )}
      <DeleteAccountModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  )
}

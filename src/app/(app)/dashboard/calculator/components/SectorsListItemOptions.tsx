import { Dispatch, SetStateAction } from 'react'
import ListItemOption from './ListItemOption'

interface SectorsListItemOptionsProps {
  setCanEdit: Dispatch<SetStateAction<boolean>>
  setIsOptionsVisible: Dispatch<SetStateAction<boolean>>
  setIsDeleteModalVisible: Dispatch<SetStateAction<boolean>>
}

export default function SectorsListItemOptions({
  setCanEdit,
  setIsOptionsVisible,
  setIsDeleteModalVisible,
}: SectorsListItemOptionsProps) {
  return (
    <div className="z-50 w-40 rounded-md bg-gray-white py-2 shadow shadow-shadow">
      <ListItemOption
        onClick={() => {
          setCanEdit(true)
          setIsOptionsVisible(false)
        }}
      >
        Editar nombre
      </ListItemOption>
      <hr className="text-gray-background" />
      <ListItemOption
        onClick={() => {
          setIsDeleteModalVisible(true)
          setIsOptionsVisible(false)
        }}
      >
        Eliminar
      </ListItemOption>
    </div>
  )
}

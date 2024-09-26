import { Dispatch, SetStateAction } from 'react'
import ListItemOption from './ListItemOption'

interface SectorsListItemOptionsProps {
  setCanEdit: Dispatch<SetStateAction<boolean>>
  setisOptionsVisible: Dispatch<SetStateAction<boolean>>
}

export default function SectorsListItemOptions({
  setCanEdit,
  setisOptionsVisible,
}: SectorsListItemOptionsProps) {
  return (
    <div className="z-50 w-40 rounded-md bg-gray-white py-2 shadow shadow-shadow">
      <ListItemOption
        onClick={() => {
          setCanEdit(true)
          setisOptionsVisible(false)
        }}
      >
        Editar nombre
      </ListItemOption>
      <hr className="text-gray-background" />
      <ListItemOption onClick={() => {}}>Eliminar</ListItemOption>
    </div>
  )
}

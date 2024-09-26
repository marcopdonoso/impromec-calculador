import { Dispatch, SetStateAction } from 'react'

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
      <div
        className="body_small_regular flex h-9 cursor-pointer items-center px-5 text-gray-text hover:bg-gray-button_primary hover:text-gray-white"
        onClick={() => {
          setCanEdit(true)
          setisOptionsVisible(false)
        }}
      >
        Editar nombre
      </div>
      <div className="body_small_regular flex h-9 cursor-pointer items-center px-5 text-gray-text hover:bg-gray-button_primary hover:text-gray-white">
        Eliminar
      </div>
    </div>
  )
}

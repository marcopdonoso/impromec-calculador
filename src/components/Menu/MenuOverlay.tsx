import { Transition } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'

interface MenuOverlayProps {
  showMenu: boolean
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

export default function MenuOverlay({
  showMenu,
  setIsMenuOpen,
}: MenuOverlayProps) {
  return (
    <Transition
      show={showMenu}
      enter="ease-in-out transition duration-500"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-out transition duration-500"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        onClick={() => {
          setIsMenuOpen(false)
        }}
        className="fixed inset-0 z-40 bg-gray-button_primary bg-opacity-20 lg:hidden"
      />
    </Transition>
  )
}

import { Transition } from '@headlessui/react'

interface MenuOverlayProps {
  showMenu: boolean
  toggleMenu: () => void
}

export default function MenuOverlay({
  showMenu,
  toggleMenu,
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
        onClick={toggleMenu}
        className="no-scrollbar fixed inset-0 bg-gray-button_primary bg-opacity-20 lg:hidden"
      />
    </Transition>
  )
}

import clsx from 'clsx'
import { ReactNode } from 'react'

interface ModalOverlayProps {
  children: ReactNode
  isModalVisible: boolean
}
export default function ModalOverlay({
  children,
  isModalVisible,
}: ModalOverlayProps) {
  return (
    <div
      className={clsx(
        'fixed inset-0 z-40 flex items-center justify-center bg-gray-button_primary bg-opacity-20',
        {
          ['block']: isModalVisible,
          ['hidden']: !isModalVisible,
        }
      )}
    >
      <div className="z-50">{children}</div>
    </div>
  )
}

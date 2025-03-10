import {
  InformationCircleIcon,
  PhoneIcon,
  TrashIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Button, { ButtonVariant } from './Button'

export interface ModalButton {
  variant: ButtonVariant
  children: string
  icon?: 'ReactNode'
  onClick: () => void
}

interface ModalProps {
  icon: 'trash' | 'contact' | 'info'
  title: string
  paragraph: string
  buttons: ModalButton[]
  showModal: boolean
  setShowModal: (showModal: boolean) => void
  closable?: boolean
}

export default function Modal({
  icon,
  title,
  paragraph,
  buttons,
  showModal,
  setShowModal,
  closable,
}: ModalProps) {
  return (
    <div
      className={clsx(
        'relative flex w-72 flex-col items-center rounded-2xl bg-gray-white px-4 py-8 shadow shadow-shadow lg:w-[39vw] lg:min-w-[530px]',
        !showModal && 'hidden'
      )}
    >
      {closable && (
        <XCircleIcon
          role="button"
          onClick={() => setShowModal(false)}
          className="absolute right-2 top-2 w-6 text-gray-placeholder lg:w-8"
        />
      )}
      <div
        className={clsx(
          'mb-5 flex size-14 items-center justify-center rounded-full',
          {
            'bg-red_alt': icon === 'trash',
            'bg-green-success_alt': icon === 'contact',
            'bg-yellow': icon === 'info',
          }
        )}
      >
        {icon === 'trash' ? (
          <TrashIcon className="w-6 text-red" />
        ) : icon === 'contact' ? (
          <PhoneIcon className="w-6 text-green-success" />
        ) : (
          <InformationCircleIcon className="w-6 text-gray-text" />
        )}
      </div>
      <h6 className="mb-2 text-center font-medium text-gray-text lg:text-2xl lg:font-semibold">
        {title}
      </h6>
      <p className="mb-8 text-center text-sm text-gray-text_inactive lg:text-base">
        {paragraph}
      </p>
      <div className="flex w-full flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-6">
        {buttons.map((button, index) => (
          <Button
            key={index}
            variant={button.variant}
            onClick={button.onClick}
            icon={button.icon}
            className="max-w-52"
          >
            {button.children}
          </Button>
        ))}
      </div>
    </div>
  )
}

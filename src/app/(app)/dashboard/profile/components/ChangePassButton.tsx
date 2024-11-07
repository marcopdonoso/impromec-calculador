import { ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

interface ChangePassButtonProps {
  disabled?: boolean
}

export default function ChangePassButton({ disabled }: ChangePassButtonProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="body_small_medium">Contraseña</p>
      <button
        className="flex h-12 items-center justify-between rounded-lg border border-gray-input bg-gray-white px-5 focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive"
        disabled={disabled}
      >
        <p className="flex h-full items-center">••••••••••</p>
        <ChevronRightIcon className={clsx('w-4', disabled && 'hidden')} />
      </button>
    </div>
  )
}

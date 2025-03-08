import { appLinks } from '@/constants/links.constants'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'

interface ChangePassButtonProps {
  disabled?: boolean
}

export default function ChangePassButton({ disabled }: ChangePassButtonProps) {
  return (
    <div className="flex w-full flex-col gap-1 lg:gap-2">
      <p className="body_small_medium lg:body_medium_medium">Contraseña</p>
      <Link
        className={clsx('w-full', {
          'pointer-events-none': disabled,
        })}
        href={appLinks.profileChangePassword.path}
      >
        <button
          className="flex h-12 w-full items-center justify-between rounded-lg border border-gray-input bg-gray-white px-5 focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive"
          disabled={disabled}
        >
          <p className="flex h-full items-center">••••••••••</p>
          <ChevronRightIcon className={clsx('w-4', disabled && 'hidden')} />
        </button>
      </Link>
    </div>
  )
}

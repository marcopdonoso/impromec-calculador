import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

type NotificationVariant = 'success' | 'error' | 'info' | 'backgroundedInfo'

interface NotificationProps {
  variant?: NotificationVariant
  title?: string
  paragraph: string
}

export default function Notification({
  variant = 'info',
  title,
  paragraph,
}: NotificationProps) {
  const icon =
    variant === 'success' ? (
      <CheckCircleIcon className="w-6 text-green-success" />
    ) : variant === 'error' ? (
      <XCircleIcon className="w-6 text-red" />
    ) : variant === 'info' ? (
      <div className="flex size-5 items-center justify-center rounded-full bg-yellow text-sm font-medium">
        i
      </div>
    ) : (
      variant === 'backgroundedInfo' && (
        <span className="flex h-5 w-5 items-center justify-center rounded-full border text-sm font-medium">
          i
        </span>
      )
    )
  return (
    <div
      className={clsx(
        'flex items-center',
        variant === 'backgroundedInfo'
          ? 'w-80 items-baseline gap-5 rounded-lg bg-gray-background p-9 shadow shadow-shadow sm:w-[66vw]'
          : 'gap-3'
      )}
    >
      <div>{icon}</div>
      <div className="flex flex-col gap-3">
        {title && (
          <p className="font-medium text-gray-text sm:text-lg sm:font-semibold">
            {title}
          </p>
        )}
        <p
          className={clsx('text-sm sm:text-base', {
            'text-green-success': variant === 'success',
            'text-red': variant === 'error',
            'text-gray-text': variant === 'info' || 'backgroundedInfo',
          })}
        >
          {paragraph}
        </p>
      </div>
    </div>
  )
}

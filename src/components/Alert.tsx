import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

type AlertVariant = 'success' | 'error' | 'info'

interface AlertProps {
  variant?: AlertVariant
  paragraph: string
}

export default function Alert({ variant = 'info', paragraph }: AlertProps) {
  const icon =
    variant === 'success' ? (
      <CheckCircleIcon className="w-6 text-green-success" />
    ) : variant === 'error' ? (
      <XCircleIcon className="w-6 text-red" />
    ) : (
      <div className="m-0.5 flex size-5 items-center justify-center rounded-full bg-yellow text-sm font-medium">
        i
      </div>
    )

  return (
    <div className={'flex items-center gap-3'}>
      <div>{icon}</div>
      <p
        className={clsx('text-sm lg:text-base', {
          'text-green-success': variant === 'success',
          'text-red': variant === 'error',
          'text-gray-text': variant === 'info',
        })}
      >
        {paragraph}
      </p>
    </div>
  )
}

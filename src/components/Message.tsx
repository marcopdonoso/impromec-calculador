import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { ReactNode } from 'react'

type MessageVariant = 'success' | 'error' | 'info'

interface MessageProps {
  variant?: MessageVariant
  title?: string
  children: ReactNode
}

export default function Message({
  variant = 'info',
  title,
  children,
}: MessageProps) {
  const icon =
    variant === 'success' ? (
      <CheckCircleIcon className="w-6 text-green-success lg:w-7" />
    ) : variant === 'error' ? (
      <XCircleIcon className="w-6 text-red lg:w-7" />
    ) : (
      <div className="m-0.5 flex size-5 items-center justify-center rounded-full bg-yellow text-sm font-medium lg:size-6">
        i
      </div>
    )
  return (
    <div
      className={clsx(
        'flex gap-4 rounded-lg px-4 py-8 shadow-shadow lg:pl-9 lg:pr-20',
        {
          'bg-yellow_alt shadow': variant === 'info',
          'bg-green-success_alt': variant === 'success',
          'bg-red_alt': variant === 'error',
        }
      )}
    >
      <div>{icon}</div>
      <div className="flex w-full flex-col gap-4">
        <p className="body_medium_medium text-gray-text lg:body_large_semibold">
          {title}
        </p>
        <p
          className={clsx('body_small_regular lg:body_medium_regular', {
            'text-green-success': variant === 'success',
            'text-red': variant === 'error',
            'text-gray-text': variant === 'info',
          })}
        >
          {children}
        </p>
      </div>
    </div>
  )
}

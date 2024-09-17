import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'destructive'
  | 'icon_right'
  | 'add'
  | 'register'
  | 'login'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  children?: React.ReactNode
  icon?: React.ReactNode
  className?: string
}

export default function Button({
  variant = 'primary',
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-lg text-sm font-medium lg:text-base',
        {
          'h-12 w-full':
            variant === 'primary' ||
            variant === 'secondary' ||
            variant === 'tertiary' ||
            variant === 'destructive' ||
            variant === 'add',

          'text-gray-white':
            variant === 'primary' ||
            variant === 'destructive' ||
            variant === 'icon_right' ||
            variant === 'login',

          'bg-gray-button_primary hover:bg-gray-placeholder_icon active:bg-gray-button_primary':
            variant === 'primary' ||
            variant === 'icon_right' ||
            variant === 'login',

          border:
            variant === 'secondary' ||
            variant === 'tertiary' ||
            variant === 'add',

          'text-gray-text':
            variant === 'secondary' ||
            variant === 'tertiary' ||
            variant === 'register',

          'border-gray-input':
            variant === 'secondary' || variant === 'tertiary',

          'bg-gray-white active:bg-gray-white':
            variant === 'secondary' || variant === 'add',

          'h-10 w-52 lg:w-36': variant === 'register' || variant === 'login',

          'disabled:bg-gray-input disabled:text-gray-text_inactive':
            variant === 'primary',

          'hover:bg-gray-background': variant === 'secondary',

          'bg-gray-background hover:bg-gray-input active:bg-gray-background':
            variant === 'tertiary',

          'bg-red hover:bg-red_alt hover:text-red active:bg-red active:text-gray-white':
            variant === 'destructive',

          'border-green-success text-green-success hover:bg-green-success_alt':
            variant === 'add',

          'active:border active:border-gray-input active:bg-gray-background':
            variant === 'register',

          'h-12 w-full pl-5 pr-4': variant === 'icon_right' && children,

          'size-8': variant === 'icon_right' && !children,
        },
        className
      )}
      {...props}
    >
      <div
        className={clsx('flex items-center', {
          'justify-center gap-2': variant !== 'icon_right',
          'flex-row-reverse justify-between':
            variant === 'icon_right' && children,
          'justify-center': variant === 'icon_right' && !children,
        })}
      >
        {icon && <div className="w-5 lg:w-6">{icon}</div>}
        {children}
      </div>
    </button>
  )
}

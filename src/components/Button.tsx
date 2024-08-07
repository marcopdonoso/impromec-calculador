import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

export type ButtonVariant =
  | 'full'
  | 'primary'
  | 'primary_small'
  | 'secondary'
  | 'secondary_small'
  | 'tertiary'
  | 'tertiary_small'
  | 'destructive'
  | 'destructive_small'
  | 'icon_right'
  | 'icon_right_small'
  | 'add'
  | 'add_small'
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
          'h-12':
            variant === 'full' ||
            variant === 'primary' ||
            variant === 'primary_small' ||
            variant === 'secondary' ||
            variant === 'secondary_small' ||
            variant === 'tertiary' ||
            variant === 'tertiary_small' ||
            variant === 'destructive' ||
            variant === 'destructive_small' ||
            variant === 'icon_right_small' ||
            variant === 'add' ||
            variant === 'add_small',

          'text-gray-white':
            variant === 'full' ||
            variant === 'primary' ||
            variant === 'primary_small' ||
            variant === 'destructive' ||
            variant === 'destructive_small' ||
            variant === 'icon_right' ||
            variant === 'icon_right_small' ||
            variant === 'login',

          'bg-gray-button_primary hover:bg-gray-placeholder_icon active:bg-gray-button_primary':
            variant === 'full' ||
            variant === 'primary' ||
            variant === 'primary_small' ||
            variant === 'icon_right' ||
            variant === 'icon_right_small' ||
            variant === 'login',

          border:
            variant === 'secondary' ||
            variant === 'secondary_small' ||
            variant === 'tertiary' ||
            variant === 'tertiary_small' ||
            variant === 'add' ||
            variant === 'add_small',

          'w-52':
            variant === 'primary_small' ||
            variant === 'secondary_small' ||
            variant === 'tertiary_small' ||
            variant === 'destructive_small' ||
            variant === 'icon_right_small' ||
            variant === 'add_small',

          'text-gray-text':
            variant === 'secondary' ||
            variant === 'secondary_small' ||
            variant === 'tertiary' ||
            variant === 'tertiary_small' ||
            variant === 'register',

          'lg:w-[32vw]':
            variant === 'primary' ||
            variant === 'secondary' ||
            variant === 'tertiary' ||
            variant === 'destructive',

          'w-80':
            variant === 'secondary' ||
            variant === 'tertiary' ||
            variant === 'destructive' ||
            variant === 'add',

          'border-gray-input':
            variant === 'secondary' ||
            variant === 'secondary_small' ||
            variant === 'tertiary' ||
            variant === 'tertiary_small',

          'bg-gray-white active:bg-gray-white':
            variant === 'secondary' ||
            variant === 'secondary_small' ||
            variant === 'add' ||
            variant === 'add_small',

          'disabled:bg-gray-input disabled:text-gray-text_inactive':
            variant === 'full' ||
            variant === 'primary' ||
            variant === 'primary_small',

          'w-full': variant === 'full' || variant === 'primary',

          'hover:bg-gray-background':
            variant === 'secondary' || variant === 'secondary_small',

          'bg-gray-background hover:bg-gray-input active:bg-gray-background':
            variant === 'tertiary' || variant === 'tertiary_small',

          'bg-red hover:bg-red_alt hover:text-red active:bg-red active:text-gray-white':
            variant === 'destructive' || variant === 'destructive_small',

          'border-green-success text-green-success hover:bg-green-success_alt':
            variant === 'add' || variant === 'add_small',

          'h-10 w-52 lg:w-36': variant === 'register' || variant === 'login',

          'max-w-80 lg:max-w-none': variant === 'primary',

          'p-3 lg:h-12 lg:px-4 lg:py-0': variant === 'icon_right',

          'px-5': variant === 'icon_right_small',

          'lg:w-[66vw]': variant === 'add',

          'active:border active:border-gray-input active:bg-gray-background':
            variant === 'register',
        },
        className
      )}
      {...props}
    >
      <div
        className={`flex items-center ${variant === 'icon_right' || variant === 'icon_right_small' ? 'flex-row-reverse justify-between gap-4' : 'justify-center gap-2'}`}
      >
        {icon && <div className="w-5 lg:w-6">{icon}</div>}
        {children}
      </div>
    </button>
  )
}

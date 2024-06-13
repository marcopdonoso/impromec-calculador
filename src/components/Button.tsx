import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

type ButtonVariant =
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

interface VariantProps {
  className: string
}

const variants: Record<ButtonVariant, VariantProps> = {
  primary: {
    className:
      'h-12 w-80 bg-gray-button_primary text-gray-white hover:bg-gray-placeholder_icon active:bg-gray-button_primary disabled:bg-gray-input disabled:text-gray-text_inactive sm:w-[32vw]',
  },
  primary_small: {
    className:
      'text-gray-white h-12 w-52 bg-gray-button_primary hover:bg-gray-placeholder_icon active:bg-gray-button_primary disabled:bg-gray-input disabled:text-gray-text_inactive',
  },
  secondary: {
    className:
      'bg-gray-white active:bg-gray-white h-12 w-80 border border-gray-input text-gray-text hover:bg-gray-background sm:w-[32vw]',
  },
  secondary_small: {
    className:
      'bg-gray-white active:bg-gray-white h-12 w-52 border border-gray-input text-gray-text hover:bg-gray-background',
  },
  tertiary: {
    className:
      'h-12 w-80 border border-gray-input bg-gray-background text-gray-text hover:bg-gray-input active:bg-gray-background sm:w-[32vw]',
  },
  tertiary_small: {
    className:
      'h-12 w-52 border border-gray-input bg-gray-background text-gray-text hover:bg-gray-input active:bg-gray-background',
  },
  destructive: {
    className:
      'text-gray-white active:text-gray-white h-12 w-80 bg-red hover:bg-red_alt hover:text-red active:bg-red sm:w-[32vw]',
  },
  destructive_small: {
    className:
      'text-gray-white active:text-gray-white h-12 w-52 bg-red hover:bg-red_alt hover:text-red active:bg-red',
  },
  icon_right: {
    className:
      'text-gray-white bg-gray-button_primary p-3 hover:bg-gray-placeholder_icon active:bg-gray-button_primary sm:h-12 sm:px-4 sm:py-0',
  },
  icon_right_small: {
    className:
      'text-gray-white h-12 w-52 bg-gray-button_primary px-5 hover:bg-gray-placeholder_icon active:bg-gray-button_primary',
  },
  add: {
    className:
      'bg-gray-white active:bg-gray-white h-12 w-80 border border-green-success text-green-success hover:bg-green-success_alt sm:w-[66vw]',
  },
  add_small: {
    className:
      'bg-gray-white active:bg-gray-white h-12 w-52 border border-green-success text-green-success hover:bg-green-success_alt',
  },
  register: {
    className:
      'h-10 w-52 text-gray-text active:border active:border-gray-input active:bg-gray-background sm:w-36',
  },
  login: {
    className:
      'text-gray-white h-10 w-52 bg-gray-button_primary hover:bg-gray-placeholder_icon active:bg-gray-button_primary sm:w-36',
  },
}

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
        'rounded-lg text-sm font-medium sm:text-base',
        variants[variant].className,
        className
      )}
      {...props}
    >
      <div
        className={`flex items-center ${variant === 'icon_right' || variant === 'icon_right_small' ? 'flex-row-reverse justify-between gap-4' : 'justify-center gap-2'}`}
      >
        {icon && <div className="w-5 sm:w-6">{icon}</div>}
        {children}
      </div>
    </button>
  )
}

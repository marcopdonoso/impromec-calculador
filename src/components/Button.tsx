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
      'h-12 w-80 rounded-lg bg-gray-button_primary text-sm font-medium text-gray-white hover:bg-gray-placeholder_icon active:bg-gray-button_primary disabled:bg-gray-input disabled:text-gray-text_inactive sm:w-[32vw] sm:text-base',
  },
  primary_small: {
    className:
      'text-gray-white h-12 w-52 rounded-lg bg-gray-button_primary text-sm font-medium hover:bg-gray-placeholder_icon active:bg-gray-button_primary disabled:bg-gray-input disabled:text-gray-text_inactive sm:text-base',
  },
  secondary: {
    className:
      'bg-gray-white active:bg-gray-white h-12 w-80 rounded-lg border border-gray-input text-sm font-medium text-gray-text hover:bg-gray-background sm:w-[32vw] sm:text-base',
  },
  secondary_small: {
    className:
      'bg-gray-white active:bg-gray-white h-12 w-52 rounded-lg border border-gray-input text-sm font-medium text-gray-text hover:bg-gray-background sm:text-base',
  },
  tertiary: {
    className:
      'h-12 w-80 rounded-lg border border-gray-input bg-gray-background text-sm font-medium text-gray-text hover:bg-gray-input active:bg-gray-background sm:w-[32vw] sm:text-base',
  },
  tertiary_small: {
    className:
      'h-12 w-52 rounded-lg border border-gray-input bg-gray-background text-sm font-medium text-gray-text hover:bg-gray-input active:bg-gray-background sm:text-base',
  },
  destructive: {
    className:
      'text-gray-white active:text-gray-white h-12 w-80 rounded-lg bg-red text-sm font-medium hover:bg-red_alt hover:text-red active:bg-red sm:w-[32vw] sm:text-base',
  },
  destructive_small: {
    className:
      'text-gray-white active:text-gray-white h-12 w-52 rounded-lg bg-red text-sm font-medium hover:bg-red_alt hover:text-red active:bg-red sm:text-base',
  },
  icon_right: {
    className:
      'text-gray-white rounded-lg bg-gray-button_primary p-3 text-sm font-medium hover:bg-gray-placeholder_icon active:bg-gray-button_primary sm:h-12 sm:px-4 sm:py-0 sm:text-base',
  },
  icon_right_small: {
    className:
      'text-gray-white h-12 w-52 rounded-lg bg-gray-button_primary px-5 text-sm font-medium hover:bg-gray-placeholder_icon active:bg-gray-button_primary sm:text-base',
  },
  add: {
    className:
      'bg-gray-white active:bg-gray-white h-12 w-80 rounded-lg border border-green-success text-sm font-medium text-green-success hover:bg-green-success_alt sm:w-[66vw] sm:text-base',
  },
  add_small: {
    className:
      'bg-gray-white active:bg-gray-white h-12 w-52 rounded-lg border border-green-success text-sm font-medium text-green-success hover:bg-green-success_alt sm:text-base',
  },
  register: {
    className:
      'h-10 w-52 rounded-lg text-sm font-medium text-gray-text active:border active:border-gray-input active:bg-gray-background sm:w-36 sm:text-base',
  },
  login: {
    className:
      'text-gray-white h-10 w-52 rounded-lg bg-gray-button_primary text-sm font-medium hover:bg-gray-placeholder_icon active:bg-gray-button_primary sm:w-36 sm:text-base',
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
    <button className={clsx(variants[variant].className, className)} {...props}>
      <div
        className={`flex items-center ${variant === 'icon_right' || variant === 'icon_right_small' ? 'flex-row-reverse justify-between gap-4' : 'justify-center gap-2'}`}
      >
        {icon}
        {children}
      </div>
    </button>
  )
}

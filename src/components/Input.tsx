import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

export type InputVariant = 'small' | 'third' | 'medium' | 'large' | 'full'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  label?: string
  className?: string
  children?: React.ReactNode
}

export default function Input({
  variant = 'full',
  label,
  placeholder,
  className,
  children,
  ...props
}: InputProps) {
  return (
    <label
      className={clsx(
        className,
        'relative flex flex-col justify-start gap-1 text-sm font-medium lg:gap-2 lg:text-base',
        {
          'w-40 lg:w-[14vw]': variant === 'small',
          'w-full max-w-80 lg:w-[19vw] lg:max-w-none': variant === 'third',
          'w-full max-w-80 lg:w-[32vw] lg:max-w-none': variant === 'medium',
          'w-full lg:w-[66vw]': variant === 'large',
          'w-full': variant === 'full',
        }
      )}
      htmlFor={props.name}
    >
      {label}
      <input
        placeholder={placeholder}
        min={0}
        id={props.name}
        className={clsx(
          'h-12 rounded-lg border border-gray-input bg-gray-white pl-5 pr-4 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive lg:text-base lg:placeholder:text-base'
        )}
        {...props}
      />
      {children}
    </label>
  )
}

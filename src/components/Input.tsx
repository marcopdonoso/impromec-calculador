import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

export type InputVariant = 'small' | 'third' | 'default' | 'large'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  label?: string
  placeholder?: string
  className?: string
  children?: React.ReactNode
}

export default function Input({
  variant = 'default',
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
        'relative flex flex-col justify-start gap-1 text-sm font-medium sm:gap-2 sm:text-base',
        {
          'w-40 sm:w-[14vw]': variant === 'small',
          'w-80 sm:w-[19vw]': variant === 'third',
          'w-80 sm:w-[32vw]': variant === 'default',
          'w-80 sm:w-[66vw]': variant === 'large',
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
          'h-12 rounded-lg border border-gray-input bg-gray-white pl-5 pr-4 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive sm:text-base sm:placeholder:text-base'
        )}
        {...props}
      />
      {children}
    </label>
  )
}

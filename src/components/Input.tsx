'use client'
import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

export type InputVariant = 'small' | 'third' | 'default' | 'large'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  label?: string
  className?: string
  children?: React.ReactNode
}

export default function Input({
  variant = 'default',
  label,
  className,
  children,
  ...props
}: InputProps) {
  return (
    <label
      className={clsx(
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
        min={0}
        id={props.name}
        // type={variant === 'password' && isPassword ? 'password' : props.type}
        className={clsx(
          'h-12 rounded-lg border border-gray-input bg-gray-white pl-5 pr-4 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive sm:text-base sm:placeholder:text-base',
          className
        )}
        {...props}
      />
      {children}
      {/* {variant === 'password' && (
        <button
          className="absolute bottom-4 right-4"
          onClick={() => setIsPassword(!isPassword)}
          type="button"
        >
          {isPassword ? (
            <EyeSlashIcon className="w-4 text-gray-text" />
          ) : (
            <EyeIcon className="w-4 text-gray-text" />
          )}
        </button>
      )} */}
    </label>
  )
}

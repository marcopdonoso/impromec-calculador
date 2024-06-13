'use client'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { InputHTMLAttributes, useState } from 'react'

type InputVariant = 'default' | 'large' | 'password'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant
  label?: string
  className?: string
}

export default function Input({
  variant = 'default',
  label,
  className,
  ...props
}: InputProps) {
  const [isPassword, setIsPassword] = useState(true)
  return (
    <label
      className={clsx(
        'relative flex flex-col justify-start font-medium',
        variant === 'large'
          ? 'w-[66vw] gap-2 text-base'
          : 'w-80 gap-1 text-sm sm:w-[32vw] sm:gap-2 sm:text-base'
      )}
      htmlFor="input"
    >
      {label}
      <input
        type={variant === 'password' && isPassword ? 'password' : props.type}
        className={clsx(
          'h-12 rounded-lg border border-gray-input bg-gray-white pl-5 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive sm:text-base sm:placeholder:text-base',
          className
        )}
        {...props}
      />
      {variant === 'password' && (
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
      )}
    </label>
  )
}

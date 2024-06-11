'use client'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { InputHTMLAttributes, useState } from 'react'

type InputVariant = 'default' | 'large' | 'password'

interface VariantProps {
  inputStyles: string
  labelStyles?: string
}

const variants: Record<InputVariant, VariantProps> = {
  default: {
    inputStyles:
      'bg-gray-white h-12 rounded-lg border border-gray-input pl-5 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive sm:text-base sm:placeholder:text-base',
    labelStyles:
      'flex w-80 flex-col justify-start gap-1 text-sm font-medium sm:w-[32vw] sm:gap-2 sm:text-base',
  },
  large: {
    inputStyles:
      'bg-gray-white h-12 rounded-lg border border-gray-input pl-5 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive sm:text-base sm:placeholder:text-base',
    labelStyles:
      'flex w-[66vw] flex-col justify-start gap-2 text-base font-medium',
  },
  password: {
    inputStyles:
      'bg-gray-white h-12 rounded-lg border border-gray-input pl-5 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive sm:text-base sm:placeholder:text-base',
    labelStyles:
      'flex w-80 flex-col justify-start gap-1 text-sm font-medium sm:w-[32vw] sm:gap-2 sm:text-base',
  },
}

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
      className={clsx(variants[variant].labelStyles, 'relative')}
      htmlFor="input"
    >
      {label}
      <input
        type={variant === 'password' && isPassword ? 'password' : props.type}
        name="input"
        className={clsx(variants[variant].inputStyles, className)}
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

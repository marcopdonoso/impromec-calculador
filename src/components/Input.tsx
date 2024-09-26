import clsx from 'clsx'
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
  children?: React.ReactNode
}

export default function Input({
  label,
  className,
  children,
  ...props
}: InputProps) {
  return (
    <label
      className={clsx(
        'relative flex w-full flex-col justify-start gap-1 text-sm font-medium lg:gap-2 lg:text-base',
        className
      )}
      htmlFor={props.name}
    >
      {label}
      <input
        min={0}
        id={props.name}
        className={clsx(
          'h-12 w-full rounded-lg border border-gray-input bg-gray-white pl-5 pr-4 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive lg:text-base lg:placeholder:text-base'
        )}
        {...props}
      />
      {children}
    </label>
  )
}

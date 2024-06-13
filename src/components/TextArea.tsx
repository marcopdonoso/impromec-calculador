import clsx from 'clsx'
import { TextareaHTMLAttributes } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  className?: string
}
export default function Textarea({
  label,
  className,
  ...props
}: TextareaProps) {
  return (
    <label
      className={
        'flex h-40 w-80 flex-col justify-start gap-1 text-sm font-medium sm:w-[32vw] sm:gap-2 sm:text-base'
      }
    >
      {label}
      <textarea
        className={clsx(
          'resize-none rounded-lg border border-gray-input bg-gray-white p-5 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive sm:text-base sm:placeholder:text-base',
          className
        )}
        {...props}
      />
    </label>
  )
}

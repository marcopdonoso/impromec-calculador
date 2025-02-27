import clsx from 'clsx'
import { forwardRef, TextareaHTMLAttributes } from 'react'

export type TextareaVariant = 'medium' | 'large' | 'full'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: TextareaVariant
  label?: string
  className?: string
}
const TextArea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ variant = 'full', label, className, ...props }, ref) => {
    return (
      <label
        className={clsx(
          'flex h-40 flex-col justify-start gap-1 text-sm font-medium lg:gap-2 lg:text-base',
          {
            'w-full max-w-80 lg:w-[32vw] lg:max-w-none': variant === 'medium',
            'w-full lg:w-[66vw]': variant === 'large',
            'w-full': variant === 'full',
          }
        )}
      >
        {label}
        <textarea
          ref={ref}
          className={clsx(
            'h-full resize-none rounded-lg border border-gray-input bg-gray-white p-5 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive lg:text-base lg:placeholder:text-base',
            className
          )}
          {...props}
        />
      </label>
    )
  }
)

TextArea.displayName = 'TextArea'

export default TextArea

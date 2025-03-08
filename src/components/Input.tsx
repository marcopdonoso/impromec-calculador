import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'
import Alert from './Alert'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  className?: string
  children?: React.ReactNode
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className, children, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
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
              'h-12 w-full rounded-lg border bg-gray-white pl-5 pr-4 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive lg:text-base lg:placeholder:text-base',
              {
                'border-red focus:border-red': error,
                'border-gray-input focus:border-gray-placeholder': !error,
              }
            )}
            ref={ref}
            {...props}
          />
          {children}
        </label>
        {error && (
          <div className="absolute left-0 top-[72px] flex items-center gap-3 lg:top-20">
            <Alert variant="error" paragraph={error} />
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input

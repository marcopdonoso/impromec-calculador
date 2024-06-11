import clsx from 'clsx'
import { TextareaHTMLAttributes } from 'react'

const styles = {
  textarea:
    'bg-gray-white rounded-lg border border-gray-input p-5 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive sm:text-base sm:placeholder:text-base',
  label:
    'flex w-80 h-40 flex-col justify-start gap-1 text-sm font-medium sm:w-[32vw] sm:gap-2 sm:text-base',
}

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
    <label className={clsx(styles.label)}>
      {label}
      <textarea
        className={clsx(styles.textarea, className, 'resize-none')}
        {...props}
      />
    </label>
  )
}

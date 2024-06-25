import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { HtmlHTMLAttributes } from 'react'

type ListItemVariant = 'checkmark' | 'elipse'

interface ListItemProps extends HtmlHTMLAttributes<HTMLLIElement> {
  variant?: ListItemVariant
  children: React.ReactNode
}

export default function ListItem({
  variant = 'elipse',
  children,
  ...props
}: ListItemProps) {
  const icon = variant === 'checkmark' && (
    <CheckCircleIcon className="w-5 text-green-success" />
  )

  return (
    <li
      className="flex list-none items-center gap-2 text-sm text-gray-text_inactive sm:text-base"
      {...props}
    >
      {icon ? icon : <div className="h-2 min-w-2 rounded-full bg-gray-text" />}
      {children}
    </li>
  )
}

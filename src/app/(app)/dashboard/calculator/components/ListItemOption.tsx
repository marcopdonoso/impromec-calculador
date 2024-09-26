import { ReactNode } from 'react'

interface ListItemOptionProps {
  children: ReactNode
  onClick: () => void
}

export default function ListItemOption({
  children,
  onClick,
}: ListItemOptionProps) {
  return (
    <div
      className="body_small_regular flex h-9 cursor-pointer items-center px-5 text-gray-text lg:body_medium_regular hover:bg-gray-button_primary hover:text-gray-white lg:h-10"
      onClick={onClick}
    >
      {children}
    </div>
  )
}

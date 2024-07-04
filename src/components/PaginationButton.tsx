interface PaginationButtonProps {
  onClick: () => void
  disabled: boolean
  icon: React.ReactNode
}

export default function PaginationButton({
  onClick,
  disabled,
  icon,
}: PaginationButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={
        'flex size-6 items-center justify-center rounded-md text-gray-text_inactive last-of-type:bg-gray-background'
      }
    >
      {icon}
    </button>
  )
}

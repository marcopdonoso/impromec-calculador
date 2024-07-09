export default function InitialsAvatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
  return (
    <div className="flex size-11 items-center justify-center rounded-full bg-gray-button_primary">
      <p className="font-medium text-gray-white">{initials}</p>
    </div>
  )
}

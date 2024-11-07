import clsx from 'clsx'

interface InitialsAvatarProps {
  name: string
  avatarSizeClassname?: string
  fontClassname?: string
}

export default function InitialsAvatar({
  name,
  avatarSizeClassname,
  fontClassname,
}: InitialsAvatarProps) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('')
  return (
    <div
      className={clsx(
        'flex items-center justify-center rounded-full bg-gray-button_primary',
        avatarSizeClassname ?? 'size-11'
      )}
    >
      <p
        className={clsx(
          'text-gray-white',
          fontClassname ?? 'body_medium_medium'
        )}
      >
        {initials}
      </p>
    </div>
  )
}

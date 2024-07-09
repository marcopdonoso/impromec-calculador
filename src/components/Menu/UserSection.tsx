import { User, userFromStore } from '@/app/page'
import Image from 'next/image'
import InitialsAvatar from './InitialsAvatar'

export default function UserSection() {
  const user: User = userFromStore

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
      {user.avatar ? (
        <div className="relative size-11 overflow-hidden rounded-full">
          <Image src={user.avatar} alt="user_avatar" fill />
        </div>
      ) : (
        <div>
          <InitialsAvatar name={user.name} />
        </div>
      )}
      <div>
        <p className="text-sm text-gray-text sm:text-base sm:font-medium">
          {user.name}
        </p>
        <p className="text-sm text-gray-text_inactive sm:hidden">
          {user.email}
        </p>
      </div>
    </div>
  )
}

import { User } from '@/models/user.model'
import Image from 'next/image'
import InitialsAvatar from './InitialsAvatar'

export default function UserSection({ user }: { user: User }) {
  return (
    <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
      {user.avatar ? (
        <div className="bg-gray-100 flex size-11 items-center justify-center overflow-hidden rounded-full">
          <Image
            src={user.avatar}
            alt="avatar"
            width={44}
            height={44}
            className="object-contain"
          />
        </div>
      ) : (
        <div>
          <InitialsAvatar name={user.name} />
        </div>
      )}
      <div>
        <p className="text-sm text-gray-text lg:text-base lg:font-medium">
          {user.name}
        </p>
        <p className="text-sm text-gray-text_inactive lg:hidden">
          {user.email}
        </p>
      </div>
    </div>
  )
}

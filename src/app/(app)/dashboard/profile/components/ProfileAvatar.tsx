import InitialsAvatar from '@/components/Menu/InitialsAvatar'
import { User } from '@/models/user.model'
import { CameraIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { ChangeEvent } from 'react'

interface ProfileAvatarProps {
  user: User
  newImageFile?: File | null
  isFormDisabled?: boolean
  handleNewImageFileChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function ProfileAvatar({
  user,
  newImageFile,
  isFormDisabled,
  handleNewImageFileChange,
}: ProfileAvatarProps) {
  const avatarImage = newImageFile
    ? URL.createObjectURL(newImageFile)
    : user.avatar

  return (
    <div
      className={clsx('absolute top-0 size-20 -translate-y-1/2 rounded-full', {
        'cursor-default': isFormDisabled,
      })}
    >
      <label
        className={clsx('absolute z-10 size-full rounded-full', {
          'pointer-events-none': isFormDisabled,
          'cursor-pointer': !isFormDisabled,
        })}
      >
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg, image/webp"
          onChange={handleNewImageFileChange}
          className="hidden"
        />
      </label>
      {avatarImage ? (
        <div className="bg-gray-100 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
          <Image
            src={avatarImage}
            alt="avatar"
            width={80}
            height={80}
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <InitialsAvatar
          name={user.name}
          avatarSizeClassname="size-20"
          fontClassname="heading_h4"
        />
      )}
      <div
        className={clsx(
          'clip-bottom-40 absolute bottom-0 size-full rounded-b-full bg-gray-input',
          isFormDisabled && 'hidden'
        )}
      >
        <CameraIcon className="absolute bottom-1 left-1/2 w-6 -translate-x-1/2" />
      </div>
    </div>
  )
}

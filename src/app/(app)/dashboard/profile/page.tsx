'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InitialsAvatar from '@/components/Menu/InitialsAvatar'
import MyListbox from '@/components/MyListbox'
import MyPhoneInput from '@/components/MyPhoneInput'
import { specializationAreas } from '@/constants/specialization-areas.constants'
import { User } from '@/models/user.model'
import { CameraIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { Value } from 'react-phone-number-input'
import ChangePassButton from './components/ChangePassButton'

export default function ProfilePage() {
  // TODO: Eliminar datos falsos y reemplazar por datos de sesión
  const mockedUser: User = {
    id: '1-1-1-1-1',
    name: 'Usuario Falso',
    email: 'usuario@gmail.com',
    company: 'Impromec',
    category: {
      text: 'Construcciones',
      value: 'construction',
    },
    phone: '+5412312312',
    location: 'Cochabamba',
  }
  const user: User | null = mockedUser

  const [isFormDisabled, setIsFormDisabled] = useState(true)

  return (
    <div className="min-h-screen px-2 pb-20 pt-14">
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-gray-placeholder bg-gray-white px-2 pb-12 pt-16">
        <div className="absolute top-0 size-20 -translate-y-1/2 rounded-full">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt="avatar"
              height={80}
              width={80}
              className="h-20 w-auto"
            />
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

        <div className="flex w-full flex-col gap-6">
          <Input
            label="Nombre completo"
            defaultValue={user.name}
            disabled={isFormDisabled}
          />
          <Input
            label="Correo electrónico"
            type="email"
            defaultValue={user.email}
            disabled={isFormDisabled}
          />
          <Input
            label="Empresa (opcional)"
            defaultValue={user.company ?? ''}
            disabled={isFormDisabled}
          />
          <MyListbox
            label="Área de especialización"
            options={specializationAreas}
            defaultValue={user.category}
            disabled={isFormDisabled}
          />

          <MyPhoneInput
            initialValue={user.phone as Value}
            disabled={isFormDisabled}
          />

          <Input
            label="Locación"
            defaultValue={user.location}
            disabled={isFormDisabled}
          />

          <ChangePassButton disabled={isFormDisabled} />
        </div>
      </div>

      <div
        className={clsx(
          'mt-8 flex flex-col gap-6',
          !isFormDisabled && 'hidden'
        )}
      >
        <Button onClick={() => setIsFormDisabled(false)}>Editar perfil</Button>
        <Button variant="destructive">Eliminar cuenta</Button>
      </div>

      <div
        className={clsx('mt-8 flex flex-col gap-6', isFormDisabled && 'hidden')}
      >
        <Button>Guardar</Button>
        <Button variant="secondary" onClick={() => setIsFormDisabled(true)}>
          Cancelar
        </Button>
      </div>
    </div>
  )
}

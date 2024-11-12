'use client'
import Input from '@/components/Input'
import MyListbox from '@/components/MyListbox'
import MyPhoneInput from '@/components/MyPhoneInput'
import { specializationAreas } from '@/constants/specialization-areas.constants'
import { User } from '@/models/user.model'
import { ChangeEvent, useState } from 'react'
import { Value } from 'react-phone-number-input'
import ButtonsGroup from './components/ButtonsGroup'
import ChangePassButton from './components/ChangePassButton'
import ProfileAvatar from './components/ProfileAvatar'

export default function ProfilePage() {
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
    // avatar: '/img/uf_image.webp',
  }
  const user: User | null = mockedUser

  const [isFormDisabled, setIsFormDisabled] = useState(true)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)

  const handleNewImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImageFile(e.target.files[0])
    }
  }
  return (
    <>
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-gray-placeholder bg-gray-white px-2 pb-12 pt-16 lg:px-28 lg:pt-14">
        <ProfileAvatar
          newImageFile={newImageFile}
          isFormDisabled={isFormDisabled}
          handleNewImageFileChange={handleNewImageFileChange}
        />

        <h4 className="hidden lg:heading_h4 lg:mb-12 lg:block">{user.name}</h4>

        <div className="flex w-full flex-col gap-6">
          <Input
            label="Nombre completo"
            defaultValue={user.name}
            disabled={isFormDisabled}
          />

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
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
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
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
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <Input
              label="Locación"
              defaultValue={user.location}
              disabled={isFormDisabled}
            />

            <ChangePassButton disabled={isFormDisabled} />
          </div>

          <div className="hidden lg:block">
            <ButtonsGroup
              isFormDisabled={isFormDisabled}
              setIsFormDisabled={setIsFormDisabled}
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <ButtonsGroup
          isFormDisabled={isFormDisabled}
          setIsFormDisabled={setIsFormDisabled}
        />
      </div>
    </>
  )
}

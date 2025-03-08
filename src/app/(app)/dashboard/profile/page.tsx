'use client'
import Alert from '@/components/Alert'
import Input from '@/components/Input'
import MyListbox from '@/components/MyListbox'
import MyPhoneInput from '@/components/MyPhoneInput'
import { specializationAreas } from '@/constants/specialization-areas.constants'
import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from '@/services/profile.service'
import { useUserStore } from '@/store/useStore'
import { ChangeEvent, useEffect, useState } from 'react'
import { Value } from 'react-phone-number-input'
import ButtonsGroup from './components/ButtonsGroup'
import ChangePassButton from './components/ChangePassButton'
import ProfileAvatar from './components/ProfileAvatar'

export default function ProfilePage() {
  const { user, setUser } = useUserStore()
  const [isFormDisabled, setIsFormDisabled] = useState(true)
  const [newImageFile, setNewImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    category: user?.category || specializationAreas[0],
    phone: user?.phone || '',
    location: user?.location || '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await getProfile()
      if (response.data) {
        setUser(response.data.user)
        setFormData({
          name: response.data.user.name,
          email: response.data.user.email,
          company: response.data.user.company || '',
          category: response.data.user.category,
          phone: response.data.user.phone,
          location: response.data.user.location,
        })
      }
    }

    if (!user) {
      fetchUserProfile()
    }
  }, [user, setUser])

  const handleNewImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0])

      if (!isFormDisabled) {
        setLoading(true)
        setError(null)

        const response = await uploadAvatar(e.target.files[0])

        if (response.data) {
          setUser(response.data.user)
          setSuccess('Avatar actualizado correctamente')
          setTimeout(() => {
            setSuccess(null)
          }, 3000)
        }

        if (response.error) {
          setError(response.error.message)
        }

        setLoading(false)
      }
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSaveChanges = async () => {
    setLoading(true)
    setError(null)

    const updateData = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      category: formData.category,
      phone: formData.phone,
      location: formData.location,
    }

    const response = await updateProfile(updateData)

    if (response.data) {
      setUser(response.data.user)
      setSuccess('Perfil actualizado correctamente')
      setTimeout(() => {
        setSuccess(null)
      }, 3000)
      setIsFormDisabled(true)
    }

    if (response.error) {
      setError(response.error.message)
    }

    setLoading(false)
    setNewImageFile(null)
  }

  const handleCancel = () => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        company: user.company || '',
        category: user.category,
        phone: user.phone,
        location: user.location,
      })
    }

    setNewImageFile(null)
    setIsFormDisabled(true)
    setError(null)
  }

  if (!user) {
    return <div className="flex justify-center p-8">Cargando perfil...</div>
  }

  return (
    <>
      <div className="relative flex flex-col items-center justify-center rounded-2xl border border-gray-placeholder bg-gray-white px-2 pb-12 pt-16 lg:px-28 lg:pt-14">
        <ProfileAvatar
          user={user}
          newImageFile={newImageFile}
          isFormDisabled={isFormDisabled}
          handleNewImageFileChange={handleNewImageFileChange}
        />

        <h4 className="hidden lg:heading_h4 lg:mb-12 lg:block">{user.name}</h4>

        {error && (
          <div className="mb-4 w-full">
            <Alert variant="error" paragraph={error} />
          </div>
        )}

        {success && (
          <div className="mb-4 w-full">
            <Alert variant="success" paragraph={success} />
          </div>
        )}

        <div className="flex w-full flex-col gap-6">
          <Input
            label="Nombre completo"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={isFormDisabled}
          />

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <Input
              label="Correo electrónico"
              type="email"
              value={formData.email}
              disabled={true}
            />
            <Input
              label="Empresa (opcional)"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              disabled={isFormDisabled}
            />
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <MyListbox
              label="Área de especialización"
              options={specializationAreas}
              value={formData.category}
              onChange={(value) => handleInputChange('category', value)}
              disabled={isFormDisabled}
            />

            <MyPhoneInput
              value={user.phone as Value}
              disabled={isFormDisabled}
              onChange={(value) => handleInputChange('phone', value || '')}
            />
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <Input
              label="Locación"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              disabled={isFormDisabled}
            />

            <ChangePassButton disabled={isFormDisabled} />
          </div>

          <div className="hidden lg:block">
            <ButtonsGroup
              isFormDisabled={isFormDisabled}
              setIsFormDisabled={setIsFormDisabled}
              onSave={handleSaveChanges}
              onCancel={handleCancel}
              loading={loading}
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <ButtonsGroup
          isFormDisabled={isFormDisabled}
          setIsFormDisabled={setIsFormDisabled}
          onSave={handleSaveChanges}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </>
  )
}

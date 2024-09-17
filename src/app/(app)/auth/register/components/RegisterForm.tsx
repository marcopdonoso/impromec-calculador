'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputPass from '@/components/InputPass'
import MyListbox from '@/components/MyListbox'
import { specializationAreas } from '@/constants/specialization-areas.constants'
import { useState } from 'react'
import PhoneInput, { Value } from 'react-phone-number-input'

export default function RegisterForm() {
  const [phoneInputValue, setPhoneInputValue] = useState<Value | undefined>()

  return (
    <form className="mt-6 flex w-full flex-col items-center gap-6">
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <Input label="Nombre completo" placeholder="Ej: José Rodríguez Soto" />
        <Input
          type="email"
          label="Correo electrónico"
          placeholder="Ej: yo@correo.com"
        />
      </div>
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <Input label="Empresa (opcional)" placeholder="Ej: Empresa ABC" />
        <MyListbox
          label="Área de especialización"
          options={specializationAreas}
        />
      </div>
      <div className="flex w-full flex-col items-center gap-6 lg:flex-row lg:gap-8">
        <label className="flex w-full flex-col justify-start gap-1 text-sm font-medium lg:gap-2 lg:text-base">
          Número de teléfono
          <PhoneInput
            defaultCountry="BO"
            placeholder="1 234 5678"
            value={phoneInputValue}
            onChange={setPhoneInputValue}
            numberInputProps={{
              className:
                'h-12 w-full px-5 py-3 focus:outline-none rounded-lg border border-gray-input bg-gray-white pl-5 text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive lg:text-base lg:placeholder:text-base',
            }}
          />
        </label>
        <Input label="Locación" placeholder="Cochabamba, Bolivia" />
      </div>
      <div className="flex w-full flex-col items-center gap-6 lg:mb-24 lg:flex-row lg:gap-8">
        <InputPass
          label="Contraseña"
          placeholder="8+caracteres: letras, números, símbolos"
        />
        <InputPass
          label="Confirmar contraseña"
          placeholder="Repite la contraseña"
          className="mb-20 lg:mb-0"
        />
      </div>
      <Button className="lg:w-[32vw]">Registrarme</Button>
    </form>
  )
}

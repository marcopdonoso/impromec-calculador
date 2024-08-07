'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputPass from '@/components/InputPass'
import MyListbox from '@/components/MyListbox'
import { specializationAreas } from '@/constants/specialization-areas.constants'
import Link from 'next/link'
import { useState } from 'react'
import PhoneInput, { Value } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

export default function RegisterPage() {
  const [phoneInputValue, setPhoneInputValue] = useState<Value | undefined>()
  return (
    <main className="px-2 pb-20 pt-8">
      <section className="flex flex-col items-center rounded-lg bg-gray-background px-2 py-8">
        <h4 className="body_large_semibold mb-2 text-center">
          ¡Regístrate y comienza hoy!
        </h4>
        <p className="body_small_regular mb-6 text-center">
          Accede y utiliza nuestra calculadora de bandejas portacables de forma
          segura y confiable.
        </p>
        <form className="flex w-full flex-col items-center gap-6">
          <Input
            label="Nombre completo"
            placeholder="Ej: José Rodríguez Soto"
          />
          <Input label="Correo electrónico" placeholder="Ej: yo@correo.com" />
          <Input label="Empresa (opcional)" placeholder="Ej: Empresa ABC" />
          <MyListbox
            label="Área de especialización"
            options={specializationAreas}
          />
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
          <InputPass
            label="Contraseña"
            placeholder="8+caracteres: letras, números, símbolos"
          />
          <InputPass
            label="Confirmar contraseña"
            placeholder="Repite la contraseña"
            className="mb-20"
          />
          <Button>Continuar</Button>
        </form>
        <hr className="my-6 w-full text-gray-placeholder" />
        <p className="body_small_regular">
          ¿Ya tienes una cuenta?{' '}
          <Link className="body_small_medium" href={'/login'}>
            Inicia sesión
          </Link>
        </p>
      </section>
    </main>
  )
}

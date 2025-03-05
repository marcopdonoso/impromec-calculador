'use client'
import { XCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef } from 'react'
import PhoneInput, {
  Country,
  getCountryCallingCode,
  Value,
} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface MyPhoneInputProps {
  value?: Value
  onChange: (value: Value | undefined) => void
  error?: string
  disabled?: boolean
}

export default function MyPhoneInput({
  value,
  onChange,
  error,
  disabled,
}: MyPhoneInputProps) {
  const initializedRef = useRef(false)

  // Manejar cambio de país con código prellenado
  const handleCountryChange = (country: Country) => {
    if (country) {
      const countryCode = `+${getCountryCallingCode(country)}` as Value
      onChange(countryCode)
    }
  }

  // Este efecto se ejecuta solo la primera vez para establecer el código de país inicial
  useEffect(() => {
    if (!initializedRef.current && !value) {
      const defaultCountry = 'BO'
      const defaultCode = `+${getCountryCallingCode(defaultCountry)}` as Value
      onChange(defaultCode)
      initializedRef.current = true
    }
  }, [value, onChange])

  return (
    <div className="relative w-full">
      <label className="body_small_medium flex w-full flex-col justify-start gap-1 lg:body_medium_medium lg:gap-2">
        Número de teléfono
        <PhoneInput
          disabled={disabled}
          defaultCountry="BO"
          placeholder="12345678"
          value={value}
          onChange={onChange}
          onCountryChange={handleCountryChange}
          international
          withCountryCallingCode
          numberInputProps={{
            className:
              'h-12 w-full px-5 py-3 rounded-lg border border-gray-input bg-gray-white text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive lg:text-base lg:placeholder:text-base',
          }}
        />
      </label>
      {error && (
        <div className="absolute left-0 top-[72px] flex items-center gap-3 lg:top-20">
          <XCircleIcon className="h-5 w-5 text-red" />
          <p className="body_small_regular text-red lg:body_medium_regular">
            {error}
          </p>
        </div>
      )}
    </div>
  )
}

'use client'
import { useState } from 'react'
import PhoneInput, { Value } from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface MyPhoneInputProps {
  initialValue?: Value
  disabled?: boolean
}

export default function MyPhoneInput({
  initialValue,
  disabled,
}: MyPhoneInputProps) {
  const [phoneInputValue, setPhoneInputValue] = useState<Value | undefined>(
    initialValue
  )

  return (
    <label className="body_small_medium flex w-full flex-col justify-start gap-1 lg:body_medium_regular lg:gap-2">
      Número de teléfono
      <PhoneInput
        disabled={disabled}
        defaultCountry="BO"
        placeholder="1 234 5678"
        value={phoneInputValue}
        onChange={setPhoneInputValue}
        numberInputProps={{
          className:
            'h-12 w-full px-5 py-3 rounded-lg border border-gray-input bg-gray-white text-sm font-normal text-gray-text placeholder:text-sm placeholder:text-gray-placeholder focus:border-gray-placeholder focus:outline-none focus:ring-0 disabled:text-gray-text_inactive lg:text-base lg:placeholder:text-base',
        }}
      />
    </label>
  )
}

'use client'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import Input, { InputVariant } from './Input'

interface InputPassProps {
  variant?: InputVariant
  label?: string
  className?: string
}

export default function InputPass({
  variant,
  label,
  className,
}: InputPassProps) {
  const [showPass, setShowPass] = useState(false)
  return (
    <Input
      variant={variant}
      label={label}
      className={className}
      type={!showPass ? 'password' : 'text'}
    >
      <button
        className="absolute bottom-4 right-4"
        onClick={() => setShowPass(!showPass)}
        type="button"
      >
        {!showPass ? (
          <EyeSlashIcon className="w-4 text-gray-text" />
        ) : (
          <EyeIcon className="w-4 text-gray-text" />
        )}
      </button>
    </Input>
  )
}

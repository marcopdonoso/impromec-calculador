'use client'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { forwardRef, useState } from 'react'
import Input, { InputProps } from './Input'

interface InputPassProps extends InputProps {}

const InputPass = forwardRef<HTMLInputElement, InputPassProps>(
  ({ label, placeholder, className, error, ...props }, ref) => {
    const [showPass, setShowPass] = useState(false)

    return (
      <Input
        label={label}
        className={className}
        type={showPass ? 'text' : 'password'}
        placeholder={placeholder}
        error={error}
        ref={ref}
        autoComplete={
          props.name === 'confirmPassword' ? 'new-password' : 'current-password'
        }
        {...props}
      >
        <button
          type="button"
          className="absolute bottom-4 right-4"
          onClick={() => setShowPass(!showPass)}
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
)

InputPass.displayName = 'InputPass'

export default InputPass

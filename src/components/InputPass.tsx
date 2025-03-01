'use client'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { forwardRef, useCallback, useState } from 'react'
import Input, { InputProps } from './Input'

interface InputPassProps extends InputProps {}

const InputPass = forwardRef<HTMLInputElement, InputPassProps>(
  ({ label, placeholder, className, error, ...props }, ref) => {
    const [showPass, setShowPass] = useState(false)

    const handleShowPass = useCallback(() => {
      setShowPass((prev) => !prev)
    }, [])

    return (
      <div className="relative w-full">
        <Input
          label={label}
          className={`${className} absolute w-full`}
          type={showPass ? 'text' : 'password'}
          placeholder={placeholder}
          error={error}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="absolute inset-y-10 right-4"
          onClick={handleShowPass}
        >
          {!showPass ? (
            <EyeSlashIcon className="w-4 text-gray-text" />
          ) : (
            <EyeIcon className="w-4 text-gray-text" />
          )}
        </button>
      </div>
    )
  }
)

InputPass.displayName = 'InputPass'

export default InputPass

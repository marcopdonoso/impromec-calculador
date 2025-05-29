'use client'
import { Switch } from '@headlessui/react'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface MySwitchProps {
  initialValue?: boolean
  onChange?: (enabled: boolean) => void
}

export default function MySwitch({ initialValue = false, onChange }: MySwitchProps) {
  const [enabled, setEnabled] = useState(initialValue)

  const handleChange = (newValue: boolean) => {
    setEnabled(newValue)
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <Switch
      checked={enabled}
      onChange={handleChange}
      className="data-[checked]:bg-blue-600 group relative inline-flex h-8 w-14 items-center rounded-full bg-gray-input transition"
    >
      <span className="flex size-7 translate-x-[2px] items-center justify-center rounded-full bg-red transition group-data-[checked]:translate-x-[26px] group-data-[checked]:bg-green-success">
        <CheckIcon className="hidden w-4 stroke-2 text-gray-white group-data-[checked]:block" />{' '}
        <XMarkIcon className="w-4 stroke-2 text-gray-white group-data-[checked]:hidden" />
      </span>
      <p className="absolute left-[69px]">{enabled ? 'Si' : 'No'}</p>
    </Switch>
  )
}

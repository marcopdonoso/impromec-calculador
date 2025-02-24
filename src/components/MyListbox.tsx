'use client'
import { OptionCategory } from '@/constants/specialization-areas.constants'
import {
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'

type ListBoxVariant = 'standard' | 'sorting'

const variants: Record<ListBoxVariant, string> = {
  standard: 'flex-col w-full',
  sorting: 'w-fit flex-row items-center gap-1',
}

export interface Option {
  text: string
  value: string | number
}

interface MyListboxProps {
  variant?: ListBoxVariant
  label?: string
  options: OptionCategory[] | Option[]
  backgroundColor?: string
  className?: string
  name?: string
  value: OptionCategory | Option | null
  onChange: (selectedOption: OptionCategory | Option) => void
  disabled?: boolean
  error?: string
}

export default function MyListbox({
  variant = 'standard',
  label,
  options,
  backgroundColor,
  className,
  name,
  value,
  onChange,
  disabled,
  error,
}: MyListboxProps) {
  const [isOpen, setIsOpen] = useState(false)

  const safeValue = value || options[0] || { text: 'Seleccionar', value: '' }

  if (!options.length) return <div>No hay opciones disponibles</div>

  const handleSelect = (option: OptionCategory | Option) => {
    onChange(option)
    setIsOpen(false)
  }

  return (
    <div className="w-full">
      <Field className={clsx('flex w-full', variants[variant], className)}>
        {label && (
          <Label
            className={clsx(
              'text-sm font-medium text-gray-text lg:text-base',
              variant !== 'sorting' && 'mb-1 truncate lg:mb-2'
            )}
          >
            {label}
          </Label>
        )}
        <Listbox
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        >
          <ListboxButton
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
              'relative text-sm lg:text-base',
              disabled ? 'text-gray-text_inactive' : 'text-gray-text',
              variant === 'sorting'
                ? 'w-fit pr-10 text-end'
                : 'h-12 w-full truncate rounded-lg border border-gray-input px-5 text-left focus:outline-none',
              backgroundColor
                ? backgroundColor
                : variant === 'standard' && 'bg-gray-white'
            )}
          >
            {safeValue.text}
            {isOpen ? (
              <ChevronUpIcon
                className={clsx(
                  'pointer-events-none absolute right-3 w-4',
                  variant === 'sorting' ? 'top-1' : 'top-4'
                )}
                aria-hidden="true"
              />
            ) : (
              <ChevronDownIcon
                className={clsx(
                  'pointer-events-none absolute right-3 w-4',
                  variant === 'sorting' ? 'top-1' : 'top-4'
                )}
                aria-hidden="true"
              />
            )}
          </ListboxButton>
          <Transition
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions
              anchor="bottom"
              className={clsx(
                'mt-1 rounded-md bg-gray-white py-2 text-gray-text shadow shadow-shadow focus:outline-none lg:mt-2',
                variant !== 'sorting' && 'w-[var(--button-width)]'
              )}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  setIsOpen(false)
                }
              }}
            >
              {options.map((option) => (
                <ListboxOption
                  key={option.text}
                  value={option}
                  className="cursor-default select-none truncate border-t border-gray-background px-5 py-2 text-sm first:border-t-0 data-[focus]:bg-gray-button_primary data-[focus]:text-gray-white lg:text-base"
                  onClick={() => handleSelect(option)}
                >
                  {option.text}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </Listbox>
      </Field>
      {error && (
        <div className="flex items-center gap-3">
          <XCircleIcon className="h-5 w-5 text-red" />
          <p className="body_small_regular text-red lg:body_medium_regular">
            {error}
          </p>
        </div>
      )}
    </div>
  )
}

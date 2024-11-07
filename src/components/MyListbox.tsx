'use client'
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
  options: Option[]
  backgroundColor?: string
  className?: string
  name?: string
  onChange?: (selectedOption: Option) => void
  defaultValue?: Option
  disabled?: boolean
}

export default function MyListbox({
  variant = 'standard',
  label,
  options,
  backgroundColor,
  className,
  name,
  onChange,
  defaultValue,
  disabled,
}: MyListboxProps) {
  const [selected, setSelected] = useState(defaultValue ?? options[0])
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (option: Option) => {
    setSelected(option)
    setIsOpen(false)
    if (onChange) {
      onChange(option)
    }
  }

  return (
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
        value={selected}
        onChange={setSelected}
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
          {selected.text}
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
  )
}

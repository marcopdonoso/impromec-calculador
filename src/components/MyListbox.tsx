'use client'
import { Option } from '@/models/listbox.model'
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

type ListBoxVariant = 'small' | 'medium' | 'large' | 'full' | 'sorting'

const variants: Record<ListBoxVariant, string> = {
  small: 'flex-col w-40 lg:w-[14vw] lg:min-w-28',
  medium: 'flex-col w-[19vw] min-w-28',
  large: 'flex-col w-80 lg:w-[32vw] lg:min-w-28',
  full: 'flex-col w-full',
  sorting: 'w-fit flex-row items-center gap-1',
}

interface MyListboxProps {
  variant?: ListBoxVariant
  label?: string
  options: Option[]
  className?: string
  name?: string
}

export default function MyListbox({
  variant = 'full',
  label,
  options,
  className,
  name,
}: MyListboxProps) {
  const [selected, setSelected] = useState(options[0])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Field className={clsx('flex', variants[variant], className)}>
      <Label
        className={clsx(
          'font-medium text-gray-text',
          variant !== 'sorting' && 'truncate text-sm lg:text-base'
        )}
      >
        {label}
      </Label>
      <Listbox name={name} value={selected} onChange={setSelected}>
        <ListboxButton
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'relative bg-gray-white text-gray-text',
            variant === 'sorting'
              ? 'w-fit pr-10 text-end'
              : 'mt-1 h-12 w-full truncate rounded-lg border border-gray-input px-5 text-left text-sm focus:outline-none lg:mt-2 lg:text-base'
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
                onClick={() => setIsOpen(false)}
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

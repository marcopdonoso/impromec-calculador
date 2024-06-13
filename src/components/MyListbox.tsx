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

type ListBoxVariant = 'small' | 'medium' | 'large' | 'order'

const variants: Record<ListBoxVariant, string> = {
  small: 'w-40 sm:w-[14vw] sm:min-w-min',
  medium: 'w-[19vw] sm:min-w-min',
  large: 'w-80 sm:w-[32vw] sm:min-w-min',
  order: 'w-fit flex items-center gap-1',
}

interface Option {
  text: string
  value: string | number
}

interface MyListboxProps {
  variant?: ListBoxVariant
  label?: string
  options: Option[]
  className?: string
}

export default function MyListbox({
  variant = 'small',
  label,
  options,
  className,
}: MyListboxProps) {
  const [selected, setSelected] = useState(options[0])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Field className={clsx(variants[variant], className)}>
      <Label
        className={clsx(
          'font-medium text-gray-text',
          variant !== 'order' && 'truncate text-sm sm:text-base'
        )}
      >
        {label}
      </Label>
      <Listbox value={selected} onChange={setSelected}>
        <ListboxButton
          onClick={() => setIsOpen(!isOpen)}
          className={clsx(
            'relative text-gray-text',
            variant === 'order'
              ? 'w-fit pr-10 text-end'
              : 'mt-1 h-12 w-full truncate rounded-lg border border-gray-input px-5 text-left text-sm focus:outline-none sm:mt-2 sm:text-base'
          )}
        >
          {selected.text}
          {isOpen ? (
            <ChevronUpIcon
              className={clsx(
                'pointer-events-none absolute right-3 w-4',
                variant === 'order' ? 'top-1' : 'top-4'
              )}
              aria-hidden="true"
            />
          ) : (
            <ChevronDownIcon
              className={clsx(
                'pointer-events-none absolute right-3 w-4',
                variant === 'order' ? 'top-1' : 'top-4'
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
              'shadow-shadow mt-1 rounded-md py-2 text-gray-text shadow focus:outline-none sm:mt-2',
              variant !== 'order' && 'w-[var(--button-width)]'
            )}
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option}
                className="cursor-default select-none truncate border-t border-gray-background px-5 py-2 text-sm first:border-t-0 data-[focus]:bg-gray-button_primary data-[focus]:text-gray-white sm:text-base"
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

'use client'
import {
  Field,
  Label,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'

export interface RadioGroupItem {
  label: string
  value: any
  image?: string
}
interface MyRadiogroupProps extends RadioGroupProps {
  items: RadioGroupItem[]
  className?: string
}

export default function MyRadiogroup({
  items,
  className,
  ...props
}: MyRadiogroupProps) {
  const [selected, setSelected] = useState(items[0].value)

  return (
    <RadioGroup
      className={clsx(className)}
      value={selected}
      onChange={setSelected}
      name={props.name}
      {...props}
    >
      {items.map((item) => {
        const bgStyle = item.image
          ? { backgroundImage: `url(/img/${item.image}.png)` }
          : {}

        return (
          <Field
            key={item.label}
            className={clsx(
              item.image &&
                `inline-block size-40 rounded-lg bg-gray-background bg-cover bg-no-repeat p-3 lg:size-48`,
              {
                'text-gray-text_inactive': props.disabled,
                'text-gray-dark': !props.disabled,
              }
            )}
            style={bgStyle}
            onClick={() => setSelected(item.value)}
            disabled={props.disabled}
          >
            <div className="flex items-center gap-2">
              <Radio
                value={item.value}
                className={clsx(
                  'group flex size-4 items-center justify-center rounded-full border bg-gray-white outline-none data-[checked]:border-green-success data-[checked]:bg-green-success lg:size-5',
                  {
                    'cursor-not-allowed border-gray-input data-[checked]:cursor-default':
                      props.disabled,
                    'border-gray-placeholder_icon': !props.disabled,
                  }
                )}
              >
                <span className="invisible size-2 rounded-full bg-gray-white group-data-[checked]:visible lg:size-[10px]" />
              </Radio>
              <Label className={clsx('text-sm lg:text-base')}>
                {item.label}
              </Label>
            </div>
          </Field>
        )
      })}
    </RadioGroup>
  )
}

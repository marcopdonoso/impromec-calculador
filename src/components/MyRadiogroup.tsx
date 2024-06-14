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

interface Item {
  label: string
  image?: string
}
interface MyRadiogroupProps extends RadioGroupProps {
  items: Item[]
  className?: string
}

export default function MyRadiogroup({
  items,
  className,
  ...props
}: MyRadiogroupProps) {
  const [selected, setSelected] = useState(items[0].label)

  return (
    <RadioGroup
      className={clsx(className)}
      value={selected}
      onChange={setSelected}
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
                `inline-block size-40 rounded-lg bg-gray-placeholder/15 bg-cover bg-no-repeat p-3 sm:size-48`
            )}
            style={bgStyle}
            onClick={() => setSelected(item.label)}
          >
            <div className="flex items-center gap-2">
              <Radio
                value={item.label}
                className="group flex size-4 items-center justify-center rounded-full border border-gray-placeholder_icon bg-gray-white outline-none data-[checked]:border-green-success data-[checked]:bg-green-success sm:size-5"
              >
                <span className="invisible size-2 rounded-full bg-gray-white group-data-[checked]:visible sm:size-[10px]" />
              </Radio>
              <Label className={'text-sm text-gray-dark sm:text-base'}>
                {item.label}
              </Label>
            </div>
          </Field>
        )
      })}
    </RadioGroup>
  )
}

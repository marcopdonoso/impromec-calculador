import {
  Field,
  Label,
  Radio,
  RadioGroup,
  RadioGroupProps,
} from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'

interface MyRadiogroupProps extends RadioGroupProps {
  items: string[]
  className?: string
}

export default function MyRadiogroup({
  items,
  className,
  ...props
}: MyRadiogroupProps) {
  let [selected, setSelected] = useState(items[0])

  return (
    <RadioGroup value={selected} onChange={setSelected} {...props}>
      {items.map((item) => (
        <Field
          key={item}
          className={clsx('flex items-center gap-2', className)}
        >
          <Radio
            value={item}
            className="bg-white group flex size-4 items-center justify-center rounded-full border border-gray-placeholder_icon outline-none data-[checked]:border-green-success data-[checked]:bg-green-success sm:size-5"
          >
            <span className="invisible size-2 rounded-full bg-gray-white group-data-[checked]:visible" />
          </Radio>
          <Label className={'text-gray-dark text-sm sm:text-base'}>
            {item}
          </Label>
        </Field>
      ))}
    </RadioGroup>
  )
}

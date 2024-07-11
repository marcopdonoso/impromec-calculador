'use client'
import * as Slider from '@radix-ui/react-slider'
import clsx from 'clsx'
import { useState } from 'react'

export default function MySlider() {
  const [value, setValue] = useState([0])
  return (
    <div className="flex items-center gap-2 lg:gap-4">
      <Slider.Root
        max={100}
        step={5}
        className="relative flex h-5 w-56 items-center lg:w-80"
        value={value}
        onValueChange={(v) => setValue(v)}
      >
        <Slider.Track className="relative h-[10px] grow rounded-full bg-gray-input">
          <Slider.Range className="absolute h-full rounded-full bg-green-success" />
        </Slider.Track>
        <Slider.Thumb className="flex size-5 items-center justify-center rounded-full bg-green-success outline-none">
          <span className="size-[10px] rounded-full bg-gray-white" />
        </Slider.Thumb>
      </Slider.Root>
      <span
        className={clsx(
          'flex h-11 w-16 items-center justify-center rounded-lg border border-gray-input',
          value[0] !== 0 ? 'text-gray-text' : 'text-gray-placeholder'
        )}
      >
        {value[0]}%
      </span>
    </div>
  )
}

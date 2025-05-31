'use client'
import * as Slider from '@radix-ui/react-slider'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

interface MySliderProps {
  initialValue?: number
  onChange?: (value: number) => void
}

export default function MySlider({ initialValue = 0, onChange }: MySliderProps) {
  const [value, setValue] = useState([initialValue])

  // Este useEffect es crucial para actualizar el slider cuando cambia el initialValue
  // por ejemplo, cuando se cambia de sector
  useEffect(() => {
    console.log('MySlider initialValue changed:', initialValue)
    setValue([initialValue])
  }, [initialValue])

  const handleValueChange = (newValue: number[]) => {
    setValue(newValue)
    if (onChange) {
      onChange(newValue[0])
    }
  }

  return (
    <div className="flex w-full items-center gap-2 lg:gap-4">
      <Slider.Root
        max={100}
        step={5}
        className="relative flex h-5 flex-1 items-center"
        value={value}
        onValueChange={handleValueChange}
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
          'flex h-11 w-16 items-center justify-center rounded-lg border border-gray-input bg-gray-white',
          value[0] !== 0 ? 'text-gray-text' : 'text-gray-placeholder'
        )}
      >
        {value[0]}%
      </span>
    </div>
  )
}

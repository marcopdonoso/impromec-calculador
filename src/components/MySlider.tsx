'use client'
import * as Slider from '@radix-ui/react-slider'
import clsx from 'clsx'
interface MySliderProps {
  value: number[]
  onValueChange: (value: number[]) => void
}
export default function MySlider({ value, onValueChange }: MySliderProps) {
  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <Slider.Root
        max={100}
        step={5}
        className="relative flex h-5 w-56 items-center sm:w-80"
        value={value}
        onValueChange={onValueChange}
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

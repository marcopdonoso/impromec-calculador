'use client'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface CheckboxListProps {
  legend: string
  options: string[]
  onChange?: (selectedOptions: string[]) => void
}

export default function CheckboxList({
  legend,
  options,
  onChange,
}: CheckboxListProps) {
  const [checkedItems, setCheckedItems] = useState(
    new Array(options.length).fill(false)
  )

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedItems = checkedItems.map((item, idx) =>
      idx === index ? !item : item
    )
    setCheckedItems(updatedCheckedItems)

    if (onChange) {
      const selectedOptions = options.filter(
        (_, idx) => updatedCheckedItems[idx]
      )
      onChange(selectedOptions)
    }
  }

  return (
    <fieldset className="flex w-80 flex-col rounded-lg border border-gray-input px-8 py-4 text-gray-text lg:w-[19vw] lg:min-w-max">
      <h4 className="text-sm font-medium lg:text-lg lg:font-semibold">
        {legend}
      </h4>
      <hr className="my-4 text-gray-input lg:-mx-8 lg:mb-8" />
      <div className="flex gap-12 lg:flex-col lg:gap-4">
        {options.map((option, index) => {
          return (
            <label
              key={option}
              className="relative flex items-center text-sm lg:text-base lg:font-medium"
            >
              <input
                className="peer mr-3 size-5 appearance-none rounded-md border border-gray-input checked:border-green-success checked:bg-green-success"
                type="checkbox"
                name="option"
                value={checkedItems[index]}
                onChange={() => handleCheckboxChange(index)}
              />
              <CheckIcon className="absolute left-1 top-1 hidden w-3 stroke-2 text-gray-white peer-checked:block lg:top-1.5" />
              {option}
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

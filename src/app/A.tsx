'use client'
import { Transition } from '@headlessui/react'
import clsx from 'clsx'
import { useState } from 'react'

function Example() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setOpen((open) => !open)}>Toggle</button>
      <Transition
        show={open}
        enter="ease-in-out"
        enterFrom="opacity-0 translate-x-full"
        enterTo="opacity-100 translate-x-0"
      >
        <div
          className={clsx([
            // Base styles
            'absolute w-48 border transition ease-in-out',
            // Shared closed styles
            'data-[closed]:opacity-0',
            // Entering styles
            'data-[enter]:data-[closed]:-translate-x-full data-[enter]:duration-100',
            // Leaving styles
            'data-[leave]:data-[closed]:translate-x-full data-[leave]:duration-300',
          ])}
        >
          I will enter from the left and leave to the right
        </div>
      </Transition>
    </div>
  )
}

export default Example

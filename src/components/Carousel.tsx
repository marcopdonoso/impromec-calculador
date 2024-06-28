'use client'
import { Transition } from '@headlessui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useState } from 'react'

interface ImageProps {
  src: string
  alt: string
}

interface CarouselProps {
  images?: ImageProps[]
}

export default function Carousel({ images }: CarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [show, setShow] = useState(true)

  const lastImageIndex = images && images?.length - 1

  const prevImage = () => {
    if (currentImageIndex === 0) return
    setShow(false)
    setTimeout(() => {
      setCurrentImageIndex((prev) => prev - 1)
      setShow(true)
    }, 100)
  }

  const nextImage = () => {
    if (currentImageIndex === lastImageIndex) return
    setShow(false)
    setTimeout(() => {
      setCurrentImageIndex((prev) => prev + 1)
      setShow(true)
    }, 100)
  }

  return (
    <div className="relative size-72">
      <Transition
        show={show}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Image
          priority
          src={
            images
              ? images[currentImageIndex].src
              : '/svg/landscape-placeholder.svg'
          }
          alt={images ? images[currentImageIndex].alt : 'no-image-placeholder'}
          fill
          className="rounded-lg border border-gray-input"
          sizes="(max-width: 640px) 90vw, (max-width: 1536px) 50vw"
        />
      </Transition>
      <button
        onClick={prevImage}
        type="button"
        className="absolute -left-5 top-1/2 flex size-10 -translate-y-6 items-center justify-center rounded-full bg-gray-white shadow shadow-shadow"
      >
        <ArrowLeftIcon className="w-4 text-gray-text" />
      </button>
      <button
        onClick={nextImage}
        type="button"
        className="absolute -right-5 top-1/2 flex size-10 -translate-y-6 items-center justify-center rounded-full bg-gray-placeholder_icon"
      >
        <ArrowRightIcon className="w-4 text-gray-white" />
      </button>
    </div>
  )
}

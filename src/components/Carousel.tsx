'use client'
import { Transition } from '@headlessui/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useState } from 'react'

export interface ImageProps {
  src: string
  alt: string
}

interface CarouselProps {
  images: ImageProps[]
}

export default function Carousel({ images }: CarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [show, setShow] = useState(true)

  const lastImageIndex = images.length - 1

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
    <div className="w-fit">
      <div className="relative size-[80vw] max-h-[448px] max-w-md lg:size-[40vw] lg:max-h-none lg:max-w-none">
        <Transition
          show={show}
          enter="transition-opacity duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="flex size-[80vw] max-h-[448px] max-w-md items-center rounded-lg border border-gray-input bg-gray-white px-4 lg:size-[40vw] lg:max-h-none lg:max-w-none lg:rounded-2xl lg:border-2">
            <Image
              priority
              src={images[currentImageIndex].src}
              alt={images[currentImageIndex].alt}
              height={751}
              width={415}
              className="h-auto w-full"
            />
          </div>
        </Transition>
        <button
          onClick={prevImage}
          type="button"
          className="absolute -left-5 top-1/2 flex size-11 -translate-y-6 items-center justify-center rounded-full bg-gray-white shadow shadow-shadow"
        >
          <ArrowLeftIcon className="w-4 text-gray-text" />
        </button>
        <button
          onClick={nextImage}
          type="button"
          className="absolute -right-5 top-1/2 flex size-11 -translate-y-6 items-center justify-center rounded-full bg-gray-placeholder_icon"
        >
          <ArrowRightIcon className="w-4 text-gray-white" />
        </button>
      </div>
      {
        <div className="hidden lg:mt-6 lg:flex lg:max-w-[40vw] lg:flex-wrap lg:justify-start lg:gap-6">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex size-[calc((40vw-48px)/3)] items-center rounded-2xl border-2 border-gray-input"
              role="button"
              onClick={() => {
                setShow(false)
                setTimeout(() => {
                  setCurrentImageIndex(index)
                  setShow(true)
                }, 100)
              }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                height={751}
                width={415}
                className="h-auto w-full"
                priority
              />
            </div>
          ))}
        </div>
      }
    </div>
  )
}

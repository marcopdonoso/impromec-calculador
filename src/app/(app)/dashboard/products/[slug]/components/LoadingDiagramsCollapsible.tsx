import { ProductDetails } from '@/models/product.model'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import * as Collapsible from '@radix-ui/react-collapsible'
import Image from 'next/image'
import { useState } from 'react'

interface LoadingDiagramsCollapsibleProps {
  product: ProductDetails
}

export default function LoadingDiagramsCollapsible({
  product,
}: LoadingDiagramsCollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className="mt-6 w-full"
    >
      <Collapsible.Trigger className="mb-4 flex h-12 w-full items-center justify-between rounded-lg bg-gray-input px-4 lg:mb-8">
        <p className="body_small_medium lg:body_medium_medium">
          Diagramas de carga
        </p>
        {isOpen ? (
          <ChevronUpIcon className="w-5" />
        ) : (
          <ChevronDownIcon className="w-5" />
        )}
      </Collapsible.Trigger>
      <Collapsible.Content className="flex justify-center">
        <div className="flex max-w-[752px] flex-wrap gap-5 lg:max-w-[800px] lg:gap-8 xl:max-w-[1056px]">
          {product.categories.map((category) => {
            return category.loadingDiagrams?.map((diagram) => {
              return (
                <Image
                  src={diagram.url}
                  alt={diagram.name}
                  key={diagram.documentId}
                  height={371}
                  width={600}
                  className="h-auto w-full max-w-[366px] lg:max-w-[384px] xl:max-w-lg"
                />
              )
            })
          })}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

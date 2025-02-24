import Button from '@/components/Button'
import MyListbox, { Option } from '@/components/MyListbox'
import MyRadiogroup, { RadioGroupItem } from '@/components/MyRadiogroup'
import { ProductDetails } from '@/models/product.model'
import { capitalizeFirstLetter } from '@/utilities/capitalize-first-letter.utility'
import { CheckCircleIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface TechnicalDetailsProps {
  product: ProductDetails
}

export default function TechnicalDetails({ product }: TechnicalDetailsProps) {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0)
  const [selectedHeight, setSelectedHeight] = useState<Option | null>(null)
  const [selectedWidth, setSelectedWidth] = useState<Option | null>(null)

  const heightsListboxOptions: Option[] = product.categories[
    selectedCategoryIdx
  ].heights.map((height) => {
    return { text: height.name.slice(2) + ' mm', value: height.name }
  })

  const widthsListboxOptions: Option[] = product.categories[
    selectedCategoryIdx
  ].widths.map((width) => {
    return { text: width.name.slice(2) + ' mm', value: width.name }
  })

  const radioGroupItems: RadioGroupItem[] = product.categories.map(
    (category, idx) => {
      return {
        label: `${capitalizeFirstLetter(category.name)} (resiste hasta ${category.loadResistanceInKgM}kg/ml)`,
        value: idx,
      }
    }
  )

  const onSelecCategory = (selectedOption: any) => {
    const selectedOptionIdx = selectedOption
    setSelectedCategoryIdx(selectedOptionIdx)
  }

  return (
    <div className="rounded-lg bg-gray-white px-2 pb-3 lg:rounded-none lg:bg-none lg:px-0">
      <div className="mt-8 flex items-center gap-2 text-green-success">
        <CheckCircleIcon className="w-6" />
        <p className="body_small_regular lg:body_medium_medium">Disponible</p>
      </div>

      <div className="body_small_regular flex flex-col gap-6 pt-6 text-justify lg:body_medium_regular">
        <p>{product.description}</p>
        <p>
          Diseñamos nuestros productos priorizando la seguridad, resistencia y
          durabilidad, sometiéndolos a exhaustivas pruebas antes de ofrecerlos a
          los clientes.
        </p>
        <p className="text-gray-text_inactive">Referencia {product?.code}</p>
      </div>

      <Button icon={<PhoneIcon />} className="mt-6">
        Solicitar asesoría de un ejecutivo
      </Button>

      <div className="mt-4 flex flex-col gap-6 p-4 lg:px-0 lg:pb-0">
        <h4 className="body_large_semibold lg:heading_h6">
          Detalles del producto
        </h4>
        <MyRadiogroup
          items={radioGroupItems}
          className="flex flex-col gap-4 lg:gap-2"
          onChange={onSelecCategory}
        />
        <hr className="text-gray-placeholder lg:my-2" />
      </div>

      <div className="mt-6 flex gap-2">
        <MyListbox
          variant="standard"
          label="Altura"
          options={heightsListboxOptions}
          value={selectedHeight}
          onChange={setSelectedHeight}
        />
        <MyListbox
          variant="standard"
          label="Ancho"
          options={widthsListboxOptions}
          value={selectedWidth}
          onChange={setSelectedWidth}
        />
      </div>
    </div>
  )
}

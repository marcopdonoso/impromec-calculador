import Button from '@/components/Button'
import MyListbox, { Option } from '@/components/MyListbox'
import MyRadiogroup, { RadioGroupItem } from '@/components/MyRadiogroup'
import { ProductDetails } from '@/models/product.model'
import { capitalizeFirstLetter } from '@/utilities/capitalize-first-letter.utility'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { BsWhatsapp } from 'react-icons/bs'
import { useUserStore } from '@/store/useStore'
import { useState } from 'react'

interface TechnicalDetailsProps {
  product: ProductDetails
}

export default function TechnicalDetails({ product }: TechnicalDetailsProps) {
  const { user } = useUserStore()
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState(0)

  const handleProductInquiryViaWhatsApp = () => {
    if (!user || !product) return;

    const whatsAppPhoneNumber = '59172216766';
    let message = 'Hola, estoy interesado/a y quisiera más información sobre el siguiente producto:\n\n';

    message += '*Datos del Producto:*\n';
    message += `Nombre: ${product.name || 'N/A'}\n`;
    message += `Tipo: ${product.type || 'N/A'}\n`;
    if (product.code) {
      message += `Código: ${product.code}\n`;
    }
    message += '\n';

    message += '*Mis Datos de Contacto:*\n';
    message += `Nombre: ${user.name || 'N/A'}\n`;
    message += `Empresa: ${user.company || 'N/A'}\n`;
    message += `Email: ${user.email || 'N/A'}\n\n`;

    message += 'Espero su pronta respuesta. Gracias.';

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsAppPhoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };
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

      <Button
        icon={<BsWhatsapp />}
        className="mt-6"
        onClick={handleProductInquiryViaWhatsApp}
        disabled={!user || !product}
      >
        Consultar por WhatsApp
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

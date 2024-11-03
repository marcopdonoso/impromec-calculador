import Button from '@/components/Button'
import { ProductDetails } from '@/models/product.model'
import { FolderOpenIcon } from '@heroicons/react/24/outline'

interface OpenTechFilesProps {
  product: ProductDetails
}

export default function OpenTechFiles({ product }: OpenTechFilesProps) {
  const docsUrls = product.docs?.map((doc) => {
    return `${doc.url}`
  })

  const onDownloadTechFilesClick = () => {
    docsUrls?.map((url) => window.open(url))
  }
  return (
    <div className="mt-4 flex items-center justify-between lg:mt-7">
      <p className="body_large_semibold lg:heading_h6">Documentación técnica</p>
      <a onClick={onDownloadTechFilesClick}>
        <Button
          variant="icon_right"
          icon={<FolderOpenIcon />}
          className="lg:hidden"
        />
        <Button
          variant="icon_right"
          icon={<FolderOpenIcon />}
          className="hidden lg:block lg:w-80"
        >
          Abrir documentación técnica
        </Button>
      </a>
    </div>
  )
}

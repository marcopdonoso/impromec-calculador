interface BaseProduct {
  id: number
  documentId: string
  name: string
  description: string
  code: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  type: string
}

interface Dimension {
  id: number
  documentId: string
  name: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface Category {
  id: number
  documentId: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  name: string
  heights: Dimension[]
  widths: Dimension[]
}

interface Doc {
  id: number
  documentId: string
  name: string
  alternativeText: null
  caption: null
  width: null
  height: null
  formats: null
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: null
  provider: string
  provider_metadata: null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface FormatData {
  name: string
  hash: string
  ext: string
  mime: string
  path: null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}
interface Formats {
  thumbnail: FormatData
  small: FormatData
  medium: FormatData
}

interface Image {
  id: number
  documentId: string
  name: string
  alternativeText: null
  caption: null
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: null
  provider: string
  provider_metadata: null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface ProductToCard extends BaseProduct {
  images: Image[]
}

export interface ProductDetails extends BaseProduct {
  categories: Category[]
  images: Image[]
  docs: Doc[]
}

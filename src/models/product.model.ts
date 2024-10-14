type ProductType = 'bandeja' | 'accesorio'

interface BaseProduct {
  id: string
  productName: string
  productDescription: string
  productCode: string
  productType: ProductType
  productImages?: string[]
  productDocs?: string[]
}

export type TrayType = 'escalerilla' | 'canal'

type TrayTypeLoad =
  | 'super liviana'
  | 'liviana'
  | 'semipesada'
  | 'pesada'
  | 'super pesada'

type AccesoryType = 'montaje' | 'complemento'

type AvailableFinishesType =
  | 'galvanizado grado G90: 275g/m2'
  | 'pintura electrostática'

type MaterialType =
  | 'acero galvanizado ASTM A653'
  | 'acero inoxidable'
  | 'acero negro'
  | 'caucho'
  | 'plástico ABS'

interface TrayTechnicalDetails {
  typeLoad: TrayTypeLoad
  thicknessInMM: number
  widthInMM: number
  heightInMM: number
  usefulAreaInMM2: number
  loadResistanceInKgM: number
  material: MaterialType
  availableFinishes: AvailableFinishesType[]
}

interface AccesoryTechnicalDetails {
  material: MaterialType
  dimensions: string
}

export interface Tray extends BaseProduct {
  productType: 'bandeja'
  trayType: TrayType
  technicalDetails: TrayTechnicalDetails
}

interface Accesory extends BaseProduct {
  productType: 'accesorio'
  accesorieType: AccesoryType
  technicalDetails: AccesoryTechnicalDetails
}

export type Product = Tray | Accesory

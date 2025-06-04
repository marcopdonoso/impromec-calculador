export const trayTypes = ['escalerilla', 'canal'] as const
export type TrayType = (typeof trayTypes)[number]

export const trayCategories = [
  'super-liviana',
  'liviana',
  'semi-pesada',
  'pesada',
  'super-pesada',
] as const
export type TrayCategory = (typeof trayCategories)[number]

interface TrayTechnicalDetails {
  thicknessInMM: number
  widthInMM: number
  heightInMM: number
  loadResistanceInKgM: number
}

export interface Tray {
  id: string
  trayType: TrayType
  trayCategory: TrayCategory
  technicalDetails: TrayTechnicalDetails
}

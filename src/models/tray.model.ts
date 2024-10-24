export const trayTypes = ['escalerilla', 'canal'] as const
export type TrayType = (typeof trayTypes)[number]

interface TrayTechnicalDetails {
  thicknessInMM: number
  widthInMM: number
  heightInMM: number
  usefulAreaInMM2: number
  loadResistanceInKgM: number
}

export interface Tray {
  id: string
  trayName: string
  trayDescription: string
  trayType: TrayType
  technicalDetails: TrayTechnicalDetails
}

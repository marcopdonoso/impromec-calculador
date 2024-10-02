export type TrayType = 'escalerilla' | 'canal'

export interface Tray {
  trayType: TrayType
  thicknessInMM: number
  widthInMM: number
  heightInMM: number
  usefulAreaInMM2: number
  loadResistanceInKgM: number
}

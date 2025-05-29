import { CableInTray } from './cable.model'
import { Tray, TrayType } from './tray.model'

export type InstallationLayerType = 'singleLayer' | 'multiLayer'
export interface Results {
  moreConvenientOption: Tray | null
  otherRecommendedOptions: Tray[] | null
}
export interface Sector {
  id?: string
  sectorName: string | null
  trayTypeSelection: TrayType | null
  reservePercentage: number
  installationLayerSelection: InstallationLayerType | null
  cablesInTray: CableInTray[] | null
  results: Results | null
}

export interface Project {
  id: `${string}-${string}-${string}-${string}-${string}`
  projectName: string
  projectCompany: string
  projectLocation: string
  sectors: Sector[] | null
  createdAt: string
}

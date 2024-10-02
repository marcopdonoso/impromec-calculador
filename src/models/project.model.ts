import { CableInTray } from './cable.model'
import { Tray, TrayType } from './tray.model'

export type InstallationLayerTypes = 'singleLayer' | 'multiLayer'
interface Results {
  moreConvenientOption: Tray | null
  otherRecommendedOptions: Tray[] | null
}
export interface Sector {
  name: string | null
  trayTypeSelection: TrayType
  reservePercentage: number
  installationLayerSelection: InstallationLayerTypes
  cablesInTray: CableInTray[] | null
  results: Results | null
}

export interface Project {
  id: `${string}-${string}-${string}-${string}-${string}`
  projectName: string
  company: string
  projectLocation: string
  sectors: Sector[] | null
}

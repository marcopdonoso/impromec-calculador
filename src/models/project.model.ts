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

export interface DefaultSector {
  id: string
  sectorName: string
}

export interface Project {
  id: string
  projectName: string
  projectCompany: string
  projectLocation: string
  hasSectors: boolean
  sectors?: Sector[] | null // Para proyectos con sectores (hasSectors: true)
  defaultSector?: DefaultSector | null // Para proyectos sin sectores (hasSectors: false)
  cables?: CableInTray[] | null // Para proyectos sin sectores (hasSectors: false)
  // Propiedades adicionales para proyectos sin sectores
  trayTypeSelection?: TrayType | null // Para proyectos sin sectores
  reservePercentage?: number // Para proyectos sin sectores
  installationLayerSelection?: InstallationLayerType | null // Para proyectos sin sectores
  results?: Results | null // Para proyectos sin sectores
  createdAt?: string
}

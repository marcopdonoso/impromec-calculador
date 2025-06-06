import { CableInTray } from './cable.model'
import { Tray, TrayType } from './tray.model'

/**
 * Interfaz para elementos de la lista de proyectos que devuelve la API
 */
export interface ProjectListItem {
  id: string
  projectName: string
  hasSectors: boolean
  sectorsCount: number
  createdAt: string
  updatedAt: string
}

export type InstallationLayerType = 'singleLayer' | 'multiLayer'
export interface Results {
  moreConvenientOption: Tray | null
  otherRecommendedOptions: Tray[] | null
  calculatedLoadInKgM: number | null
  calculatedAreaInMM2: number | null
}
export interface Sector {
  id?: string
  sectorName: string | null
  trayTypeSelection: TrayType | null
  reservePercentage: number
  installationLayerSelection: InstallationLayerType | null
  cablesInTray?: CableInTray[] | null // Propiedad antigua, mantener por compatibilidad
  cables?: CableInTray[] | null // Nueva propiedad que viene del backend
  cablesCount?: number // Contador de cables que viene del backend
  results: Results | null
}

export interface DefaultSector {
  id: string
  sectorName: string
}

/**
 * Interfaz para el reporte de cálculo generado
 */
export interface CalculationReport {
  url: string
  fileId: string
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
  cablesCount?: number // Contador de cables que viene del backend para proyectos sin sectores
  // Propiedades adicionales para proyectos sin sectores
  trayTypeSelection?: TrayType | null // Para proyectos sin sectores
  reservePercentage?: number // Para proyectos sin sectores
  installationLayerSelection?: InstallationLayerType | null // Para proyectos sin sectores
  results?: Results | null // Para proyectos sin sectores
  calculationReport?: CalculationReport | null // Reporte de cálculo generado
  createdAt?: string
}

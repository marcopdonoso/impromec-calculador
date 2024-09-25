import { CableInTray } from './cable.model'

export interface Sector {
  name: string
  trayType: 'escalerilla' | 'canal'
  reservePercentage: number
  installationLayer: 'singleLayer' | 'multiLayer'
  cablesInTray: CableInTray[]
}

export interface Project {
  id: `${string}-${string}-${string}-${string}-${string}`
  name: string
  company: string
  location: string
  sectors: Sector[] | null
}

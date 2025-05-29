import { Sector } from '@/models/project.model'
import Cables from './Cables'
import InstallationLayerSelector from './InstallationLayerSelector'
import Tray from './Tray'

interface DataForCalculationProps {
  currentSector: Sector | null
}

export default function DataForCalculation({ currentSector }: DataForCalculationProps) {
  return (
    <div className="flex flex-col gap-6 lg:gap-16">
      <Tray 
        trayType={currentSector?.trayTypeSelection} 
        reservePercentage={currentSector?.reservePercentage} 
      />
      <InstallationLayerSelector 
        installationLayerType={currentSector?.installationLayerSelection} 
        hasCables={currentSector?.cablesInTray && currentSector.cablesInTray.length > 0}
      />
      <Cables 
        cablesInTray={currentSector?.cablesInTray || []} 
      />
    </div>
  )
}

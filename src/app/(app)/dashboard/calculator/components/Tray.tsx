import { TrayType } from '@/models/tray.model'
import ReservePercentage from './ReservePercentage'
import TrayTypeSelector from './TrayTypeSelector'

interface TrayProps {
  trayType: TrayType | null | undefined
  reservePercentage: number | undefined
}

export default function Tray({ trayType, reservePercentage }: TrayProps) {
  return (
    <div>
      <div className="mx-2 mb-5 flex h-12 items-center rounded-lg bg-gray-background px-5 lg:mx-0 lg:mb-8">
        <h4 className="body_small_medium lg:body_medium_medium">Bandeja</h4>
      </div>
      <TrayTypeSelector 
        key={`tray-type-${trayType || 'escalerilla'}`}
        className="mb-2 rounded-2xl bg-gray-white p-2 lg:mb-8" 
        selectedType={trayType}
      />
      <ReservePercentage 
        key={`reserve-percentage-${reservePercentage || 30}`}
        className="rounded-2xl bg-gray-white p-2" 
        value={reservePercentage || 30} 
      />
    </div>
  )
}

import ReservePercentage from './ReservePercentage'
import TrayTypeSelector from './TrayTypeSelector'

export default function Tray() {
  return (
    <div className="px-2">
      <div className="mb-5 flex h-12 items-center rounded-lg bg-gray-background px-5">
        <h4 className="body_small_medium">Bandeja</h4>
      </div>
      <TrayTypeSelector className="mb-4" />
      <ReservePercentage />
    </div>
  )
}

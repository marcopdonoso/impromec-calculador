import ReservePercentage from './ReservePercentage'
import TrayTypeSelector from './TrayTypeSelector'

export default function Tray() {
  return (
    <div>
      <div className="mx-2 mb-5 flex h-12 items-center rounded-lg bg-gray-background px-5 lg:mx-0 lg:mb-8">
        <h4 className="body_small_medium lg:body_medium_medium">Bandeja</h4>
      </div>
      <TrayTypeSelector className="mb-2 rounded-2xl bg-gray-white p-2 lg:mb-8" />
      <ReservePercentage className="rounded-2xl bg-gray-white p-2" />
    </div>
  )
}

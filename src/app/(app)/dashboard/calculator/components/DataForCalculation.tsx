import Cables from './Cables'
import Tray from './Tray'

export default function DataForCalculation() {
  return (
    <div className="flex flex-col gap-6">
      <Tray />
      <Cables />
    </div>
  )
}

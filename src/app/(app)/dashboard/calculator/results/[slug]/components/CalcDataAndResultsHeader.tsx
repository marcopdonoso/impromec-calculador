import DataForCalculationTitle from './DataForCalculationTitle'
import SectorsListbox from './SectorsListbox'

export default function CalcDataAndResultsHeader() {
  const sectors = [{ name: null }]

  return sectors[0].name === null ? (
    <DataForCalculationTitle />
  ) : (
    <SectorsListbox />
  )
}

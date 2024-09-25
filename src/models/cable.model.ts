export interface Cable {
  nominalSectionMM2: string
  nominalSectionAWG: string
  externalDiameterMM: number
  externalAreaMM2: number
  weightPerMeterKG: number
}
export interface CableInTray {
  cable: Cable
  quantity: number
  arrangement?: 'horizontal' | 'trébol'
}

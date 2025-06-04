export interface Cable {
  nominalSectionMM2: string
  nominalSectionAWG: string
  externalDiameterMM: number
  externalAreaMM2: number
  weightPerMeterKG: number
}

export type CableArrangementType = 'horizontal' | 'clover'
export interface CableInTray {
  id?: string
  cable: Cable
  quantity: number
  arrangement?: CableArrangementType
}

import { CableArrangementType } from '@/models/cable.model'

export interface ArrangementOption {
  text: string
  value: CableArrangementType
}

export const CABLE_ARRANGEMENT_OPTIONS: ArrangementOption[] = [
  {
    text: 'Horizontal',
    value: 'horizontal',
  },
  {
    text: 'Trébol',
    value: 'clover',
  },
]

/**
 * Obtiene el texto de visualización para un tipo de disposición de cable
 * @param arrangement Tipo de disposición (horizontal, clover)
 * @returns Texto para mostrar al usuario
 */
export const getArrangementDisplayText = (arrangement?: CableArrangementType): string => {
  if (!arrangement) return ''
  
  const option = CABLE_ARRANGEMENT_OPTIONS.find(opt => opt.value === arrangement)
  return option ? option.text : arrangement
}

export type CategoryValue =
  | 'commercial'
  | 'construction'
  | 'industry'
  | 'installations'
  | 'projects'

export interface OptionCategory {
  text: string
  value: CategoryValue
}

export const specializationAreas: OptionCategory[] = [
  {
    text: 'Comercial',
    value: 'commercial',
  },
  {
    text: 'Construcción',
    value: 'construction',
  },
  {
    text: 'Industria',
    value: 'industry',
  },
  {
    text: 'Instalaciones',
    value: 'installations',
  },
  {
    text: 'Proyectos',
    value: 'projects',
  },
]

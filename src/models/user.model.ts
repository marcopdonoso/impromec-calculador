import { OptionCategory } from '@/constants/specialization-areas.constants'
import { Project } from './project.model'

export interface User {
  id: string
  name: string
  email: string
  company?: string
  category: OptionCategory
  phone: string
  location: string
  avatar?: string
  updatedAt?: string
  createdAt?: string
  projects?: Project[]
}

import { Option } from '@/components/MyListbox'
import { Project } from './project.model'

export interface User {
  id: `${string}-${string}-${string}-${string}-${string}`
  name: string
  email: string
  company?: string
  category: Option
  phone: string
  location: string
  avatar?: string
  projects?: Project[]
}

import { Project } from './project.model'

export interface User {
  id: `${string}-${string}-${string}-${string}-${string}`
  name: string
  email: string
  company?: string
  category: string
  phone: string
  location: string
  avatar?: string
  projects?: Project[]
}

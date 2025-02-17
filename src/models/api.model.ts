export interface RegisterUserData {
  name: string
  email: string
  password: string
  company?: string
  category: {
    text: string
    value: string
  }
  phone: string
  location: string
}

export interface ApiResponse<T = any> {
  data?: T
  error?: {
    message: string
    statusCode: number
  }
}

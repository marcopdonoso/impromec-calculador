import { ApiResponse, RegisterUserData } from '@/models/api.model'
import axios from 'axios'
import { api } from './api.service'

export const registerUser = async (
  data: RegisterUserData
): Promise<ApiResponse> => {
  try {
    const response = await api.post('/auth/register', data)
    return { data: response.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message: error.response?.data?.message || 'Error desconocido',
          statusCode: error.response?.status || 500,
        },
      }
    }
    return { error: { message: 'Error de conexión', statusCode: 503 } }
  }
}

import {
  ApiResponse,
  LoginUserData,
  RegisterUserData,
} from '@/models/api.model'
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

export const verifyEmailToken = async (token: string): Promise<ApiResponse> => {
  try {
    const response = await api.get(`/auth/verify-email?token=${token}`)
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

export const requestVerificationEmail = async (
  token: string
): Promise<ApiResponse> => {
  try {
    const response = await api.post('/auth/resend-verification-email', {
      Headers: {
        Authorization: `Bearer ${token}`,
      },
    })
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

export const loginUser = async (data: LoginUserData): Promise<ApiResponse> => {
  try {
    const response = await api.post('/auth/login', data)
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

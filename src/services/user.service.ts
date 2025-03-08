import {
  ApiResponse,
  LoginUserData,
  RegisterUserData,
} from '@/models/api.model'
import { useUserStore } from '@/store/useStore'
import axios from 'axios'
import { deleteCookie } from 'cookies-next'
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
    const response = await api.post(
      '/auth/resend-verification-email',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
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

export const resendVerificationEmail = async (
  email: string
): Promise<ApiResponse> => {
  try {
    const response = await api.post('/auth/resend-verification-by-email', {
      email,
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

export const forgotPassword = async (email: string): Promise<ApiResponse> => {
  try {
    const response = await api.post('/auth/forgot-password', {
      email,
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

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<ApiResponse> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password?token=${token}`,
      { newPassword },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

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

export const getUserProfile = async (): Promise<ApiResponse> => {
  try {
    const response = await api.get('/auth/me')
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

export const logoutUser = async () => {
  try {
    await fetch('/api/logout', {
      method: 'GET',
      credentials: 'include',
    })

    deleteCookie('token', { path: '/', sameSite: 'strict' })

    useUserStore.getState().setUser(null)
  } catch (error) {
    deleteCookie('token', { path: '/', sameSite: 'strict' })
    useUserStore.getState().setUser(null)
  }
}

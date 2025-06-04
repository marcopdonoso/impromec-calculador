import { ApiResponse } from '@/models/api.model'
import { User } from '@/models/user.model'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { api } from './api.service'

export const getProfile = async (): Promise<ApiResponse<{ user: User }>> => {
  try {
    const response = await api.get('/user/profile')
    return { data: { user: response.data } }
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

export const updateProfile = async (
  userData: Partial<User>
): Promise<ApiResponse<{ user: User }>> => {
  try {
    const response = await api.patch('/user/profile', userData)
    return { data: { user: response.data } }
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

export const uploadAvatar = async (
  file: File
): Promise<ApiResponse<{ user: User }>> => {
  try {
    const formData = new FormData()
    formData.append('avatar', file)

    // Usar la instancia api para pasar por el interceptor
    const response = await api.post('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return {
      data: {
        user: response.data,
      },
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message: error.response?.data?.message || 'Error al subir avatar',
          statusCode: error.response?.status || 500,
        },
      }
    }
    return {
      error: {
        message: 'Error de conexión',
        statusCode: 503,
      },
    }
  }
}

export const changePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<ApiResponse> => {
  try {
    const response = await api.post('/user/change-password', {
      currentPassword,
      newPassword,
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

export const deleteAccount = async (): Promise<ApiResponse> => {
  try {
    const response = await api.delete('/user/account')

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

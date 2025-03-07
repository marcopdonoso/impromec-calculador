import { ApiResponse } from '@/models/api.model'
import { User } from '@/models/user.model'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { api } from './api.service'

export const getProfile = async (): Promise<ApiResponse<{ user: User }>> => {
  try {
    const response = await api.get('user/profile')
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
    const response = await api.patch('user/profile', userData)
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

    const token = getCookie('token')

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/avatar`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      return {
        error: {
          message: errorData.message || 'Error al subir avatar',
          statusCode: errorData.status,
        },
      }
    }

    const data = await response.json()
    return {
      data: {
        user: data,
      },
    }
  } catch (error) {
    console.log('Error en uploadAvatar: ', error)
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

import axios from 'axios'
import { getCookie } from 'cookies-next'
import { logoutUser } from './user.service'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Añadir token en cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = getCookie('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Solo hacer logout en ciertos casos de 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // No cerrar sesión para errores específicos
      const errorMsg = error.response?.data?.message
      if (
        errorMsg === 'Contraseña actual incorrecta' ||
        error.config?.url?.includes('change-password')
      ) {
        return Promise.reject(error)
      }

      // Para otros errores 401, cerrar sesión
      await logoutUser()
    }
    return Promise.reject(error)
  }
)

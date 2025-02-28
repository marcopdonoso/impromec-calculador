import axios from 'axios'
import { getCookie } from 'cookies-next'
import { logoutUser } from './user.service'

const token = getCookie('token')

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      await logoutUser()
    }
    return Promise.reject(error)
  }
)

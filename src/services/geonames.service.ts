import { ApiResponse } from '@/models/api.model'
import axios from 'axios'

export const getGeonames = async (searchTerm: string): Promise<ApiResponse> => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_GEONAMES_BASE_URL}/searchJSON?name_startsWith=${encodeURIComponent(searchTerm)}&countryBias=BO&maxRows=10&username=${process.env.NEXT_PUBLIC_GEONAMES_USERNAME}&featureClass=P&style=FULL`
    )
    return { data: res.data }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        error: {
          message: error.response?.data.status.message || 'Error desconocido',
          statusCode: error.response?.status || 500,
        },
      }
    }
    return { error: { message: 'Error de conexión', statusCode: 503 } }
  }
}

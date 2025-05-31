import { ProjectListItem } from '@/models/project.model'
import { apiBaseUrl } from '@/constants/api.constants'
import { getCookie } from 'cookies-next'

/**
 * Obtiene la lista de proyectos desde el backend
 * @returns Lista de proyectos con información básica
 */
export const getProjects = async (): Promise<{ 
  success: boolean; 
  projects?: ProjectListItem[];
  error?: string;
}> => {
  try {
    // Obtener el token de autenticación almacenado en cookies
    const token = getCookie('token')
    
    if (!token) {
      return { 
        success: false, 
        error: 'No hay token de autenticación' 
      }
    }

    const response = await fetch(`${apiBaseUrl}/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    const data = await response.json()
    
    if (!response.ok) {
      return { 
        success: false, 
        error: data.message || 'Error al obtener los proyectos' 
      }
    }

    return data
  } catch (error) {
    console.error('Error al obtener los proyectos:', error)
    return { 
      success: false, 
      error: 'Error al obtener los proyectos' 
    }
  }
}

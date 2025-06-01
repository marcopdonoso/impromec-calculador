import { ProjectListItem } from '@/models/project.model'
import { apiBaseUrl } from '@/constants/api.constants'
import { getCookie } from 'cookies-next'
import { api } from './api.service'
import axios from 'axios'

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
    // Usar la instancia api que ya incluye el token en los headers
    const response = await api.get('/projects')
    
    // La respuesta ya viene como JSON
    return response.data
    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Error al obtener los proyectos' 
      }
    }
    
    return { 
      success: false, 
      error: 'Error de conexión al obtener los proyectos' 
    }
  }
}

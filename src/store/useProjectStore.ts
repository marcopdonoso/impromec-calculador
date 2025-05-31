import { Project, Sector } from '@/models/project.model'
import { CableInTray } from '@/models/cable.model'
import { addCableToProject, addCableToSector, deleteCableFromProject, deleteCableFromSector, getProjectById } from '@/services/project.service'
import { create } from 'zustand'

interface CableData {
  cable: any
  quantity: number
  arrangement?: string
}

interface ProjectState {
  currentProject: Project | null
  isLoading: boolean
  error: string | null
  setCurrentProject: (project: Project | null) => void
  fetchProject: (projectId: string) => Promise<void>
  clearProject: () => void
  addCable: (projectId: string, sectorId: string | null, cableData: CableData) => Promise<CableInTray | null>
  deleteCable: (projectId: string, sectorId: string | null, cableId: string) => Promise<boolean>
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  currentProject: null,
  isLoading: false,
  error: null,
  setCurrentProject: (project: Project | null) => set({ currentProject: project }),
  fetchProject: async (projectId: string) => {
    try {
      set({ isLoading: true, error: null })
      const response = await getProjectById(projectId)

      if (response.error) {
        set({ 
          error: response.error.message, 
          isLoading: false,
          currentProject: null
        })
        return
      }

      if (response.data) {
        set({ 
          currentProject: response.data.project, 
          isLoading: false,
          error: null
        })
      }
    } catch (error) {
      set({ 
        error: 'Error al obtener el proyecto', 
        isLoading: false,
        currentProject: null
      })
    }
  },
  clearProject: () => set({ currentProject: null, error: null }),
  deleteCable: async (projectId: string, sectorId: string | null, cableId: string) => {
    try {
      set({ isLoading: true, error: null })
      
      // Si hay sectorId, eliminar el cable del sector
      // Si no hay sectorId, eliminar el cable directamente del proyecto
      const response = sectorId 
        ? await deleteCableFromSector(projectId, sectorId, cableId)
        : await deleteCableFromProject(projectId, cableId)

      if (response.error) {
        set({ 
          error: response.error.message, 
          isLoading: false
        })
        return false
      }

      // Volver a cargar el proyecto para obtener los datos actualizados
      await get().fetchProject(projectId)
      
      set({ 
        isLoading: false,
        error: null
      })
      
      return true
    } catch (error) {
      set({ 
        error: 'Error al eliminar el cable', 
        isLoading: false
      })
      return false
    }
  },
  addCable: async (projectId: string, sectorId: string | null, cableData: CableData) => {
    try {
      set({ isLoading: true, error: null })
      console.log('addCable - Iniciando proceso de agregar cable:', {
        projectId,
        sectorId,
        cableData
      });
      
      // Si hay sectorId, agregar el cable al sector
      // Si no hay sectorId, agregar el cable directamente al proyecto
      const response = sectorId 
        ? await addCableToSector(projectId, sectorId, cableData)
        : await addCableToProject(projectId, cableData)

      if (response.error) {
        console.error('addCable - Error al agregar cable:', response.error);
        set({ 
          error: response.error.message, 
          isLoading: false
        })
        return null
      }

      if (response.data) {
        console.log('addCable - Cable agregado exitosamente:', response.data);
        
        // En lugar de actualizar manualmente el estado, vamos a recargar el proyecto completo
        // para asegurarnos de que tenemos los datos más actualizados del backend
        console.log('addCable - Recargando proyecto para actualizar estado...');
        await get().fetchProject(projectId);
        console.log('addCable - Proyecto recargado exitosamente');
        
        // Devolver el cable agregado
        return response.data.cable
      }
      
      console.log('addCable - No se recibieron datos en la respuesta');
      set({ isLoading: false });
      return null
    } catch (error) {
      console.error('addCable - Error inesperado:', error);
      set({ 
        error: 'Error al agregar el cable', 
        isLoading: false
      })
      return null
    }
  },
}))

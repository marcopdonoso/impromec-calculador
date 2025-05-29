import { Project, Sector } from '@/models/project.model'
import { CableInTray } from '@/models/cable.model'
import { addCableToProject, addCableToSector, deleteCableFromProject, deleteCableFromSector, getProjectById } from '@/services/project.service'
import { create } from 'zustand'

interface ProjectState {
  currentProject: Project | null
  isLoading: boolean
  error: string | null
  setCurrentProject: (project: Project | null) => void
  fetchProject: (projectId: string) => Promise<void>
  clearProject: () => void
  addCable: (projectId: string, sectorId: string | null, cableData: any) => Promise<CableInTray | null>
  deleteCable: (projectId: string, sectorId: string | null, cableId: string) => Promise<boolean>
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  currentProject: null,
  isLoading: false,
  error: null,
  setCurrentProject: (project) => set({ currentProject: project }),
  fetchProject: async (projectId) => {
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
  deleteCable: async (projectId, sectorId, cableId) => {
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
  addCable: async (projectId, sectorId, cableData) => {
    try {
      set({ isLoading: true, error: null })
      
      // Si hay sectorId, agregar el cable al sector
      // Si no hay sectorId, agregar el cable directamente al proyecto
      const response = sectorId 
        ? await addCableToSector(projectId, sectorId, cableData)
        : await addCableToProject(projectId, cableData)

      if (response.error) {
        set({ 
          error: response.error.message, 
          isLoading: false
        })
        return null
      }

      if (response.data) {
        // Actualizar el proyecto actual con el nuevo cable
        const currentProject = get().currentProject
        
        if (currentProject) {
          if (sectorId) {
            // Caso con sectores: Encontrar el sector al que se agregó el cable
            const updatedSectors = currentProject.sectors?.map(sector => {
              if (sector.id === sectorId) {
                // Agregar el nuevo cable al sector
                const updatedCablesInTray = sector.cablesInTray ? 
                  [...sector.cablesInTray, response.data!.cable] : 
                  [response.data!.cable]
                
                return {
                  ...sector,
                  cablesInTray: updatedCablesInTray
                }
              }
              return sector
            })
            
            // Actualizar el proyecto con los sectores actualizados
            set({ 
              currentProject: {
                ...currentProject,
                sectors: updatedSectors || null
              },
              isLoading: false,
              error: null
            })
          } else {
            // Caso sin sectores: Agregar el cable directamente al proyecto
            const updatedCables = currentProject.cables ? 
              [...currentProject.cables, response.data!.cable] : 
              [response.data!.cable]
            
            // Actualizar el proyecto con el nuevo cable
            set({ 
              currentProject: {
                ...currentProject,
                cables: updatedCables
              },
              isLoading: false,
              error: null
            })
          }
        }
        
        return response.data.cable
      }
      
      return null
    } catch (error) {
      set({ 
        error: 'Error al agregar el cable', 
        isLoading: false
      })
      return null
    }
  }
}))

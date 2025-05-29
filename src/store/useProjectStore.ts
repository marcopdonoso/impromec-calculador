import { Project } from '@/models/project.model'
import { getProjectById } from '@/services/project.service'
import { create } from 'zustand'

interface ProjectState {
  currentProject: Project | null
  isLoading: boolean
  error: string | null
  setCurrentProject: (project: Project | null) => void
  fetchProject: (projectId: string) => Promise<void>
  clearProject: () => void
}

export const useProjectStore = create<ProjectState>((set) => ({
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
  clearProject: () => set({ currentProject: null, error: null })
}))

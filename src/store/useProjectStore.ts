import { CableInTray } from '@/models/cable.model'
import { Project, Sector, DefaultSector } from '@/models/project.model'
import { TrayType } from '@/models/tray.model'
import {
  addCableToProject,
  addCableToSector,
  calculateProjectTray,
  calculateSectorTray,
  deleteCableFromProject,
  deleteCableFromSector,
  getProjectById,
} from '@/services/project.service'
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
  addCable: (
    projectId: string,
    sectorId: string | null,
    cableData: CableData
  ) => Promise<CableInTray | null>
  deleteCable: (
    projectId: string,
    sectorId: string | null,
    cableId: string
  ) => Promise<boolean>
  calculateTray: (
    projectId: string,
    sectorId?: string,
    trayType?: TrayType,
    reservePercentage?: number
  ) => Promise<{
    success: boolean
    message: string
  }>
  updateProjectDataWithSector: (updatedSectorData: Partial<Sector> & { id: string }) => void // Accept Partial<Sector> but require 'id'
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  currentProject: null,
  isLoading: false,
  error: null,

  calculateTray: async (projectId, sectorId, trayType, reservePercentage) => {
    try {
      set({ isLoading: true, error: null })

      const currentTrayType = trayType ?? 'escalerilla'; // Default to 'escalerilla'
      const currentReservePercentage = reservePercentage ?? 20; // Default to 20%

      // Realizar la llamada al servicio correspondiente según si es un proyecto con sectores o no
      const response = sectorId
        ? await calculateSectorTray(
            projectId,
            sectorId,
            currentTrayType,
            currentReservePercentage
          )
        : await calculateProjectTray(projectId, currentTrayType, currentReservePercentage)

      if (!response.success) {
        set({
          error: response.message || 'Error al calcular la bandeja',
          isLoading: false,
        })
        return {
          success: false,
          message: response.message || 'Error al calcular la bandeja',
        }
      }

      // Si el cálculo fue exitoso, actualizar el proyecto para reflejar los resultados
      await get().fetchProject(projectId)

      set({ isLoading: false })
      return {
        success: true,
        message: response.message || 'Cálculo completado exitosamente',
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Error al calcular la bandeja'
      set({ error: errorMessage, isLoading: false })
      return { success: false, message: errorMessage }
    }
  },
  setCurrentProject: (project: Project | null) =>
    set({ currentProject: project }),
  fetchProject: async (projectId: string) => {
    try {
      set({ isLoading: true, error: null })
      const response = await getProjectById(projectId)

      if (response.error) {
        set({
          error: response.error.message,
          isLoading: false,
          currentProject: null,
        })
        return
      }

      if (response.data) {
        set({
          currentProject: response.data.project,
          isLoading: false,
          error: null,
        })
      }
    } catch (error) {
      set({
        error: 'Error al obtener el proyecto',
        isLoading: false,
        currentProject: null,
      })
    }
  },
  clearProject: () => set({ currentProject: null, error: null }),
  deleteCable: async (
    projectId: string,
    sectorId: string | null,
    cableId: string
  ) => {
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
          isLoading: false,
        })
        return false
      }

      // Volver a cargar el proyecto para obtener los datos actualizados
      await get().fetchProject(projectId)

      set({
        isLoading: false,
        error: null,
      })

      return true
    } catch (error) {
      set({
        error: 'Error al eliminar el cable',
        isLoading: false,
      })
      return false
    }
  },
  addCable: async (
    projectId: string,
    sectorId: string | null,
    cableData: CableData
  ) => {
    try {
      set({ isLoading: true, error: null })

      // Si hay sectorId, agregar el cable al sector
      // Si no hay sectorId, agregar el cable directamente al proyecto
      const response = sectorId
        ? await addCableToSector(projectId, sectorId, cableData)
        : await addCableToProject(projectId, cableData)

      if (response.error) {
        // Error al agregar cable
        set({
          error: response.error.message,
          isLoading: false,
        })
        return null
      }

      if (response.data) {
        // Cable agregado exitosamente

        // En lugar de actualizar manualmente el estado, vamos a recargar el proyecto completo
        // para asegurarnos de que tenemos los datos más actualizados del backend
        await get().fetchProject(projectId)

        // Devolver el cable agregado
        return response.data.cable
      }

      // No se recibieron datos en la respuesta
      set({ isLoading: false })
      return null
    } catch (error) {
      // Error inesperado al agregar cable
      set({
        error: 'Error al agregar el cable',
        isLoading: false,
      })
      return null
    }
  },
  updateProjectDataWithSector: (updatedSectorData: Partial<Sector> & { id: string }) => {
    set((state) => {
      if (!state.currentProject) return {}

      const project = { ...state.currentProject }
      let newSectors = project.sectors ? [...project.sectors] : []

      if (!updatedSectorData.id) {
        console.error('[useProjectStore] Cannot update sector without an ID.');
        return {}; // Abort if no ID is present in the update data
      }

      if (project.hasSectors) {
        const sectorIndex = newSectors.findIndex(s => s.id === updatedSectorData.id);
        if (sectorIndex !== -1) {
          // Merge existing sector with new data, preserving fields not in updatedSectorData
          newSectors[sectorIndex] = { ...newSectors[sectorIndex], ...updatedSectorData };
        } else {
          console.warn('[useProjectStore] Multi-sector: Updated sector not found. ID:', updatedSectorData.id);
          // Optionally, if new sectors can be added this way:
          // newSectors.push(updatedSectorData as Sector); // This would require updatedSectorData to be a full Sector
        }
      } else {
        // Single-sector project (hasSectors: false)
        if (project.defaultSector && project.defaultSector.id === updatedSectorData.id) {
          const existingDefaultSector = project.defaultSector;
          // Ensure sectorName is a string. Fallback to existing or empty string if new one is null/undefined.
          const newSectorName = updatedSectorData.sectorName !== undefined && updatedSectorData.sectorName !== null 
                                ? updatedSectorData.sectorName 
                                : existingDefaultSector.sectorName;
          
          project.defaultSector = {
            id: updatedSectorData.id, // id is guaranteed by type
            sectorName: newSectorName,
          };

          // Update mirrored properties on the project object itself from updatedSectorData
          if (updatedSectorData.installationLayerSelection !== undefined) project.installationLayerSelection = updatedSectorData.installationLayerSelection;
          if (updatedSectorData.trayTypeSelection !== undefined) project.trayTypeSelection = updatedSectorData.trayTypeSelection;
          if (updatedSectorData.reservePercentage !== undefined) project.reservePercentage = updatedSectorData.reservePercentage;

          // Construct the representation for the 'sectors' array.
          // This should reflect the updated defaultSector and any other relevant fields from updatedSectorData.
          const sectorForArray: Sector = {
            // Start with the most complete existing version of this sector if available in the array
            ...(newSectors.find(s => s.id === updatedSectorData.id) || {} as Partial<Sector>),
            // Apply all fields from the incoming update data
            ...updatedSectorData,
            // Ensure core DefaultSector fields are correctly sourced from the now-updated project.defaultSector
            id: project.defaultSector.id, 
            sectorName: project.defaultSector.sectorName,
            // Preserve existing results if not part of this specific update
            results: (newSectors.find(s => s.id === updatedSectorData.id)?.results) || updatedSectorData.results || null,
            // Ensure other non-optional Sector fields have fallbacks if not in updatedSectorData
            trayTypeSelection: updatedSectorData.trayTypeSelection !== undefined ? updatedSectorData.trayTypeSelection : (newSectors.find(s => s.id === updatedSectorData.id)?.trayTypeSelection || null),
            reservePercentage: updatedSectorData.reservePercentage !== undefined ? updatedSectorData.reservePercentage : (newSectors.find(s => s.id === updatedSectorData.id)?.reservePercentage || 0),
            installationLayerSelection: updatedSectorData.installationLayerSelection !== undefined ? updatedSectorData.installationLayerSelection : (newSectors.find(s => s.id === updatedSectorData.id)?.installationLayerSelection || null),
          };
          newSectors = [sectorForArray];
        } else {
          console.warn(`[useProjectStore] Single-sector: updatedSectorData.id (${updatedSectorData.id}) does not match project.defaultSector.id (${project.defaultSector?.id}) or defaultSector is missing.`);
          // Fallback: if the updatedSectorData ID matches any sector in the 'newSectors' array
          const existingSectorIndex = newSectors.findIndex(s => s.id === updatedSectorData.id);
          if (existingSectorIndex !== -1) {
            console.warn('[useProjectStore] Single-sector: Updating sector in newSectors array as a fallback.');
            newSectors[existingSectorIndex] = { ...newSectors[existingSectorIndex], ...updatedSectorData };
          } else {
            console.warn('[useProjectStore] Single-sector: updatedSectorData did not match defaultSector and was not found. No update to sectors list.');
          }
        }
      }

      return {
        currentProject: {
          ...project,
          sectors: newSectors,
        },
      }
    })
  },
}))

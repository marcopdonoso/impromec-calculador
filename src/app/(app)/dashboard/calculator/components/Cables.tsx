'use client'
import Button from '@/components/Button'
import { CableInTray } from '@/models/cable.model'
import { useProjectStore } from '@/store/useProjectStore'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import AddCableForm from './AddCableForm'
import AddedCablesTable from './AddedCablesTable'

interface CablesProps {
  cablesInTray: CableInTray[]
  installationLayerType: string | null
}

export default function Cables({ cablesInTray, installationLayerType }: CablesProps) {
  const params = useParams();
  const projectId = params.slug as string;
  const { currentProject, deleteCable, fetchProject } = useProjectStore();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Determinar si el proyecto tiene sectores
  const hasSectors = currentProject?.hasSectors;
  
  // Obtener el ID del sector según el tipo de proyecto
  const sectorId = hasSectors && currentProject?.sectors?.[0]?.id ? 
    currentProject.sectors[0].id : 
    currentProject?.defaultSector?.id || null;
  
  const handleDelete = async (cableId: string, dataRowIndex: number) => {
    if (!cableId) {
      console.error('No se pudo eliminar el cable: ID no válido');
      return;
    }
    
    try {
      setIsDeleting(true);
      setError(null);
      
      console.log(`Eliminando cable ${cableId} del ${hasSectors ? 'sector' : 'proyecto'}...`);
      
      const success = await deleteCable(projectId, sectorId, cableId);
      
      if (success) {
        console.log('Cable eliminado exitosamente');
      } else {
        setError('No se pudo eliminar el cable');
      }
    } catch (err) {
      console.error('Error al eliminar el cable:', err);
      setError('Error al eliminar el cable');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <div className="mx-2 mb-6 flex h-12 items-center rounded-lg bg-gray-background px-5 lg:mx-0 lg:mb-8">
        <h4 className="body_small_medium lg:body_medium_medium">Conductores</h4>
      </div>
      
      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
          {error}
        </div>
      )}
      
      {isDeleting && (
        <div className="mb-4 rounded-md bg-blue-100 p-3 text-blue-700">
          Eliminando cable...
        </div>
      )}
      
      {cablesInTray.length > 0 && (
        <div className="px-2 lg:px-0">
          <AddedCablesTable handleDelete={handleDelete} cablesInTray={cablesInTray} />
        </div>
      )}
      <AddCableForm installationLayerType={installationLayerType} />
      <div className="mt-4 px-2 lg:mt-6 lg:px-0">
        <Button variant="add" icon={<PlusCircleIcon />}>
          Agregar cable
        </Button>
      </div>
    </div>
  )
}

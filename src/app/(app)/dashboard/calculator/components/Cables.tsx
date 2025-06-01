'use client'
import Button from '@/components/Button'
import { CableInTray } from '@/models/cable.model'
import { useProjectStore } from '@/store/useProjectStore'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import AddCableForm from './AddCableForm'
import AddedCablesTable from './AddedCablesTable'

interface CablesProps {
  cablesInTray: CableInTray[]
  installationLayerType: string | null
  currentSectorId?: string | null
}

export default function Cables({
  cablesInTray,
  installationLayerType,
  currentSectorId,
}: CablesProps) {
  const params = useParams()
  const projectId = params.slug as string
  const { deleteCable, fetchProject } = useProjectStore()
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [showAddCableForm, setShowAddCableForm] = useState(false)

  // Determinar si estamos en un proyecto con sectores o sin sectores
  const hasSectors = currentSectorId !== null && currentSectorId !== undefined

  // Obtener el ID del sector si existe
  const sectorId = hasSectors ? currentSectorId : null

  // Depurar cuando cambian los cables o el sector activo
  useEffect(() => {
    console.log('Cables - Props actualizadas:', {
      cablesCount: cablesInTray.length,
      currentSectorId,
      installationLayerType,
    })
  }, [cablesInTray, currentSectorId, installationLayerType])

  // Limpiar mensajes de éxito después de 3 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  // Manejar la eliminación de un cable
  const handleDelete = async (cableId: string, dataRowIndex: number) => {
    if (!cableId) {
      console.error('No se pudo eliminar el cable: ID no válido')
      setError('ID de cable no válido')
      return
    }

    try {
      setIsDeleting(true)
      setError(null)
      setSuccessMessage(null)

      console.log(
        `Eliminando cable ${cableId} del ${hasSectors ? 'sector' : 'proyecto'}...`
      )
      console.log('Datos antes de eliminar:', {
        projectId,
        sectorId,
        cableId,
        cablesCount: cablesInTray.length,
      })

      // Llamar al backend para eliminar el cable
      const success = await deleteCable(projectId, sectorId, cableId)

      if (success) {
        console.log('Cable eliminado exitosamente')

        // Recargar el proyecto para actualizar los datos
        console.log('Recargando proyecto después de eliminar cable...')
        await fetchProject(projectId)
        console.log('Proyecto recargado después de eliminar cable')

        // Mostrar mensaje de éxito temporal
        setSuccessMessage('Cable eliminado exitosamente')
        setError(null)
      } else {
        console.error('La eliminación del cable falló en el backend')
        setError('No se pudo eliminar el cable')
      }
    } catch (err) {
      console.error('Error al eliminar el cable:', err)
      setError('Error al eliminar el cable')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div>
      <div className="mx-2 mb-6 flex h-12 items-center rounded-lg bg-gray-background px-5 lg:mx-0 lg:mb-8">
        <h4 className="body_small_medium lg:body_medium_medium">Conductores</h4>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 mb-4 rounded-md p-3">
          {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 text-green-700 mb-4 rounded-md p-3">
          {successMessage}
        </div>
      )}

      {isDeleting && (
        <div className="bg-blue-100 text-blue-700 mb-4 rounded-md p-3">
          Eliminando cable...
        </div>
      )}

      {cablesInTray.length > 0 && (
        <div className="px-2 lg:px-0">
          <AddedCablesTable
            handleDelete={handleDelete}
            cablesInTray={cablesInTray}
          />
        </div>
      )}

      {showAddCableForm ? (
        <AddCableForm
          installationLayerType={installationLayerType}
          onSave={() => setShowAddCableForm(false)}
          currentSectorId={sectorId}
        />
      ) : (
        <div className="mt-4 px-2 lg:mt-6 lg:px-0">
          <Button
            variant="add"
            icon={<PlusCircleIcon />}
            onClick={() => setShowAddCableForm(true)}
          >
            Agregar cable
          </Button>
        </div>
      )}
    </div>
  )
}

'use client'
import Button from '@/components/Button'
import Input from '@/components/Input'
import { updateSectorName } from '@/services/project.service'
import { useProjectStore } from '@/store/useProjectStore'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import DeleteSectorModal from './DeleteSectorModal'
import ModalOverlay from './ModalOverlay'
import SectorsListItemOptions from './SectorsListItemOptions'

interface SectorsListItemProps {
  sectorNumber: number
  sectorName: string
  sectorId: string
  isActive?: boolean
  onClick?: () => void
}

export default function SectorsListItem({
  sectorNumber,
  sectorName,
  sectorId,
  isActive = false,
  onClick,
}: SectorsListItemProps) {
  const params = useParams()
  const projectId = params.slug as string
  const { fetchProject } = useProjectStore()

  const [canEdit, setCanEdit] = useState(false)
  const [isOptionsVisible, setIsOptionsVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [editedSectorName, setEditedSectorName] = useState(sectorName)
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [updateSuccess, setUpdateSuccess] = useState(false)

  // Referencia para detectar clicks fuera del menú
  const optionsRef = useRef<HTMLDivElement>(null)
  const menuContainerRef = useRef<HTMLDivElement>(null)

  const showOptions = () => {
    setIsOptionsVisible(true)
  }

  const hideOptions = () => {
    setIsOptionsVisible(false)
  }

  const toggleOptions = (event: React.MouseEvent) => {
    // Detener la propagación del evento
    event.stopPropagation()

    // Guardar el elemento que originó el evento
    const target = event.currentTarget

    // Si el menú ya está visible, ocultarlo
    if (isOptionsVisible) {
      hideOptions()
    } else {
      // Si el menú está oculto, mostrarlo
      showOptions()
    }
  }

  // Función para manejar la actualización del nombre del sector
  const handleUpdateSectorName = async () => {
    // Validar que el nombre no esté vacío
    if (!editedSectorName || editedSectorName.trim() === '') {
      setUpdateError('El nombre del sector no puede estar vacío')
      return
    }

    // Si el nombre no ha cambiado, simplemente cerrar el modo de edición
    if (editedSectorName === sectorName) {
      setCanEdit(false)
      setUpdateError(null)
      return
    }

    try {
      setIsUpdating(true)
      setUpdateError(null)

      // Llamar al servicio para actualizar el nombre del sector
      const response = await updateSectorName(
        projectId,
        sectorId,
        editedSectorName
      )

      // Verificar si la respuesta fue exitosa
      if (!response.success) {
        setUpdateError(
          response.error?.message || 'Error al actualizar el nombre del sector'
        )
        setIsUpdating(false)
        return
      }

      // Actualizar el proyecto en el store para reflejar los cambios
      await fetchProject(projectId)

      // Mostrar mensaje de éxito
      setUpdateSuccess(true)

      // Ocultar el mensaje de éxito después de 3 segundos
      setTimeout(() => {
        setUpdateSuccess(false)
        // Cerrar el modo de edición
        setCanEdit(false)
      }, 2000)
    } catch (error) {
      setUpdateError('Error al actualizar el nombre del sector')
      console.error('Error al actualizar el nombre del sector:', error)
    } finally {
      setIsUpdating(false)
    }
  }

  // Efecto para manejar clicks fuera del componente
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Si el clic fue dentro del contenedor del menú (que incluye el botón), no hacer nada
      if (
        menuContainerRef.current &&
        menuContainerRef.current.contains(event.target as Node)
      ) {
        // No hacemos nada si el clic fue dentro del contenedor del menú
        return
      }

      // Si llegamos aquí, el clic fue fuera del menú y del botón, así que ocultamos el menú
      if (isOptionsVisible) {
        hideOptions()
      }
    }

    // Agregar event listener cuando el menú está visible
    if (isOptionsVisible) {
      // Usar setTimeout para asegurarse de que este event listener se agregue después
      // de que se procese el evento de clic actual
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 0)
    }

    // Cleanup del event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOptionsVisible])

  // Función para manejar el botón de cancelar
  const handleCancel = () => {
    setEditedSectorName(sectorName) // Restaurar el nombre original
    setCanEdit(false)
    setIsOptionsVisible(false)
    setUpdateError(null)
  }

  return (
    <div className="mb-7 lg:mb-6">
      <div className="flex w-full flex-col">
        <div className="flex items-end gap-2 lg:gap-6">
          {/* Contenedor principal del input */}
          <div className="relative flex-1">
            {/* Capa transparente para capturar clics cuando no está en modo edición */}
            {!canEdit && (
              <div 
                className="absolute inset-0 z-10 cursor-pointer" 
                style={{ top: '24px' }} // Espacio para el label
                onClick={() => {
                  if (onClick) onClick();
                  console.log('Click en sector:', sectorId);
                }}
              />
            )}
            
            {/* Input normal */}
            <Input
              label={`Nombre del Sector ${sectorNumber}`}
              value={editedSectorName}
              onChange={(e) => setEditedSectorName(e.target.value)}
              className={isActive ? 'active-sector-input' : ''}
              disabled={!canEdit}
            />
            
            {/* Estilos para hover y sector activo */}
            <style jsx global>{`
              /* Estilo para hover en inputs deshabilitados */
              .relative:hover input:disabled {
                background-color: #F2F2F2 !important;
              }
              
              /* Estilo para el sector activo */
              .active-sector-input input:disabled {
                background-color: #F2F2F2 !important;
                border-color: #DFE4EA !important;
              }
            `}</style>
          </div>
          <div className="relative w-12" ref={menuContainerRef}>
            <Button
              variant="tertiary"
              icon={<EllipsisVerticalIcon />}
              iconClassName={'w-8'}
              onClick={(e) => toggleOptions(e)}
            />
            <div
              ref={optionsRef}
              className={clsx('absolute right-0 top-14 z-50 w-fit', {
                hidden: !isOptionsVisible,
              })}
            >
              <SectorsListItemOptions
                setCanEdit={setCanEdit}
                setIsOptionsVisible={setIsOptionsVisible}
                setIsDeleteModalVisible={setIsDeleteModalVisible}
              />
            </div>
          </div>
        </div>

        {/* Mensajes de error y éxito */}
        {canEdit && (
          <div className="mt-2 text-sm">
            {updateError && <div className="mb-2 text-red">{updateError}</div>}

            {updateSuccess && (
              <div className="mb-2 text-green-success">
                Nombre actualizado correctamente
              </div>
            )}
          </div>
        )}

        {/* Botones de acción */}
        {canEdit && (
          <div className="mt-2 flex flex-col gap-4 lg:flex-row-reverse lg:gap-9">
            <Button onClick={handleUpdateSectorName} disabled={isUpdating}>
              {isUpdating ? 'Guardando...' : 'Guardar'}
            </Button>
            <Button
              variant="secondary"
              onClick={handleCancel}
              disabled={isUpdating}
            >
              Cancelar
            </Button>
          </div>
        )}
      </div>

      {/* Modal de eliminación */}
      <ModalOverlay isModalVisible={isDeleteModalVisible}>
        <DeleteSectorModal
          showModal={isDeleteModalVisible}
          setShowModal={setIsDeleteModalVisible}
          sectorId={sectorId}
        />
      </ModalOverlay>
    </div>
  )
}

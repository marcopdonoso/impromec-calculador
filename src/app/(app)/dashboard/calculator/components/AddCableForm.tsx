import Button from '@/components/Button'
import Input from '@/components/Input'
import MyListbox, { Option } from '@/components/MyListbox'
import { cables } from '@/constants/cables.constants'
import { Cable, CableArrangementType } from '@/models/cable.model'
import { useProjectStore } from '@/store/useProjectStore'
import { CABLE_ARRANGEMENT_OPTIONS } from '@/utilities/cable-arrangement.utility'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

interface AddCableFormProps {
  installationLayerType: string | null
  onSave?: () => void
  currentSectorId?: string | null
}

interface AddCableFormData {
  cableIndex: number | null
  quantity: number
  arrangement: CableArrangementType | null
}

export default function AddCableForm({
  installationLayerType,
  onSave,
  currentSectorId,
}: AddCableFormProps) {
  const params = useParams()
  const projectId = params.slug as string
  const { currentProject, addCable, fetchProject, isLoading, error } =
    useProjectStore()
  const [selectedCableIndex, setSelectedCableIndex] = useState<number | null>(
    null
  )
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Limpiar mensajes de éxito después de 3 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
        // Ya no cerramos el formulario aquí, lo hacemos directamente en onSubmit
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [successMessage])

  // Efecto para registrar cuando se monta el componente
  useEffect(() => {
    console.log('AddCableForm - Componente montado')
    // No recargamos el proyecto aquí para evitar problemas con la UI
  }, [])
  // Verificar el valor de installationLayerType y determinar si es capa única
  const isSingleLayer = installationLayerType === 'singleLayer'
  console.log(
    'installationLayerType:',
    installationLayerType,
    'isSingleLayer:',
    isSingleLayer
  )

  // Verificar si el proyecto tiene sectores según la propiedad hasSectors
  const hasSectors = currentProject?.hasSectors

  // Obtener el ID del sector activo
  // Si se proporciona currentSectorId, usarlo directamente
  // Si no, usar el primer sector o el sector por defecto
  let sectorId: string | null = null

  if (hasSectors) {
    // Para proyectos con sectores, usar el ID del sector activo si está disponible
    if (currentSectorId) {
      sectorId = currentSectorId
      console.log('Usando sector activo (prop):', sectorId)
    }
    // Si no hay ID de sector activo, buscar el sector activo en el proyecto
    else if (currentProject?.sectors && currentProject.sectors.length > 0) {
      sectorId = currentProject.sectors[0].id || null
      console.log('Usando primer sector (fallback):', sectorId)
    }
  } else {
    // Para proyectos sin sectores, usar el ID del sector por defecto
    sectorId = currentProject?.defaultSector?.id || null
    console.log('Usando sector por defecto:', sectorId)
  }

  console.log('ID del sector para agregar cable:', sectorId)

  // Crear las opciones para los listbox
  const cableGaugesMM2: Option[] = cables.map(
    (cable: Cable, index: number) => ({
      text: `${cable.nominalSectionMM2} mm²`,
      value: index.toString(),
    })
  )

  const cableGaugesAWG: Option[] = cables.map(
    (cable: Cable, index: number) => ({
      text: `${cable.nominalSectionAWG} AWG`,
      value: index.toString(),
    })
  )

  // Convertir las opciones de disposición de cables al formato requerido por el componente MyListbox
  const cableArrangement: Option[] = CABLE_ARRANGEMENT_OPTIONS.map(
    (option: any) => ({
      text: option.text,
      value: option.value,
    })
  )

  // Establecer el primer cable como valor por defecto
  const defaultCableIndex = 0

  const { control, handleSubmit, setValue, watch, reset } =
    useForm<AddCableFormData>({
      defaultValues: {
        cableIndex: defaultCableIndex,
        quantity: 1,
        arrangement: 'horizontal',
      },
    })

  // Establecer el valor inicial del cable seleccionado
  useEffect(() => {
    setSelectedCableIndex(defaultCableIndex)
  }, [])

  // Observar cambios en el índice del cable seleccionado
  const watchCableIndex = watch('cableIndex')

  // Actualizar el estado local cuando cambia el índice del cable
  useEffect(() => {
    if (watchCableIndex !== undefined && watchCableIndex !== null) {
      setSelectedCableIndex(watchCableIndex as number)
    }
  }, [watchCableIndex])

  // Actualizar el campo de disposición según el tipo de instalación
  useEffect(() => {
    // Si no es capa única, fijar en horizontal
    if (installationLayerType !== 'singleLayer') {
      setValue('arrangement', 'horizontal')
    }
  }, [installationLayerType, setValue])

  // Manejar el cambio en el listbox de mm²
  const handleMM2Change = (option: Option) => {
    setValue('cableIndex', parseInt(option.value.toString()))
  }

  // Manejar el cambio en el listbox de AWG
  const handleAWGChange = (option: Option) => {
    setValue('cableIndex', parseInt(option.value.toString()))
  }

  const onSubmit = async (data: AddCableFormData) => {
    setErrorMessage(null)
    setSuccessMessage(null)

    // Verificar que haya un índice de cable válido
    if (data.cableIndex === null || data.cableIndex === undefined) {
      setErrorMessage('Debe seleccionar un calibre de cable')
      return
    }

    if (!data.quantity || data.quantity <= 0) {
      setErrorMessage('La cantidad debe ser mayor a 0')
      return
    }

    if (!data.arrangement) {
      setErrorMessage('Debe seleccionar una disposición')
      return
    }

    const selectedCable = cables[data.cableIndex]

    try {
      const cableData = {
        cable: selectedCable,
        quantity: data.quantity,
        arrangement: data.arrangement || undefined,
      }

      console.log('Agregando cable con datos:', {
        projectId,
        sectorId,
        cableData,
      })

      // Si el proyecto no tiene sectores, el sectorId será null
      const result = await addCable(projectId, sectorId, cableData)

      if (result) {
        // Éxito: reiniciar el formulario y mostrar mensaje
        reset()
        console.log('Cable agregado exitosamente, resultado:', result)

        // Volver a cargar el proyecto para asegurar que la tabla se actualice
        console.log('Recargando proyecto...')
        await fetchProject(projectId)
        console.log('Proyecto recargado')

        // Esperar un momento para asegurar que los datos se han actualizado completamente
        // Este retraso es importante para que React tenga tiempo de procesar los cambios
        await new Promise((resolve) => setTimeout(resolve, 500))

        // Mostrar mensaje de éxito
        setSuccessMessage('Cable agregado exitosamente')

        // Cerrar el formulario inmediatamente
        if (onSave) {
          console.log('Cerrando formulario después de agregar cable')
          onSave()
        }
      } else {
        setErrorMessage('No se pudo agregar el cable')
      }
    } catch (err) {
      setErrorMessage('Error al guardar el cable')
      console.error('Error en onSubmit:', err)
    }
  }

  return (
    <div className="mt-8 rounded-2xl border border-gray-input bg-gray-white px-2 py-5 lg:mt-6 lg:p-8">
      <h6 className="body_medium_medium mb-6">Agregar cable</h6>

      {errorMessage && (
        <div className="bg-red-100 text-red-700 mb-4 rounded-md p-3">
          {errorMessage}
        </div>
      )}

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

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col lg:mb-6 lg:flex-row lg:gap-6">
          <div className="mb-5 flex gap-2 lg:mb-0 lg:w-1/2 lg:gap-6">
            <Controller
              name="cableIndex"
              control={control}
              render={({ field }) => (
                <MyListbox
                  label="Calibre en mm²"
                  options={cableGaugesMM2}
                  value={
                    field.value !== null ? cableGaugesMM2[field.value] : null
                  }
                  onChange={handleMM2Change}
                />
              )}
            />
            <Controller
              name="cableIndex"
              control={control}
              render={({ field }) => (
                <MyListbox
                  label="Calibre en AWG"
                  options={cableGaugesAWG}
                  value={
                    field.value !== null ? cableGaugesAWG[field.value] : null
                  }
                  onChange={handleAWGChange}
                />
              )}
            />
          </div>
          <div className="mb-7 flex gap-2 lg:mb-0 lg:w-1/2 lg:gap-6">
            <Controller
              name="quantity"
              control={control}
              render={({ field }) => (
                <Input
                  label="Cantidad"
                  type="number"
                  min="1"
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 1)
                  }
                />
              )}
            />
            <Controller
              name="arrangement"
              control={control}
              render={({ field }) => (
                <MyListbox
                  label="Disposición"
                  options={cableArrangement}
                  value={
                    field.value
                      ? cableArrangement.find(
                          (opt) => opt.value === field.value
                        ) || null
                      : null
                  }
                  onChange={(option) => {
                    console.log('Cambiando disposición a:', option.value)
                    field.onChange(option.value)
                  }}
                  disabled={installationLayerType !== 'singleLayer'}
                />
              )}
            />
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <Button
            className="lg:max-w-md"
            type="button"
            variant="secondary"
            onClick={() => {
              if (onSave) onSave()
            }}
          >
            Cancelar
          </Button>
          <Button className="lg:max-w-md" type="submit" disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar cable'}
          </Button>
        </div>
      </form>
    </div>
  )
}

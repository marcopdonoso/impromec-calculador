import Button from '@/components/Button'
import Input from '@/components/Input'
import MyListbox, { Option } from '@/components/MyListbox'
import { Cable, CableArrangementType, CableInTray } from '@/models/cable.model'
import { Controller, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useProjectStore } from '@/store/useProjectStore'
import { cables } from '@/constants/cables.constants'
import { CABLE_ARRANGEMENT_OPTIONS } from '@/utilities/cable-arrangement.utility'

interface AddCableFormProps {
  installationLayerType: string | null
  onSave?: () => void
}

interface AddCableFormData {
  cableIndex: number | null
  quantity: number
  arrangement: CableArrangementType | null
}

export default function AddCableForm({ installationLayerType, onSave }: AddCableFormProps) {
  const params = useParams();
  const projectId = params.slug as string;
  const { currentProject, addCable, fetchProject, isLoading, error } = useProjectStore();
  const [selectedCableIndex, setSelectedCableIndex] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // Verificar el valor de installationLayerType y determinar si es capa única
  const isSingleLayer = installationLayerType === 'singleLayer';
  console.log('installationLayerType:', installationLayerType, 'isSingleLayer:', isSingleLayer);
  
  // Verificar si el proyecto tiene sectores según la propiedad hasSectors
  const hasSectors = currentProject?.hasSectors;
  // Obtener el ID del sector según el tipo de proyecto
  const sectorId = hasSectors && currentProject?.sectors?.[0]?.id ? 
    currentProject.sectors[0].id : 
    currentProject?.defaultSector?.id || null;

  // Crear las opciones para los listbox
  const cableGaugesMM2: Option[] = cables.map((cable: Cable, index: number) => ({
    text: `${cable.nominalSectionMM2} mm²`,
    value: index.toString(),
  }));

  const cableGaugesAWG: Option[] = cables.map((cable: Cable, index: number) => ({
    text: `${cable.nominalSectionAWG} AWG`,
    value: index.toString(),
  }));

  // Convertir las opciones de disposición de cables al formato requerido por el componente MyListbox
  const cableArrangement: Option[] = CABLE_ARRANGEMENT_OPTIONS.map((option: any) => ({
    text: option.text,
    value: option.value,
  }));

  // Establecer el primer cable como valor por defecto
  const defaultCableIndex = 0;
  
  const { control, handleSubmit, setValue, watch, reset } = useForm<AddCableFormData>({
    defaultValues: {
      cableIndex: defaultCableIndex,
      quantity: 1,
      arrangement: 'horizontal',
    },
  });
  
  // Establecer el valor inicial del cable seleccionado
  useEffect(() => {
    setSelectedCableIndex(defaultCableIndex);
  }, []);

  // Observar cambios en el índice del cable seleccionado
  const watchCableIndex = watch('cableIndex');

  // Actualizar el estado local cuando cambia el índice del cable
  useEffect(() => {
    if (watchCableIndex !== undefined && watchCableIndex !== null) {
      setSelectedCableIndex(watchCableIndex as number);
    }
  }, [watchCableIndex]);

  // Actualizar el campo de disposición según el tipo de instalación
  useEffect(() => {
    // Si no es capa única, fijar en horizontal
    if (installationLayerType !== 'singleLayer') {
      setValue('arrangement', 'horizontal');
    }
  }, [installationLayerType, setValue]);

  // Manejar el cambio en el listbox de mm²
  const handleMM2Change = (option: Option) => {
    setValue('cableIndex', parseInt(option.value.toString()));
  };

  // Manejar el cambio en el listbox de AWG
  const handleAWGChange = (option: Option) => {
    setValue('cableIndex', parseInt(option.value.toString()));
  };

  const onSubmit = async (data: AddCableFormData) => {
    setErrorMessage(null);
    
    // Verificar que haya un índice de cable válido
    if (data.cableIndex === null || data.cableIndex === undefined) {
      setErrorMessage('Debe seleccionar un calibre de cable');
      return;
    }

    if (!data.quantity || data.quantity <= 0) {
      setErrorMessage('La cantidad debe ser mayor a 0');
      return;
    }

    if (!data.arrangement) {
      setErrorMessage('Debe seleccionar una disposición');
      return;
    }

    const selectedCable = cables[data.cableIndex];
    
    try {
      const cableData = {
        cable: selectedCable,
        quantity: data.quantity,
        arrangement: data.arrangement || undefined
      };

      // Si el proyecto no tiene sectores, el sectorId será null
      const result = await addCable(projectId, sectorId, cableData);
      
      if (result) {
        // Éxito: reiniciar el formulario y mostrar mensaje
        reset();
        console.log('Cable agregado exitosamente');
        
        // Volver a cargar el proyecto para asegurar que la tabla se actualice
        await fetchProject(projectId);
        
        // Llamar a la función onSave si existe
        if (onSave) {
          onSave();
        }
      }
    } catch (err) {
      setErrorMessage('Error al guardar el cable');
      console.error(err);
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-gray-input bg-gray-white px-2 py-5 lg:mt-6 lg:p-8">
      <h6 className="body_medium_medium mb-6">Agregar cable</h6>

      {errorMessage && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
          {errorMessage}
        </div>
      )}

      {error && (
        <div className="mb-4 rounded-md bg-red-100 p-3 text-red-700">
          {error}
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
                  value={field.value !== null ? cableGaugesMM2[field.value] : null}
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
                  value={field.value !== null ? cableGaugesAWG[field.value] : null}
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
                  onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
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
                  value={field.value ? cableArrangement.find(opt => opt.value === field.value) || null : null}
                  onChange={(option) => {
                    console.log('Cambiando disposición a:', option.value);
                    field.onChange(option.value);
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
              if (onSave) onSave();
            }}
          >
            Cancelar
          </Button>
          <Button 
            className="lg:max-w-md" 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar cable'}
          </Button>
        </div>
      </form>
    </div>
  )
}

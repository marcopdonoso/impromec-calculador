import Button from '@/components/Button'
import { Sector } from '@/models/project.model'

interface SaveAndCalcProps {
  activeSector?: Sector | null
  hasSectors?: boolean
  activeSectorIndex?: number
  // Prop para verificar si hay cables
  hasCables?: boolean
}

export default function SaveAndCalc({ 
  activeSector, 
  hasSectors = false, 
  activeSectorIndex = -1,
  hasCables = false 
}: SaveAndCalcProps) {
  // Determinar el texto del botón según si hay sectores y si hay un sector activo
  const buttonText = hasSectors && activeSector && activeSectorIndex !== -1
    ? `Guardar y Calcular Sector ${activeSectorIndex + 1}`
    : 'Guardar y Calcular'
  
  // Si no hay cables, no mostrar el botón
  if (!hasCables) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-6 px-2 lg:mt-6">
      <hr className="w-full text-gray-placeholder lg:hidden" />
      <Button className="lg:max-w-md">{buttonText}</Button>
    </div>
  )
}

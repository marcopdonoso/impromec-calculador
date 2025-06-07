import SelectedItemCard from '@/components/SelectedItemCard'
import { TrayType } from '@/models/tray.model';
import { InstallationLayerType } from '@/models/project.model';

interface SelectedTrayCardProps {
  trayType?: TrayType | null;
  reservePercentage?: number | null;
  installationLayer?: InstallationLayerType | string | null; // string for backward compatibility or if 'adosada' is custom
}

export default function SelectedTrayCard({ 
  trayType = 'escalerilla', // Default value
  reservePercentage = 20,   // Default value
  installationLayer = 'adosada' // Default value or handle if it's a specific type
}: SelectedTrayCardProps) {

  // Determinar la imagen según el tipo de bandeja
  const trayImage =
    trayType === 'canal' ? '/img/canal.png' : '/img/escalerilla.png';

  // Formatear el texto para el tipo de bandeja
  const trayTypeText =
    trayType === 'canal' ? 'Bandeja tipo Canal' : 'Bandeja tipo Escalerilla';

  // Formatear el texto para el tipo de instalación
  const installationTypeText = (() => {
    switch (installationLayer) {
      case 'singleLayer':
        return 'Cables en una sola capa';
      case 'multiLayer':
        return 'Cables en varias capas';
      // If 'adosada' is a valid InstallationLayerType, it will be handled by the default or specific case.
      // If it's a custom string not part of InstallationLayerType, the default case handles it.
      default:
        return typeof installationLayer === 'string' ? installationLayer : 'Tipo no especificado';
    }
  })();

  return (
    <SelectedItemCard
      image={trayImage}
      primaryText={trayTypeText}
      secondaryText={`${reservePercentage || 20}% de reserva`}
      tertiaryText={installationTypeText}
    />
  )
}

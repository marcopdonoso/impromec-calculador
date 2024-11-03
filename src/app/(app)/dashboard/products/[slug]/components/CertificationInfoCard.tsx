import ListItem from '@/components/ListItem'
import Image from 'next/image'

export default function CertificationInfoCard() {
  return (
    <div className="mt-4 rounded-2xl border border-gray-input bg-gray-white px-4 pt-5 text-start lg:mt-2 lg:px-10 lg:pt-6">
      <p className="body_small_medium text-gray-placeholder lg:body_medium_medium">
        Certificación:
      </p>
      <ul className="mt-1 flex flex-col gap-1 lg:mt-6">
        <ListItem>
          Materia prima de grado estructural, certificada y fabricada bajo
          normativa ASTM A653.
        </ListItem>
        <ListItem>
          Aseguramos y garantizamos la calidad de nuestros productos en
          cumplimiento de la norma internacional NEMA VE-1.
        </ListItem>
        <ListItem>
          Certificamos nuestras piezas luego de rigurosas pruebas destructivas
          supervisadas por IBNORCA.
        </ListItem>
      </ul>
      <div className="flex w-full items-center justify-center gap-4 lg:justify-start">
        <Image
          src={'/svg/logo_nema.svg'}
          alt="logo_nema"
          width={166}
          height={50}
          className="h-auto w-28 lg:w-40"
        />
        <Image
          src={'/svg/logo_astm.svg'}
          alt="logo_nema"
          width={201.49}
          height={40}
          className="h-auto w-28 lg:w-40"
        />
      </div>
    </div>
  )
}

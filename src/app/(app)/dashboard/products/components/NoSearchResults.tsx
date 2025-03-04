import Image from 'next/image'

export default function NoSearchResults() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Image
        src="/svg/Lupa_no_encontrado.svg"
        alt="No encontrado"
        width={400}
        height={400}
        className="h-auto w-10 lg:w-16"
      />
      <h4 className="body_large_semibold text-center lg:heading_h4">
        Lo sentimos, no hay coincidencias
      </h4>
      <p className="body_medium_regular text-center lg:body_large_regular">
        Parece que no encontramos productos que coincidan con tu búsqueda.
        Prueba ajustando los filtros o explorando otras opciones.
      </p>
    </div>
  )
}

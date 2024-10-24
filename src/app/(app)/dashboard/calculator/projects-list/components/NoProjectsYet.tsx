import Image from 'next/image'

export default function NoProjectsYet() {
  return (
    <div className="my-20 flex flex-col items-center justify-center">
      <Image
        src={'/svg/icon_no-projects.svg'}
        alt="no projects icon"
        width={100}
        height={100}
        className="mb-3 h-16 w-auto"
      />
      <h4 className="body_large_semibold mb-6 text-center lg:heading_h4">
        Aún no tienes proyectos
      </h4>
      <p className="body_small_regular text-center lg:body_large_regular lg:max-w-xl">
        Crea tu primer proyecto y calcula la bandeja portacable ideal para tu
        instalación
      </p>
    </div>
  )
}

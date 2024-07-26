import Image from 'next/image'

export default function TopImage() {
  return (
    <>
      <Image
        src={'/img/portada_mobile.webp'}
        alt="pantalla del iMac"
        width={1440}
        height={1416}
        className="h-auto w-full lg:hidden"
        priority
      />
      <Image
        src={'/img/portada_desktop.webp'}
        alt="pantalla del iMac"
        width={4059}
        height={1188}
        className="hidden h-auto w-full lg:block"
        priority
      />
    </>
  )
}

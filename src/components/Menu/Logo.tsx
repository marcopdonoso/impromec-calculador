import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Logo() {
  const router = useRouter()

  return (
    <div
      role="button"
      onClick={() => {
        router.push('/')
      }}
      className="relative hidden h-auto min-w-20 lg:block"
    >
      <Image src="svg/Logo_iso.svg" alt="logo" fill priority />
    </div>
  )
}

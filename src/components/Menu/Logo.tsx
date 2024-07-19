import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  const router = useRouter()

  return (
    <div
      role="button"
      onClick={() => {
        router.push('/')
      }}
      className={clsx('relative h-full w-full', className)}
    >
      <Image src="svg/Logo_iso.svg" alt="logo" fill priority />
    </div>
  )
}

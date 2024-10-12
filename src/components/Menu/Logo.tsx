import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href={'/'} className={clsx('h-full w-auto', className)}>
      <Image
        src="/svg/Logo_iso.svg"
        alt="logo"
        width={160}
        height={88}
        className="pointer-events-none h-full w-auto"
        priority
      />
    </Link>
  )
}

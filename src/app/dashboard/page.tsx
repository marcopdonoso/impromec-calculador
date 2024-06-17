import MyProgress from '@/components/MyProgress'
import Todos from '@/components/Todos'
import Link from 'next/link'
import { Suspense } from 'react'

export default function Dashboard() {
  return (
    <div>
      <Suspense fallback={<MyProgress />}>
        <Todos />
      </Suspense>
      <Link href={'/'}>Inicio</Link>
    </div>
  )
}

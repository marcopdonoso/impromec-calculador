'use client'

import { useUserStore } from '@/store/useStore'
import { useEffect } from 'react'

export default function UserRestorer() {
  const restoreUser = useUserStore((state) => state.restoreUser)

  useEffect(() => {
    restoreUser()
    // eslint-disable-next-line
  }, [])

  return null
}

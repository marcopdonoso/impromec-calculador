'use client'
import { useSearchParams } from 'next/navigation'
import DeleteSingleSectorMessage from './DeleteSingleSectorMessage'

export default function DeleteSingleSectorMessageWrapper() {
  const searchParams = useSearchParams()
  const showMessage =
    searchParams.get('showDeleteSingleSectorMessage') === 'true'

  return showMessage && <DeleteSingleSectorMessage />
}

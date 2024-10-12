'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import ModalOverlay from '../../../components/ModalOverlay'
import ExitModal from './ExitModal'

export default function PreventNavigation({ backHref }: { backHref: string }) {
  const [leavingPage, setLeavingPage] = useState(false)

  const router = useRouter()
  const confirmationFn = useRef<() => void>(() => {})

  if (typeof window !== 'undefined') {
    window.history.pushState(null, document.title, window.location.href)
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.href) {
        e.preventDefault()
        confirmationFn.current = () => {
          router.push(target.href)
        }
        setLeavingPage(true)
      }
    }

    const handlePopState = () => {
      window.history.pushState(null, document.title, window.location.href)

      confirmationFn.current = () => {
        router.push(backHref)
      }

      setLeavingPage(true)
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
    }

    document.addEventListener('click', handleClick)
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [router, backHref])

  return (
    <ModalOverlay isModalVisible={leavingPage}>
      <ExitModal
        showModal={leavingPage}
        setShowModal={setLeavingPage}
        onCancel={() => setLeavingPage(false)}
        onConfirm={() => {
          setTimeout(() => {
            confirmationFn.current()
          }, 0)
          setLeavingPage(false)
        }}
      />
    </ModalOverlay>
  )
}

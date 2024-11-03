'use client'
import * as Progress from '@radix-ui/react-progress'
import { useEffect, useState } from 'react'

const MyProgress = ({ label }: { label?: string }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 100
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <p className="mb-8 font-medium">{label ?? 'Cargando...'}</p>
      <Progress.Root
        className="h-4 w-64 overflow-hidden rounded-full bg-gray-background"
        value={progress}
      >
        <Progress.Indicator
          className="h-full bg-red transition-transform duration-500"
          style={{ transform: `translateX(-${100 - progress}%)` }}
        />
      </Progress.Root>
    </div>
  )
}

export default MyProgress

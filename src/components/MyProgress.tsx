'use client'
import * as Progress from '@radix-ui/react-progress'
import { useEffect, useState } from 'react'

const MyProgress: React.FC = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 20
      })
    }, 500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <p className="mb-8 font-medium">Cargando...</p>
      <Progress.Root
        className="h-4 w-64 overflow-hidden rounded-full bg-gray-background"
        style={{
          // Fix overflow clipping in Safari
          // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
          transform: 'translateZ(0)',
        }}
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

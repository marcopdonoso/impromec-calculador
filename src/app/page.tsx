import Button from '@/components/Button'

export default function Home() {
  const Icon = () => (
    <div className="flex h-4 w-4 items-center justify-center">+</div>
  )
  return (
    <div className="flex h-screen items-center justify-center">
      <Button variant="primary" icon={<Icon />}>
        Prueba
      </Button>
    </div>
  )
}

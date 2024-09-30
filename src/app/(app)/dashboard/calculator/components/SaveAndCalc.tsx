import Button from '@/components/Button'

export default function SaveAndCalc() {
  return (
    <div className="flex flex-col items-center gap-6 px-2 lg:mt-6">
      <hr className="text-gray-placeholder lg:hidden" />
      <Button className="lg:max-w-md">Guardar y Calcular</Button>
    </div>
  )
}

export default function LoadAreaTotals() {
  return (
    <div className="mb-4 flex w-full flex-col rounded-lg bg-gray-input p-4 lg:flex-row lg:items-center lg:justify-between lg:px-5 lg:py-3">
      <p className="body_small_medium lg:body_medium_medium">Resultado</p>
      <div>
        <p className="body_medium_medium lg:body_large_semibold">
          Carga total: [0.12] kg/ml
        </p>
        <p className="body_medium_medium lg:body_large_semibold">
          Área total: [5000] mm²
        </p>
      </div>
    </div>
  )
}

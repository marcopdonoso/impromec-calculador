export default function ProductsSkeleton() {
  return (
    <>
      {Array(6)
        .fill(1)
        .map((card, idx) => {
          return (
            <div
              key={idx}
              className="flex h-44 w-40 animate-pulse flex-col items-center rounded-md bg-gray-background p-2 max-[359px]:w-32 lg:h-80 lg:w-72 lg:rounded-lg lg:p-3"
            />
          )
        })}
    </>
  )
}

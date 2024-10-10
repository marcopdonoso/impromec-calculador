import UnfinishedSectorMessage from './UnfinishedSectorMessage'

export default function UnfinishedSectorsListMessages() {
  const sectors = [
    { CablesOnTray: [] },
    { CablesOnTray: [] },
    { CablesOnTray: [] },
  ]

  return (
    <div className="flex w-full flex-col gap-6 lg:gap-8">
      {sectors.map(
        (sector, idx) =>
          sector.CablesOnTray.length === 0 && (
            <UnfinishedSectorMessage key={idx} idx={idx} />
          )
      )}
    </div>
  )
}

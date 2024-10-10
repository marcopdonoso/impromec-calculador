import UnfinishedSectorMessage from './UnfinishedSectorMessage'

export default function UnfinishedSectorsListMessages() {
  const sectors = [
    { CablesOnTray: [] },
    { CablesOnTray: [''] },
    { CablesOnTray: [''] },
  ]

  const unfinishedSectors = sectors.filter(
    (sector) => sector.CablesOnTray.length === 0
  )

  return unfinishedSectors.length > 0 ? (
    <div className="flex w-full flex-col gap-6 lg:gap-8">
      {unfinishedSectors.map(
        (sector, idx) =>
          sector.CablesOnTray.length === 0 && (
            <UnfinishedSectorMessage key={idx} idx={idx} />
          )
      )}
    </div>
  ) : null
}

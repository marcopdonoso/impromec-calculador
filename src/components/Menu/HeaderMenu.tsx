'use client'
import { useCallback, useState } from 'react'
import CollapsedHeaderMenu from './CollapsedHeaderMenu'
import MenuContent from './MenuContent'
import MenuOverlay from './MenuOverlay'

export default function HeaderMenu() {
  const [showMenu, setShowMenu] = useState(false)

  const showMenuToggler = useCallback(() => {
    setShowMenu((prevShowMenu) => !prevShowMenu)
  }, [])

  return (
    <>
      <div className="sm:hidden">
        <CollapsedHeaderMenu handleClick={showMenuToggler} />
      </div>
      <MenuOverlay showMenu={showMenu} toggleMenu={showMenuToggler} />
      <MenuContent showMenu={showMenu} toggleMenu={showMenuToggler} />
    </>
  )
}

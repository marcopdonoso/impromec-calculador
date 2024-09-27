'use client'
import { useCallback, useEffect, useState } from 'react'
import CollapsedHeaderMenu from './CollapsedHeaderMenu'
import MenuContent from './MenuContent'
import MenuOverlay from './MenuOverlay'

export default function HeaderMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Bloquear scroll cuando el menú esté abierto
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    // Limpiar el efecto cuando el componente se desmonte
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  const showMenuToggler = useCallback(() => {
    setIsMenuOpen((prev) => !prev)
  }, [])

  return (
    <div>
      <div className="lg:hidden">
        <CollapsedHeaderMenu handleClick={showMenuToggler} />
      </div>
      <MenuOverlay showMenu={isMenuOpen} toggleMenu={showMenuToggler} />
      <MenuContent showMenu={isMenuOpen} toggleMenu={showMenuToggler} />
    </div>
  )
}

import { useRef, useState } from 'react'
import { useOutsideClick } from '@/shared/lib/hooks/useoutsideclick'

export const useHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  const buttonRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)

  useOutsideClick(menuRef, (event: MouseEvent) => {
    const target = event.target as Node

    if (buttonRef.current && buttonRef.current.contains(target)) return
    if (searchRef.current && searchRef.current.contains(target)) return

    handleCloseMenu()
  })
}

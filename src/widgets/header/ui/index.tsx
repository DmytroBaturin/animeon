'use client'

import { PageLayout } from '@/shared/layouts/page'
import Image from 'next/image'
import logo from '@/shared/assets/icons/logo.svg'
import { useRef, useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { UserAvatar } from '@/entities/user'
import { SearchAnime } from '@/features/anime/search'
import { routes } from '@/shared/config/routes'
import Link from 'next/link'
import { useOutsideClick } from '@/shared/lib/hooks/useoutsideclick'

interface HeaderLink {
  title: string
  href: string
}

const headerLinks: HeaderLink[] = [
  { title: 'Головна', href: routes.home },
  { title: 'Каталог', href: routes.releases },
  { title: 'Випадкове', href: routes.home },
]

export const Header = (isAuth: boolean) => {
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

  return (
    <header className="fixed bg-gradient-primary z-10 flex items-center w-screen h-[96px] md:h-[80px]">
      <PageLayout>
        <div className="flex justify-between items-center w-full">
          <nav className="hidden md:flex list-none font-bold gap-9">
            {headerLinks.map((link) => (
              <Link onClick={handleCloseMenu} href={link.href} key={link.title}>
                <li>{link.title}</li>
              </Link>
            ))}
          </nav>
          <Link onClick={handleCloseMenu} href={routes.home}>
            <Image src={logo} alt="logo" className="w-36 md:w-36" />
          </Link>
          <Button
            ref={buttonRef}
            variant="ghost"
            className="md:hidden text-2xl flex items-center"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </Button>

          <div className="hidden md:flex items-center gap-9">
            <nav className="list-none items-center flex gap-9">
              <SearchAnime />
              {!isAuth && <Link href={routes.login}>Авторизація</Link>}
            </nav>
            <UserAvatar />
          </div>
        </div>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute top-[96px] left-0 w-full bg-primary shadow-md md:hidden"
          >
            <nav className="list-none font-bold p-4 flex flex-col gap-4">
              <div className="border-b-2 flex items-center justify-between border-white/10 pb-4">
                <UserAvatar />
              </div>
              {headerLinks.map((link) => (
                <Link
                  onClick={handleCloseMenu}
                  href={link.href}
                  key={link.title}
                >
                  <li>{link.title}</li>
                </Link>
              ))}
              {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              <SearchAnime trigger={<li>Пошук</li>} ref={searchRef} />

              <li className="text-yellow-400">Підписка</li>
            </nav>
          </div>
        )}
      </PageLayout>
    </header>
  )
}

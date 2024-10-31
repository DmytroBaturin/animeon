'use client'

import { PageLayout } from '@/shared/layouts/page'
import Image from 'next/image'
import logo from '@/shared/assets/icons/logo.svg'
import { LegacyRef } from 'react'
import { Button } from '@/shared/components/ui/button'
import { UserAvatar } from '@/entities/user'
import { SearchAnime } from '@/features/anime/search'
import { routes } from '@/shared/config/routes'
import Link from 'next/link'
import { headerLinks } from '@/widgets/header/model/navigation'
import { useHeader } from '@/widgets/header/model'
import { MobileNavigation } from '@/widgets/header/ui/mobile-navigation'
import { useRouter } from 'next/navigation'

export const Header = ({ isLogged }: { isLogged: boolean }) => {
  const router = useRouter()
  const {
    handleCloseMenu,
    isMenuOpen,
    menuRef,
    setIsMenuOpen,
    searchRef,
    buttonRef,
  } = useHeader()
  return (
    <header className="fixed bg-gradient-primary z-10 flex items-center w-screen h-[96px] md:h-[80px]">
      <PageLayout>
        <div className="flex justify-between items-center w-full">
          <nav className="hidden md:flex list-none font-bold gap-9">
            {headerLinks.map((link) => (
              <li key={link.title}>
                <a
                  onClick={
                    link.onClick
                      ? async () => {
                          const randomRoute = await link.onClick!()
                          router.push(randomRoute)
                        }
                      : undefined
                  }
                  href={link.href || '#'}
                >
                  {link.title}
                </a>
              </li>
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
              {!isLogged && <Link href={routes.login}>Авторизація</Link>}
            </nav>
            <Link href={routes.profile}>
              <UserAvatar />
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <MobileNavigation
            isLogged={isLogged}
            handleCloseMenu={handleCloseMenu}
            ref={menuRef as LegacyRef<HTMLDivElement>}
            searchNode={
              <SearchAnime
                handleCloseMenu={handleCloseMenu}
                trigger={<li>Пошук</li>}
                ref={searchRef as LegacyRef<HTMLInputElement>}
              />
            }
          />
        )}
      </PageLayout>
    </header>
  )
}

'use client'

import { PageLayout } from '@/shared/layouts/page'
import Image from 'next/image'
import logo from '@/shared/assets/icons/logo.svg'
import { LegacyRef, useEffect, useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { UserAvatar } from '@/entities/user'
import { SearchAnime } from '@/features/anime/search'
import { routes } from '@/shared/config/routes'
import Link from 'next/link'
import { headerLinks } from '@/widgets/header/model/navigation'
import { useHeader } from '@/widgets/header/model'
import { MobileNavigation } from '@/widgets/header/ui/mobile-navigation'
import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'

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
  const pathname = usePathname()

  const isDynamicOpacity = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className="fixed flex z-50 items-center w-screen h-[96px] md:h-[80px]">
      <div
        className={clsx(
          (isScrolled || !isDynamicOpacity) && 'opacity-100',
          'bg-gradient-to-b from-[#104C81] opacity-0 z-0 to-[#021F5D] absolute w-[100vw] h-24 transition-opacity duration-300 ease-in-out',
        )}
      />
      <PageLayout>
        <div className="flex relative z-50 justify-between items-center w-full">
          <nav className="hidden md:flex list-none font-bold gap-9">
            {headerLinks.map((link) =>
              link.onClick ? (
                <a
                  className="cursor-pointer"
                  key={link.href}
                  onClick={() =>
                    link.onClick().then((res) => {
                      router.push(res)
                      handleCloseMenu()
                    })
                  }
                >
                  {link.title}
                </a>
              ) : (
                <Link href={link.href} key={link.href}>
                  {link.title}
                </Link>
              ),
            )}
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

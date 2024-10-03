import { UserAvatar } from '@/entities/user'
import { headerLinks } from '@/widgets/header/model/navigation'
import Link from 'next/link'
import { forwardRef, ReactNode } from 'react'

interface MobileNavigationProps {
  handleCloseMenu: () => void
  searchNode?: ReactNode
}

export const MobileNavigation = forwardRef<
  HTMLDivElement,
  MobileNavigationProps
>(({ handleCloseMenu, searchNode }, ref) => {
  return (
    <div
      ref={ref}
      className="absolute  animate-slide-in top-[96px] left-0 w-full bg-primary shadow-md md:hidden"
    >
      <nav className="list-none font-bold p-4 flex flex-col gap-4">
        <div className="border-b-2 flex items-center justify-between border-white/10 pb-4">
          <UserAvatar />
        </div>
        {headerLinks.map((link) => (
          <Link onClick={handleCloseMenu} href={link.href} key={link.title}>
            <li>{link.title}</li>
          </Link>
        ))}

        {searchNode}

        <li className="text-yellow-400">Підписка</li>
      </nav>
    </div>
  )
})

MobileNavigation.displayName = 'MobileNavigation'

import { UserAvatar } from '@/entities/user'
import Link from 'next/link'
import { SearchAnime } from '@/features/anime/search'
import { headerLinks } from '@/widgets/header/model/navigation'

export const HeaderMobileNavigation = () => {
  return (
    <div className="absolute top-[96px] left-0 w-full bg-primary shadow-md md:hidden">
      <nav className="list-none font-bold p-4 flex flex-col gap-4">
        <div className="border-b-2 flex items-center justify-between border-white/10 pb-4">
          <UserAvatar />
        </div>
        {headerLinks.map((link) => (
          <Link href={link.href} key={link.title}>
            <li>{link.title}</li>
          </Link>
        ))}
        <SearchAnime trigger={<li>Пошук</li>} />
        <li className="text-yellow-400">Підписка</li>
      </nav>
    </div>
  )
}

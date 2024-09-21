import Link from 'next/link'
import { headerLinks } from '@/widgets/header/model/navigation'

export const HeaderNavigation = () => {
  return (
    <nav className="hidden md:flex list-none font-bold gap-9">
      {headerLinks.map((link) => (
        <Link href={link.href} key={link.title}>
          <li>{link.title}</li>
        </Link>
      ))}
    </nav>
  )
}

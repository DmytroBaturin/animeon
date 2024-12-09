'use client'

import { PageLayout } from '@/shared/layouts/page'
import { AvatarImage } from '@/screens/user/ui/avatar-image'
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import { User } from '@/shared/api/model'
import Link from 'next/link'
import { routes } from '@/shared/config/routes'

import all from '@/shared/assets/icons/profile/Accept.svg'
import facebook from '@/shared/assets/icons/profile/Facebook.svg'
import favorite from '@/shared/assets/icons/profile/Heart.svg'
import task from '@/shared/assets/icons/profile/Task.svg'
import watched from '@/shared/assets/icons/profile/Eye.svg'
import dropped from '@/shared/assets/icons/profile/Invisible.svg'
import { WithIcon } from '@/shared/components/ui/with-icon'

const navList = [
  { label: 'Усі', href: '/all', icon: all },
  { label: 'Дивлюсь зараз', href: '/watch-now', icon: facebook },
  { label: 'Заплановані', href: '/planned', icon: task },
  { label: 'Переглянуті', href: '/watched', icon: watched },
  { label: 'Улюблені', href: '/favorite', icon: favorite },
  { label: 'Кинуті', href: '/dropped', icon: dropped },
]

export const UserPage = ({ children, user }: { children; user?: User }) => {
  return (
    <PageLayout classname="p-[40px]">
      <div className="flex sm:flex-nowrap flex-wrap justify-between gap-4">
        <Card className="max-w-full sm:max-w-[300px] sm:w-[30%] w-full min-w-[256px]  overflow-hidden p-0">
          <CardHeader className="p-0 border-b-2 border-blue-400 top-0 mt-0">
            <AvatarImage src={user.avatar} />
            <div className="flex flex-col gap-2 p-6">
              <Link
                href={routes.profile}
                className="cursor-pointer hover:underline"
              >
                <h3 className="font-bold text-2xl">{user?.username}</h3>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <nav className="flex list-none font-bold  flex-col pt-6 gap-2">
              {navList.map((item) => (
                <WithIcon icon={item.icon} key={item.href}>
                  <Link
                    href={`${routes.profile}/${item.href}`}
                    className="cursor-pointer hover:underline"
                  >
                    {item.label}
                  </Link>
                </WithIcon>
              ))}
            </nav>
          </CardContent>
        </Card>
        {children}
      </div>
    </PageLayout>
  )
}

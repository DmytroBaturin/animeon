import { Skeleton } from '@/shared/components/ui/skeleton'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { Button } from '@/shared/components/ui/button'
import { WithIcon } from '@/shared/components/ui/with-icon'
import { Card, CardContent } from '@/shared/components/ui/card'
import Image from 'next/image'

import analyticsIco from '@/shared/assets/icons/release/Analytics.svg'
import calendarIco from '@/shared/assets/icons/release/Calendar.svg'
import booksIco from '@/shared/assets/icons/release/Books.svg'
import headsetIco from '@/shared/assets/icons/release/Headset.svg'
import japanIco from '@/shared/assets/icons/release/Japan.svg'
import dossierIco from '@/shared/assets/icons/release/Dossier.svg'
import meetingIco from '@/shared/assets/icons/release/Meeting.svg'
import numbersIco from '@/shared/assets/icons/release/Numbers.svg'

const stats = [
  { icon: analyticsIco, text: 'Статус', key: 'status' },
  { icon: booksIco, text: 'Жанр', key: 'genres' },
  { icon: japanIco, text: 'Країна', key: 'country' },
  { icon: dossierIco, text: 'Режисер', key: 'director' },
  { icon: numbersIco, text: 'Епізоди', key: 'count_episodes' },
  { icon: calendarIco, text: 'Випуск', key: 'start_date' },
  { icon: meetingIco, text: 'Студія', key: 'studio' },
  { icon: headsetIco, text: 'Озвучення', key: 'voiceovers' },
] as { icon: string; text: string; key: keyof unknown }[]

export const ReleaseDetails = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-around gap-[42px] w-full">
      <div className="w-full lg:w-fit flex-col gap-3 items-center flex">
        <Skeleton className="h-[420px] w-[297px] bg-gray-300" />
        <Popover>
          <PopoverTrigger asChild>
            <Button>
              <WithIcon icon={<span>+</span>} classname="w-full">
                Додати в список
              </WithIcon>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="bg-gradient-secondary shadow-none w-[220px] backdrop-blur-sm border-none">
            <nav className="list-none font-bold flex flex-col gap-2">
              <li>Список</li>
              <li>Список</li>
              <li>Список</li>
              <li className="border-t-[1px] text-red-500 p-1 border-white/20">
                Видалити
              </li>
            </nav>
          </PopoverContent>
        </Popover>
      </div>
      <div className="w-full ">
        <div className="border-b-[1px] flex flex-col gap-2 border-white">
          <h1 className="font-bold text-4xl">Naruto</h1>
          <p>Description</p>
        </div>
        <div />
      </div>
      <Card className="w-full bg-gradient-secondary backdrop-blur-sm">
        <CardContent className="p-4 flex flex-col gap-4">
          {stats.map((stat) => (
            <span key={stat.text}>
              <WithIcon
                icon={<Image alt={stat.text} src={stat.icon} />}
                classname="w-full"
              >
                {stat.text}
              </WithIcon>
            </span>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

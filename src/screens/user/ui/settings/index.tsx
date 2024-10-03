import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog'
import Image from 'next/image'
import settingsIco from '@/shared/assets/icons/settings.svg'
import { DialogBody } from 'next/dist/client/components/react-dev-overlay/internal/components/Dialog'
import { UserAvatar } from '@/entities/user'
import { Button } from '@/shared/components/ui/button'

export const UserSettings = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image className="ml-auto p-2" src={settingsIco} alt="settings" />
      </DialogTrigger>
      <DialogContent className="w-[100%] border border-white/20 bg-muted md:top-[30%] h-[40%] md:h-fit md:w-[60%]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Налаштування</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <section className="flex flex-col gap-3">
            <h2 className="text-lg font-bold">Про себе</h2>
            <div className="flex gap-3 items-center">
              <h4 className="font-bold">Аватар</h4>
              <div>
                <UserAvatar />
              </div>
            </div>
            <Button>Змінити аватар...</Button>
          </section>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}

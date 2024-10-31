import Image from 'next/image'
import settingsIco from '@/shared/assets/icons/settings.svg'
import { UserAvatar } from '@/entities/user'
import { Button } from '@/shared/components/ui/button'
import Credenza, {
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/shared/components/ui/credenza'

export const UserSettings = () => {
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Image className="ml-auto p-2" src={settingsIco} alt="settings" />
      </CredenzaTrigger>
      <CredenzaContent className="w-[100%] border border-white/20 bg-muted md:top-[30%] h-[40%] md:h-fit md:w-[60%]">
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Налаштування</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody>
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
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}

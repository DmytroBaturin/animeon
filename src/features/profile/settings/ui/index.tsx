'use client'

import Image from 'next/image'
import settingsIco from '@/shared/assets/icons/settings.svg'
import {
  Credenza,
  CredenzaBody,
  CredenzaContent,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from '@/shared/components/ui/credenza'
import ReactImageUploading from 'react-images-uploading'
import { useState } from 'react'
import { Button } from '@/shared/components/ui/button'
import { UserAvatar } from '@/entities/user'
import { userSettingsCreate } from '@/shared/api/user/user'
import { useRouter } from 'next/navigation'
import { useSession } from '@/entities/session/model/model'
import { Input } from '@/shared/components/ui/input'
import { logout } from '@/entities/session'

export const UserSettings = () => {
  const { token } = useSession()
  const router = useRouter()
  const [images, setImages] = useState([])
  const maxNumber = 1

  const onChange = (imageList) => {
    setImages(imageList)
  }

  const handleSave = () => {
    userSettingsCreate(
      { avatar: images[0].file },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ).then(() => {
      router.refresh()
      console.log('saved')
    })
  }
  return (
    <Credenza>
      <CredenzaTrigger asChild>
        <Image className="ml-auto p-2" src={settingsIco} alt="settings" />
      </CredenzaTrigger>
      <CredenzaContent className="w-[100%] border border-white/20 bg-muted md:top-[30%] h-[70%] md:h-fit md:w-[60%]">
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl">Налаштування</CredenzaTitle>
        </CredenzaHeader>
        <CredenzaBody className="h-full">
          <section className="flex flex-col h-full justify-between gap-3 py-2">
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-bold">Про себе</h2>
              <div className="flex gap-3 items-center">
                <h4 className="font-bold">Аватар</h4>
                <div>
                  {images.length > 0 ? (
                    <Image
                      className="w-9 h-9 rounded-full"
                      width={60}
                      height={60}
                      src={images[0].data_url}
                      alt="dsa"
                    />
                  ) : (
                    <UserAvatar />
                  )}
                </div>
              </div>
              <ReactImageUploading
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
              >
                {({ onImageUpload, onImageUpdate, dragProps }) => (
                  <div>
                    {images.length > 0 ? (
                      <Button {...dragProps} onClick={onImageUpdate}>
                        Змінити попереднє фото
                      </Button>
                    ) : (
                      <Button
                        className="flex w-fit"
                        onClick={onImageUpload}
                        {...dragProps}
                      >
                        <p className="text-wrap break-all">
                          Перетягніть або натисніть, щоб завантажити
                        </p>
                      </Button>
                    )}
                  </div>
                )}
              </ReactImageUploading>
              <div className="flex sm:flex-row flex-col w-full gap-2">
                <Input label="Псевдонім" placeholder="Введіть псевдонім" />
                <Input
                  label="Новий пароль"
                  placeholder="Введіть новий пароль"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button onClick={handleSave}>Зберегти</Button>
              <Button
                onClick={() => {
                  logout().then(() => {
                    router.refresh()
                  })
                }}
              >
                Вийти з профілю
              </Button>
            </div>
          </section>
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}

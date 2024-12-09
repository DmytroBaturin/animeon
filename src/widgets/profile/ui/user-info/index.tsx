'use client'

import { UserSettings } from '@/features/profile/settings'
import { useUser } from '@/entities/user/model'

export const UserProfileInfo = () => {
  const { user } = useUser()
  return (
    <div className="sm:w-[75%] gap-3  items-center flex flex-col w-full">
      <div className="bg-userwallpaper bg-cover w-full h-[250px] rounded-[10px]">
        <UserSettings />
      </div>
      <div className="flex w-[75%] lg:justify-between justify-center flex-wrap items-center gap-3">
        <div>
          <h4 className="font-bold">Всього аніме переглянуто</h4>
          <div
            id="label"
            className="bg-blue-500 relative overflow-hidden h-[120px] justify-center flex items-center w-[300px] rounded-[10px]"
          >
            <h3 className="font-bold z-10 text-4xl">
              {user.count_viewed_anime}
            </h3>
          </div>
        </div>
        <div>
          <h4 className="font-bold">Кількість коментарів</h4>
          <div
            id="label"
            className="bg-blue-500 relative overflow-hidden h-[120px] justify-center flex items-center w-[300px] rounded-[10px]"
          >
            <h3 className="font-bold z-10 text-4xl">
              {user.count_commented_anime}
            </h3>
          </div>
        </div>
      </div>
    </div>
  )
}

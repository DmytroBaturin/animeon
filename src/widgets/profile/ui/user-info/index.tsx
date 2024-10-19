import { UserSettings } from '@/screens/user/ui/settings'

export const UserProfileInfo = () => {
  return (
    <div className="sm:w-[75%] gap-3  items-center flex flex-col w-full">
      <div className="bg-userwallpaper bg-cover w-full h-[250px] rounded-[10px]">
        <UserSettings />
      </div>
      <div className="flex w-[75%] justify-between flex-wrap items-center gap-3">
        <div>
          <h4 className="font-bold">Всього аніме переглянуто</h4>
          <div
            id="label"
            className="bg-blue-500 h-[120px] w-[300px] rounded-[10px]"
          />
        </div>
        <div>
          <h4 className="font-bold">Кількість коментарів</h4>
          <div
            id="label"
            className="bg-blue-500 h-[120px] w-[300px] rounded-[10px]"
          />
        </div>
      </div>
    </div>
  )
}

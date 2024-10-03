import { PageLayout } from '@/shared/layouts/page'
import { AvatarImage } from '@/screens/user/ui/avatar-image'
import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import { UserSettings } from '@/screens/user/ui/settings'

export const UserPage = () => {
  return (
    <PageLayout>
      <div className="flex sm:flex-nowrap flex-wrap justify-between gap-1">
        <Card className="max-w-full sm:max-w-[300px] sm:w-[30%] w-full min-w-[256px]  overflow-hidden p-0">
          <CardHeader className="p-0 border-b-2 border-blue-400 top-0 mt-0">
            <AvatarImage />
            <div className="flex flex-col gap-2 p-6">
              <h3 className="font-bold text-2xl">Username</h3>
            </div>
          </CardHeader>
          <CardContent>
            <nav className="flex list-none flex-col pt-6 gap-2">
              <li>Друзі</li>
              <li>Підписки</li>
              <li>Коментарі</li>
              <li>Скарги</li>
              <li>Досягення</li>
            </nav>
          </CardContent>
        </Card>
        <div className="sm:w-[75%] gap-3 px-2 items-center flex flex-col w-full">
          <div className="bg-blue-500 w-full h-[250px] rounded-[10px]">
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
      </div>
    </PageLayout>
  )
}

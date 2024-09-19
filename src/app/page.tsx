import { HomePage, HomePageList, HomeTabList } from '@/screens/home'

export default async function Page({
  searchParams,
}: {
  searchParams: { tab: string }
}) {
  const tabs = [
    { label: 'Останні релізи', value: 'last' },
    { label: 'Фільми', value: 'films' },
    { label: 'Популярні', value: 'popular' },
  ]
  return (
    <HomePage
      serverList={<HomePageList tab={searchParams.tab || 'last'} />}
      activeTab={searchParams.tab}
      tablist={<HomeTabList tabs={tabs} />}
    />
  )
}

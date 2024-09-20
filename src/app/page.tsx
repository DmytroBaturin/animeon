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
  const activeTab = searchParams.tab || 'last'
  return (
    <HomePage
      serverList={<HomePageList tab={activeTab} />}
      activeTab={activeTab}
      tablist={<HomeTabList tabs={tabs} />}
    />
  )
}

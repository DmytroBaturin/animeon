import { UserAvatar } from '@/entities/user'

export const ReleaseTeams = () => {
  return (
    <div className="flex-col flex gap-3">
      <div className="flex items-center gap-3">
        <UserAvatar />
        <h3 className="font-bold text-lg">Team 1</h3>
      </div>
      <div className="flex items-center gap-3">
        <UserAvatar />
        <h3 className="font-bold text-lg">Team 1</h3>
      </div>
      <div className="flex items-center gap-3">
        <UserAvatar />
        <h3 className="font-bold text-lg">Team 1</h3>
      </div>
    </div>
  )
}

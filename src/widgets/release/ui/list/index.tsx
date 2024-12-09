'use client'

import { userAddAnime } from '@/shared/api/user/user'
import { useSession } from '@/entities/session/model/model'
import { useAuthStore } from '@/entities/session/model'

export const ListToAdd = ({ id }: { id?: number }) => {
  const { token, isAuthenticated } = useSession()
  const { openDialog } = useAuthStore()
  return isAuthenticated ? (
    <nav className="list-none font-bold flex flex-col gap-2">
      <li
        className=" hover:underline"
        onClick={() => {
          userAddAnime(
            {
              anime: id!,
              action: 'PLANNED',
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
        }}
      >
        Заплановані
      </li>
      <li
        className=" hover:underline"
        onClick={() => {
          userAddAnime(
            {
              anime: id!,
              action: 'WATCHING',
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
        }}
      >
        Переглянуті
      </li>
      <li
        className=" hover:underline"
        onClick={() => {
          userAddAnime(
            {
              anime: id!,
              action: 'FAVORITE',
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
        }}
      >
        Улюблені
      </li>
      <li
        className=" hover:underline"
        onClick={() => {
          userAddAnime(
            {
              anime: id!,
              action: 'DROPPED',
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
        }}
      >
        Кинуті
      </li>
    </nav>
  ) : (
    <span onClick={openDialog} className="text-white underline">
      Авторизуватись
    </span>
  )
}

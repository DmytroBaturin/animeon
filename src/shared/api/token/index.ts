'use server'

import { cookies } from 'next/headers'

export async function setAccessCookie({
  access,
  refresh,
}: {
  refresh: string
  access: string
}) {
  cookies().set({
    name: 'refresh',
    value: refresh,
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'none',
  })
  cookies().set({
    name: 'access',
    value: access,
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'none',
  })
}

export async function isAccessCookieValid() {
  return cookies().get('access')
}

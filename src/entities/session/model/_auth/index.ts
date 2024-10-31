'use server'

import { cookies } from 'next/headers'

import { userRead } from '@/shared/api/user/user'

async function getSessionData(): Promise<string | false> {
  const encryptedSessionData = cookies().get('session')?.value
  if (!encryptedSessionData) return ''

  try {
    const res = await userRead({
      headers: {
        Authorization: `Bearer ${encryptedSessionData}`,
      },
    })
    console.log(res)
    if (res.status === 401 || res.status === 500 || !res.data) {
      return ''
    }
    return encryptedSessionData
  } catch (error: any) {
    if (error.response?.status === 401) {
      return ''
    }
    throw error
  }
}

export async function checkSession(): Promise<string> {
  const sessionData = await getSessionData()
  return sessionData || ''
}

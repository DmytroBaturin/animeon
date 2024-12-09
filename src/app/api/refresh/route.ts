import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { authTokenRefreshCreate } from '@/shared/api/auth/auth'

export async function POST() {
  const refreshToken = cookies().get('refresh')?.value

  const data = await authTokenRefreshCreate(
    {
      refresh: refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    },
  )

  return NextResponse.json(data)
}

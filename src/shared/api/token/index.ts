'use server'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECURE_CODE || 'test-secret-key'

export async function verifyToken(token: string): Promise<boolean> {
  try {
    jwt.verify(token, SECRET_KEY, { algorithms: ['HS256'] })
    return true
  } catch {
    return false
  }
}

export async function validateAccessCookie(token: string): Promise<boolean> {
  try {
    const isValid = await verifyToken(token)
    return isValid
  } catch {
    return false
  }
}

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
    name: 'accessToken',
    value: access,
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'none',
  })
}

export const checkAuth = async () => {
  const cookieStore = cookies()
  const accessCookie = cookieStore.get('accessToken')
  if (!accessCookie) {
    return false
  }

  const isValid = await validateAccessCookie(accessCookie.value)
  return isValid
}

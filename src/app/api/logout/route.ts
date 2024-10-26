import { NextResponse } from 'next/server'
import { logout } from '@/entities/session'

export async function POST() {
  await logout()
  console.log('Logged out')
  return NextResponse.json({ message: 'Logged out successfully' })
}

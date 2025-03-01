import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  cookies().set({
    name: 'token',
    value: '',
    expires: new Date(0),
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  })

  return NextResponse.json({ message: 'Logged out' }, { status: 200 })
}

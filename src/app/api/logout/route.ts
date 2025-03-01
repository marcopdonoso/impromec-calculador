import { deleteCookie } from 'cookies-next'
import { NextResponse } from 'next/server'

export async function GET(req: any, res: any) {
  deleteCookie('token', { req, res, path: '/', sameSite: 'strict' })

  return NextResponse.json({ message: 'Logged out' }, { status: 200 })
}

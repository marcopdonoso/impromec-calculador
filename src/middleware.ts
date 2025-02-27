import { NextRequest, NextResponse } from 'next/server'
import { authLinks } from './constants/links.constants'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL(authLinks.login.path, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

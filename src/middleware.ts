import { NextRequest, NextResponse } from 'next/server'
import { appLinks, authLinks } from './constants/links.constants'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const path = request.nextUrl.pathname

  // Si el usuario NO tiene token y NO está en /auth/**, redirigir al login
  if (!token && !path.startsWith('/auth')) {
    return NextResponse.redirect(new URL(authLinks.login.path, request.url))
  }

  // Si el usuario tiene token y está en /auth/**, redirigir a home
  if (token && path.startsWith('/auth')) {
    return NextResponse.redirect(new URL(appLinks.home.path, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
}

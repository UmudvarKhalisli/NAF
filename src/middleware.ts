import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/admin-auth'

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginPage = pathname === '/admin/login'
  
  // Pathname-i header kimi ötürürük (Layout-da yoxlamaq üçün)
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-pathname', pathname)

  if (isAdminRoute) {
    if (pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
    
    if (!isLoginPage) {
      const token = req.cookies.get('admin_token')?.value
      if (!token || !(await verifyAdminToken(token))) {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
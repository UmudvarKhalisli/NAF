import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/admin-auth'

export async function middleware(req: NextRequest) {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin')
  const isLoginPage = req.nextUrl.pathname === '/admin/login'
  
  if (isAdminRoute) {
    if (req.nextUrl.pathname === '/admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', req.url))
    }
    
    if (!isLoginPage) {
      const token = req.cookies.get('admin_token')?.value
      if (!token || !(await verifyAdminToken(token))) {
        return NextResponse.redirect(new URL('/admin/login', req.url))
      }
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
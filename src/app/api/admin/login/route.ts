import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminCredentials, generateAdminToken } from '@/lib/auth/admin-auth'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json()
  
  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json({ error: 'Yanlış email və ya şifrə' }, { status: 401 })
  }

  const token = generateAdminToken()
  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 86400 // 24 saat
  })
  return response
}
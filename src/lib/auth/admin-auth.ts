import { jwtVerify, SignJWT } from 'jose'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'naf-super-secret-key-1234567890!'
const JWT_SECRET_ENC = new TextEncoder().encode(JWT_SECRET)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@naftexnika.az'

// 'sifre123' üçün laboratoriya tərəfindən doğrulanmış sabit hash
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$12$vwdksWakNH/.RXkQuSStN.qEaN.ovaNmqUl2VplQ63jtaIexzQxY2'

export function verifyAdminCredentials(email: string, password: string): boolean {
  if (email !== ADMIN_EMAIL) return false
  return bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)
}

export async function generateAdminToken(): Promise<string> {
  return await new SignJWT({ role: 'admin', email: ADMIN_EMAIL })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET_ENC)
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_ENC)
    return payload.role === 'admin'
  } catch {
    return false
  }
}
import { jwtVerify, SignJWT } from 'jose'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'naf-super-secret-key-1234567890!'
const JWT_SECRET_ENC = new TextEncoder().encode(JWT_SECRET)
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'info@naftikinti.az'

// 'Naftexnika7766' parolu üçün bcrypt hash
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2b$12$fqif.8ybe8KYEhyIK6Ei9uxif0dtrcj2vvTBZyc40ysm.NLxTAuKy'

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
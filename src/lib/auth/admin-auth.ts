import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'naf-super-secret-key-1234567890!'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@naf-construction.az'
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || bcrypt.hashSync('sifre123', 12)

export function verifyAdminCredentials(email: string, password: string): boolean {
  if (email !== ADMIN_EMAIL) return false
  return bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)
}

export function generateAdminToken(): string {
  return jwt.sign({ role: 'admin', email: ADMIN_EMAIL }, JWT_SECRET, { expiresIn: '24h' })
}

export function verifyAdminToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded.role === 'admin'
  } catch {
    return false
  }
}
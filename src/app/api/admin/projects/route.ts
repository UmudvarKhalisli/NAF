import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/admin-auth'
import { supabaseAdmin } from '@/lib/supabase/client'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !(await verifyAdminToken(token))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { data, error } = await supabaseAdmin.from('projects').select('*').order('is_featured', { ascending: false }).order('sort_order', { ascending: true }).order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !(await verifyAdminToken(token))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { data, error } = await supabaseAdmin.from('projects').insert([body]).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  
  // Revalidate for instant updates
  const { revalidatePath } = await import('next/cache');
  revalidatePath('/');
  revalidatePath('/layiheler');
  
  return NextResponse.json(data[0])
}
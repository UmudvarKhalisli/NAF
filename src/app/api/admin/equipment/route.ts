import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/client'
import { verifyAdminToken } from '@/lib/auth/admin-auth'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const status = searchParams.get('status')
  
  let query = supabaseAdmin.from('equipment').select('*').order('sort_order', { ascending: true }).order('created_at', { ascending: false })
  
  if (category) query = query.eq('category', category)
  if (status) query = query.eq('status', status)
  
  const { data, error } = await query
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { data, error } = await supabaseAdmin.from('equipment').insert([body]).select()
  
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  
  // Revalidate public pages
  const { revalidatePath } = await import('next/cache');
  revalidatePath('/');
  revalidatePath('/texnikalar');
  
  return NextResponse.json(data[0])
}
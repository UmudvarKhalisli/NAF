import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/client'
import { verifyAdminToken } from '@/lib/auth/admin-auth'

export async function GET(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { data, error } = await supabaseAdmin
    .from('site_settings')
    .select('*')
    .eq('id', 'main')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { site_name, contact_email, contact_phone, address, maintenance_mode, about_us_text, featured_equipment_id } = body

  const { data, error } = await supabaseAdmin
    .from('site_settings')
    .update({ 
      site_name, 
      contact_email, 
      contact_phone, 
      address, 
      maintenance_mode,
      about_us_text,
      featured_equipment_id,
      updated_at: new Date().toISOString()
    })
    .eq('id', 'main')
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Revalidate public pages for instant updates
  const { revalidatePath } = await import('next/cache');
  revalidatePath('/');
  revalidatePath('/about');
  revalidatePath('/contact');

  return NextResponse.json(data[0])
}

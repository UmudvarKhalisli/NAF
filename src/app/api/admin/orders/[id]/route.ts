import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/auth/admin-auth'
import { supabaseAdmin } from '@/lib/supabase/client'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !verifyAdminToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const { data, error } = await supabaseAdmin.from('orders').update(body).eq('id', params.id).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0])
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get('admin_token')?.value
  if (!token || !verifyAdminToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { error } = await supabaseAdmin.from('orders').delete().eq('id', params.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
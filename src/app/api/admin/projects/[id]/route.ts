import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/client'
import { verifyAdminToken } from '@/lib/auth/admin-auth'

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  const token = req.cookies.get('admin_token')?.value;
  if (!token || !(await verifyAdminToken(token))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { data, error } = await supabaseAdmin.from('projects').update(body).eq('id', p.id).select();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  // Revalidate for instant updates
  const { revalidatePath } = await import('next/cache');
  revalidatePath('/');
  revalidatePath('/layiheler');
  
  return NextResponse.json(data[0]);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const p = await params;
  const token = req.cookies.get('admin_token')?.value;
  if (!token || !(await verifyAdminToken(token))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { error } = await supabaseAdmin.from('projects').delete().eq('id', p.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  
  // Revalidate for instant updates
  const { revalidatePath } = await import('next/cache');
  revalidatePath('/');
  revalidatePath('/layiheler');
  
  return NextResponse.json({ success: true });
}


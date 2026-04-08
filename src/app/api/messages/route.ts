import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/client'
import { sendAdminNotification } from '@/lib/mail'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, phone, equipment, message } = body

    // 1. Supabase-ə yaz
    const { data, error } = await supabaseAdmin
      .from('messages')
      .insert([
        { name, phone, equipment, message, status: 'new' }
      ])
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Müraciət qeyd edilərkən xəta baş verdi' }, { status: 500 })
    }

    // 2. Email bildirişi göndər (Xəta olsa belə bazaya yazıldığı üçün uğurlu cavab qaytarırıq)
    try {
      await sendAdminNotification({ name, phone, equipment, message })
    } catch (emailError) {
      console.error('Email notification failed but DB is saved:', emailError)
    }

    return NextResponse.json({ success: true, data: data[0] })
  } catch (error) {
    return NextResponse.json({ error: 'Sistem xətası' }, { status: 500 })
  }
}

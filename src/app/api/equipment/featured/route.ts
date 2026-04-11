import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // 1. Get featured ID from site_settings
    const { data: settings, error: settingsError } = await supabase
      .from('site_settings')
      .select('featured_equipment_id')
      .eq('id', 'main')
      .single()

    if (settingsError || !settings?.featured_equipment_id) {
      return NextResponse.json({ error: 'No featured equipment set' }, { status: 404 })
    }

    // 2. Get equipment details
    const { data: equipment, error: equipError } = await supabase
      .from('equipment')
      .select('*')
      .eq('id', settings.featured_equipment_id)
      .single()

    if (equipError) {
      return NextResponse.json({ error: equipError.message }, { status: 500 })
    }

    return NextResponse.json(equipment)
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

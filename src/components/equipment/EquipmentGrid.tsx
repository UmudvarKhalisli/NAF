import React from 'react';
import { supabase } from '@/lib/supabase';
import EquipmentCard, { EquipmentItem } from './EquipmentCard';

interface EquipmentGridProps {
  limit?: number;
  featuredOnly?: boolean;
}

export const DUMMY_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'dummy-1',
    name: 'Caterpillar 320D Ekskavator',
    category: 'Ekskavatorlar',
    price: 350,
    price_unit: 'günlük',
    status: 'available',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: { "Çəki": "20 ton", "Güc": "162 a.g." },
    image_url: 'https://images.unsplash.com/photo-1580901368919-7738efb0f228?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dummy-2',
    name: 'JCB 3CX Buldozer',
    category: 'Buldozerlər',
    price: 450,
    price_unit: 'günlük',
    status: 'available',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: { "Çəki": "8 ton", "Güc": "92 a.g." },
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dummy-3',
    name: 'Liebherr LTM 1100 Kran',
    category: 'Kranlar',
    price: 550,
    price_unit: 'günlük',
    status: 'available',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: { "Qaldırma": "100 ton", "Boom": "60 m" },
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dummy-4',
    name: 'Volvo FMX 8x4 Yük Maşını',
    category: 'Yük Maşınları',
    price: 250,
    price_unit: 'günlük',
    status: 'available',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: { "Yük tutumu": "25 ton", "Həcm": "16 m³" },
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dummy-5',
    name: 'Putzmeister BSF 36 Nasos',
    category: 'Beton Nasosları',
    price: 600,
    price_unit: 'günlük',
    status: 'rented',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: { "Boom": "36 m", "Məhsuldarlıq": "160 m³/saat" },
    image_url: 'https://images.unsplash.com/photo-1621922688758-8d99323bf596?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dummy-6',
    name: 'Cat C15 Generator',
    category: 'Generatorlar',
    price: 200,
    price_unit: 'günlük',
    status: 'available',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: { "Güc": "400 kVA", "Gərginlik": "400V" },
    image_url: 'https://images.unsplash.com/photo-1590846083693-f23fdede3a7e?q=80&w=800&auto=format&fit=crop'
  },
];

export default async function EquipmentGrid({ limit, featuredOnly }: EquipmentGridProps) {
  let query = supabase.from('equipment').select('*');

  if (featuredOnly) {
    query = query.eq('is_featured', true);
  }
  if (limit) {
    query = query.limit(limit);
  }

  const { data: equipment, error } = await query.order('created_at', { ascending: false });

  let finalEq = equipment as EquipmentItem[] | null;

  if (!finalEq || finalEq.length === 0 || error) {
    finalEq = DUMMY_EQUIPMENT.slice(0, limit || 6);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {finalEq.map((item, idx) => (
        <EquipmentCard key={item.id} equipment={item} idx={idx} />
      ))}
    </div>
  );
}

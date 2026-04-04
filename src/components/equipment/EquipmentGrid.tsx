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
    name: 'Cat 320 Ekskavator',
    category: 'Ekskavatorlar',
    price: 350,
    price_unit: 'saatlıq',
    status: 'available',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: { "Çəki": "20 ton", "Güc": "162 a.g." },
    image_url: '/machines/excavator.png'
  },
  {
    id: 'dummy-2',
    name: 'Liebherr LTM 1100',
    category: 'Kranlar',
    price: 800,
    price_unit: 'saatlıq',
    status: 'available',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: { "Qaldırma": "100 ton", "Boom": "60 m" },
    image_url: '/machines/crane.png'
  },
  {
    id: 'dummy-3',
    name: 'Komatsu D65EX',
    category: 'Buldozerlər',
    price: 400,
    price_unit: 'saatlıq',
    status: 'available',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: { "Çəki": "20.5 ton", "Tutum": "5.4 m³" },
    image_url: '/machines/bulldozer.png'
  },
  {
    id: 'dummy-4',
    name: 'Volvo FMX 8x4',
    category: 'Yük Maşınları',
    price: 250,
    price_unit: 'saatlıq',
    status: 'rented',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: { "Yük": "25 ton", "Həcm": "16 m³" },
    image_url: '/machines/truck.png'
  },
  {
    id: 'dummy-5',
    name: 'Putzmeister BSF 36',
    category: 'Beton Nasosları',
    price: 600,
    price_unit: 'saatlıq',
    status: 'available',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: { "Boom": "36 m", "Məhsul": "160 m³/s" },
    image_url: '/machines/pump.png'
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
    image_url: '/machines/generator.png'
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
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
      {finalEq.map((item, idx) => (
        <EquipmentCard key={item.id} equipment={item} idx={idx} />
      ))}
    </div>
  );
}

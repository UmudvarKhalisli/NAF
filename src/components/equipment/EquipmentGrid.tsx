import React from 'react';
import { supabase } from '@/lib/supabase';
import EquipmentCard, { EquipmentItem } from './EquipmentCard';

interface EquipmentGridProps {
  limit?: number;
  featuredOnly?: boolean;
}

const DUMMY_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'dummy-1',
    name: 'Caterpillar 320D Ekskavator',
    category: 'Ekskavatorlar',
    price: 350,
    price_unit: 'günlük',
    status: 'available',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: {},
    image_url: 'https://images.unsplash.com/photo-1579848529243-7f28c2e64a13?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dummy-2',
    name: 'JCB D10T Buldozer',
    category: 'Buldozerlər',
    price: 450,
    price_unit: 'günlük',
    status: 'available',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: {},
    image_url: 'https://images.unsplash.com/photo-1498409765371-8bc91db9df84?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'dummy-3',
    name: 'Volvo 420 Kran',
    category: 'Kranlar',
    price: 550,
    price_unit: 'günlük',
    status: 'rented',
    is_featured: true,
    created_at: new Date().toISOString(),
    specs: {},
    image_url: 'https://images.unsplash.com/photo-1581094651181-35942459ef62?q=80&w=800&auto=format&fit=crop'
  }
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
    finalEq = DUMMY_EQUIPMENT.slice(0, limit || 3);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {finalEq.map((item, idx) => (
        <EquipmentCard key={item.id} equipment={item} idx={idx} />
      ))}
    </div>
  );
}

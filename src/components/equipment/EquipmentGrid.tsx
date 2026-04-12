import React from 'react';
import { supabase } from '@/lib/supabase';
import EquipmentCard, { EquipmentItem } from './EquipmentCard';

interface EquipmentGridProps {
  limit?: number;
  featuredOnly?: boolean;
  category?: string;
}

export default async function EquipmentGrid({ limit, featuredOnly, category }: EquipmentGridProps) {
  let query = supabase.from('equipment').select('*');

  if (featuredOnly) {
    query = query.eq('is_featured', true);
  }
  if (category) {
    query = query.eq('category', category);
  }
  
  // Sort by custom sort_order first, then by date
  query = query.order('sort_order', { ascending: true }).order('created_at', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data: equipment, error } = await query;

  if (error || !equipment || equipment.length === 0) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-black/10 rounded-xl col-span-full">
        <p className="text-black/40 font-bold uppercase tracking-widest text-sm">
          Texnika tapılmadı.
        </p>
      </div>
    );
  }

  const finalEq = equipment as EquipmentItem[];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {finalEq.map((item, idx) => (
        <div key={item.id} className={idx >= 3 ? 'hidden sm:block' : ''}>
          <EquipmentCard equipment={item} idx={idx} />
        </div>
      ))}
    </div>
  );
}

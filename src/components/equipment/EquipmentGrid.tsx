import React from 'react';
import { supabase } from '@/lib/supabase';
import EquipmentCard, { EquipmentItem } from './EquipmentCard';

interface EquipmentGridProps {
  limit?: number;
  featuredOnly?: boolean;
}

export default async function EquipmentGrid({ limit, featuredOnly }: EquipmentGridProps) {
  let query = supabase.from('equipment').select('*');
  
  if (featuredOnly) {
    query = query.eq('is_featured', true);
  }
  
  if (limit) {
    query = query.limit(limit);
  }

  const { data: equipment, error } = await query.order('created_at', { ascending: false });

  if (error || !equipment || equipment.length === 0) {
    return (
      <div className="w-full text-center py-12 text-black/50 uppercase tracking-widest font-bold">
        Heç bir texnika tapılmadı
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {equipment.map((item, idx) => (
        <EquipmentCard key={item.id} equipment={item as EquipmentItem} idx={idx} />
      ))}
    </div>
  );
}
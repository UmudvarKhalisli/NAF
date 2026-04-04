"use client";

import { useState, useMemo } from 'react';
import EquipmentCard, { EquipmentItem } from '@/components/equipment/EquipmentCard';

interface CatalogClientProps {
  initialData: any[];
}

export default function CatalogClient({ initialData }: CatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Hamısı');

  const categories = useMemo(() => {
    const cats = new Set(initialData.map(item => item.category));
    return ['Hamısı', ...Array.from(cats)] as string[];
  }, [initialData]);

  const filteredData = useMemo(() => {
    if (activeCategory === 'Hamısı') return initialData;
    return initialData.filter(item => item.category === activeCategory);
  }, [activeCategory, initialData]);

  return (
    <div>
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 text-[10px] font-black tracking-widest uppercase transition-all whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-black text-white border-black'
                : 'bg-white border-black/10 text-black/60 hover:text-black hover:border-black/30'
            } border`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((item, idx) => (
            <div key={item.id} className="h-full">
              <EquipmentCard equipment={item as EquipmentItem} idx={idx} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-black/10">
          <p className="text-black/40 font-bold uppercase tracking-widest text-sm">
            Bu kateqoriyaya aid texnika tapılmadı.
          </p>
          <button 
            onClick={() => setActiveCategory('Hamısı')}
            className="mt-4 text-[10px] font-black tracking-widest bg-black text-white px-6 py-2 uppercase hover:bg-neutral-800 transition-colors"
          >
            Hamısına bax
          </button>
        </div>
      )}
    </div>
  );
}

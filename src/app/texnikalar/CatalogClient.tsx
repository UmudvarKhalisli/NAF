"use client";

import { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import EquipmentCard, { EquipmentItem } from '@/components/equipment/EquipmentCard';
import FadeIn from '@/components/FadeIn';

interface CatalogClientProps {
  initialData: any[];
}

export default function CatalogClient({ initialData }: CatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Hamısı');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const categories = useMemo(() => {
    const cats = new Set(initialData.map(item => item.category));
    return ['Hamısı', ...Array.from(cats)] as string[];
  }, [initialData]);

  const filteredData = useMemo(() => {
    const filtered = activeCategory === 'Hamısı' 
      ? initialData 
      : initialData.filter(item => item.category === activeCategory);
    return filtered;
  }, [activeCategory, initialData]);

  const hasMore = visibleCount < filteredData.length;

  useEffect(() => {
    setVisibleCount(6); // Reset visible count when category changes
  }, [activeCategory]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div>
      {/* Category Dropdown Filter */}
      <div className="mb-10 flex items-center justify-between gap-4">
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 px-6 py-3 bg-white border border-black/10 rounded-xl hover:border-black/30 transition-all duration-300 min-w-[220px] justify-between"
          >
            <span className="text-sm font-bold text-black">{activeCategory}</span>
            <ChevronDown 
              size={16} 
              className={`text-black/40 transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} 
            />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-full bg-white border border-black/10 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveCategory(cat);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? 'bg-black text-white'
                      : 'text-black/70 hover:bg-neutral-50 hover:text-black'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        <span className="text-[10px] text-black/30 font-bold uppercase tracking-widest hidden sm:block">
          {filteredData.length} texnika mövcuddur
        </span>
      </div>

      {/* Grid */}
      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.map((item, idx) => (
            <FadeIn key={item.id} delay={idx % 4 * 0.05} className="h-full">
              <EquipmentCard equipment={item as EquipmentItem} idx={idx} />
            </FadeIn>
          ))}
        </div>
      ) : (
        <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-black/10 rounded-xl">
          <p className="text-black/40 font-bold uppercase tracking-widest text-sm">
            Bu kateqoriyaya aid texnika tapılmadı.
          </p>
          <button
            onClick={() => setActiveCategory('Hamısı')}
            className="mt-4 text-[10px] font-black tracking-widest bg-black text-white px-6 py-2.5 uppercase hover:bg-neutral-800 transition-colors rounded-lg"
          >
            Hamısına bax
          </button>
        </div>
      )}
    </div>
  );
}

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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredData.slice(0, visibleCount).map((item, idx) => (
              <FadeIn key={item.id} delay={idx % 3 * 0.1} className="h-full">
                <EquipmentCard equipment={item as EquipmentItem} idx={idx} />
              </FadeIn>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-16">
              <button 
                onClick={() => setVisibleCount(prev => prev + 4)}
                className="group relative inline-flex items-center gap-0 overflow-hidden border border-black/10 hover:border-black transition-all duration-500 hover:shadow-lg bg-white"
              >
                <span className="px-10 py-5 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-500 group-hover:px-8">
                  Daha çox göstər
                </span>
                <span className="w-0 group-hover:w-14 overflow-hidden transition-all duration-500 flex items-center justify-center bg-black text-white h-full absolute right-0 top-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m5 12 7 7 7-7"/></svg>
                </span>
                <span className="w-0 group-hover:w-14 transition-all duration-500" />
              </button>
            </div>
          )}
        </>
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

"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';

export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  price: number;
  price_unit: string;
  status: string;
  year?: number;
  image_url?: string;
  video_url?: string;
  specs: any;
  description?: string;
  is_featured: boolean;
  created_at: string;
}

interface EquipmentCardProps {
  equipment: EquipmentItem;
  idx?: number;
}

export default function EquipmentCard({ equipment, idx = 0 }: EquipmentCardProps) {
  const isAvailable = equipment.status === 'available';
  const isDummy = equipment.id.startsWith('dummy');
  
  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.06 }}
      className={`group relative bg-white border border-black/[0.04] transition-all duration-500 overflow-hidden flex flex-col h-full rounded-xl ${
        isAvailable ? 'hover:border-black/10 hover:shadow-lg cursor-pointer' : 'opacity-75'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-50">
        <div className="absolute inset-0 bg-black/[0.03] group-hover:bg-transparent transition-colors duration-500 z-[1]" />
        {equipment.image_url ? (
          <img
            src={equipment.image_url}
            alt={equipment.name}
            className={`w-full h-full object-cover transition-transform duration-700 ${isAvailable ? 'transform group-hover:scale-105' : 'grayscale-[30%]'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black/15 font-bold uppercase tracking-widest text-[9px]">
            Şəkil yoxdur
          </div>
        )}

        {/* Busy overlay */}
        {!isAvailable && (
          <div className="absolute inset-0 bg-black/40 z-[2] flex items-center justify-center">
            <span className="bg-white text-black text-[10px] font-black tracking-[0.2em] uppercase px-4 py-2 rounded-lg">
              Məşğuldur
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-[9px] font-bold tracking-[0.15em] text-black/30 uppercase mb-1">
          {equipment.category}
        </p>
        <h3 className="text-sm font-black text-black leading-tight line-clamp-2 mb-auto">
          {equipment.name}
        </h3>

        <div className="mt-3 pt-3 border-t border-black/[0.04] flex items-center justify-between">
          <span className="text-base font-black text-black">{equipment.price}₼</span>
          <span className="text-[9px] font-bold text-black/25 uppercase">/ {equipment.price_unit}</span>
        </div>

        {isAvailable ? (
          <a
            href={`https://wa.me/994501234567?text=${encodeURIComponent(`Salam, "${equipment.name}" (${equipment.category}) texnikasını ${equipment.price}₼/${equipment.price_unit} qiymətlə sifariş etmək istəyirəm. Ətraflı məlumat verə bilərsinizmi?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="mt-3 w-full py-2.5 bg-black text-white text-[10px] font-black tracking-[0.15em] uppercase text-center rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Sifariş Et
          </a>
        ) : (
          <div className="mt-3 w-full py-2.5 bg-neutral-200 text-neutral-500 text-[10px] font-black tracking-[0.15em] uppercase text-center rounded-lg cursor-not-allowed">
            Hal-hazırda məşğuldur
          </div>
        )}
      </div>
    </motion.div>
  );

  // If busy, don't link anywhere
  if (!isAvailable) {
    return cardContent;
  }

  // All available cards (including dummy) link to detail
  if (isDummy) {
    return cardContent;
  }

  return (
    <Link href={`/texnikalar/${equipment.id}`} className="block h-full">
      {cardContent}
    </Link>
  );
}
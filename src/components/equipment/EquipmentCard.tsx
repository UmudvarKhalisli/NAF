"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const isAvailable = equipment.status === 'available';
  
  const handleCardClick = () => {
    if (isAvailable) {
      router.push(`/texnikalar/${equipment.id}`);
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.06 }}
      onClick={handleCardClick}
      className={`group relative bg-white border border-black/[0.04] transition-all duration-500 overflow-hidden flex flex-col h-full rounded-xl ${
        isAvailable ? 'hover:border-black/10 hover:shadow-lg cursor-pointer' : 'opacity-75'
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-50">
        <div className="absolute inset-0 bg-black/[0.03] group-hover:bg-transparent transition-colors duration-500 z-[1]" />
        {equipment.image_url ? (
          <Image
            src={equipment.image_url}
            alt={equipment.name}
            fill
            className={`object-cover transition-transform duration-700 ${isAvailable ? 'transform group-hover:scale-105' : 'grayscale-[30%]'}`}
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
          <div className="mt-3 flex gap-2">
            <Link
              href={`/texnikalar/${equipment.id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-2.5 border border-black/10 text-black text-[10px] font-black tracking-[0.1em] uppercase text-center rounded-lg hover:border-black hover:bg-black/5 transition-all"
            >
              Ətraflı Bax
            </Link>
            <a
              href={`https://wa.me/994509627766?text=${encodeURIComponent(`Salam, "${equipment.name}" (${equipment.category}) texnikasını ${equipment.price}₼/${equipment.price_unit} qiymətlə sifariş etmək istəyirəm. Ətraflı məlumat verə bilərsinizmi?`)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex-1 py-2.5 bg-black text-white text-[10px] font-black tracking-[0.1em] uppercase text-center rounded-lg hover:bg-neutral-800 transition-colors"
            >
              Sifariş Et
            </a>
          </div>
        ) : (
          <div className="mt-3 w-full py-2.5 bg-neutral-200 text-neutral-500 text-[10px] font-black tracking-[0.15em] uppercase text-center rounded-lg cursor-not-allowed">
            Hal-hazırda məşğuldur
          </div>
        )}
      </div>
    </motion.div>
  );
}
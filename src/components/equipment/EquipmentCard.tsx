"use client";

import Image from 'next/image';
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
  const isRented = equipment.status === 'rented';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: idx * 0.08 }}
      className="group relative bg-white border border-black/5 hover:border-black/20 transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {/* Status Badge */}
      <div className="absolute top-3 right-3 z-10">
        <div className={`px-2.5 py-1 text-[9px] font-black tracking-widest uppercase flex items-center gap-1.5 ${
          isAvailable ? 'bg-black text-white' : 
          isRented ? 'bg-neutral-600 text-white' : 'bg-neutral-400 text-black'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-emerald-400' : isRented ? 'bg-neutral-300' : 'bg-neutral-200'} animate-pulse`} />
          {equipment.status === 'available' ? 'Mövcuddur' : 
           equipment.status === 'rented' ? 'İcarədədir' : 'Texniki Baxış'}
        </div>
      </div>

      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100">
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-[1]" />
        {equipment.image_url ? (
          <Image
            src={equipment.image_url}
            alt={equipment.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black/20 font-bold uppercase tracking-widest text-xs">
            Şəkil yoxdur
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-[9px] font-bold tracking-[0.2em] text-black/40 uppercase mb-1.5">
          {equipment.category}
        </p>
        <h3 className="text-base font-black text-black uppercase tracking-tight line-clamp-2 mb-auto">
          {equipment.name}
        </h3>

        <div className="mt-4 pt-4 border-t border-black/5 flex items-end justify-between">
          <div>
            <p className="text-[9px] font-bold tracking-[0.15em] text-black/40 uppercase mb-1">
              İcarə Qiyməti
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-black">{equipment.price}₼</span>
              <span className="text-xs font-bold text-black/30">/ {equipment.price_unit}</span>
            </div>
          </div>
          
          <Link
            href={`/texnikalar/${equipment.id}`}
            className="px-4 py-2.5 bg-black text-white text-[9px] font-black tracking-widest uppercase hover:bg-neutral-700 transition-colors duration-300"
          >
            Ətraflı
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
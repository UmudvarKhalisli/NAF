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
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: idx * 0.06 }}
      className="group relative bg-white border border-black/[0.04] hover:border-black/10 transition-all duration-500 overflow-hidden flex flex-col h-full hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-50">
        <div className="absolute inset-0 bg-black/[0.03] group-hover:bg-transparent transition-colors duration-500 z-[1]" />
        {equipment.image_url ? (
          <img
            src={equipment.image_url}
            alt={equipment.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black/15 font-bold uppercase tracking-widest text-[9px]">
            Şəkil yoxdur
          </div>
        )}

        {/* Status dot */}
        <div className="absolute top-2 right-2 z-10">
          <div className={`w-2 h-2 rounded-full ${isAvailable ? 'bg-emerald-400' : 'bg-neutral-400'} ring-2 ring-white shadow-sm`} />
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-grow">
        <p className="text-[8px] font-bold tracking-[0.15em] text-black/30 uppercase mb-1">
          {equipment.category}
        </p>
        <h3 className="text-[11px] sm:text-xs font-black text-black leading-tight line-clamp-2 mb-auto">
          {equipment.name}
        </h3>

        <div className="mt-2 pt-2 border-t border-black/[0.04] flex items-center justify-between">
          <span className="text-xs font-black text-black">{equipment.price}₼</span>
          <span className="text-[7px] font-bold text-black/25 uppercase">/ {equipment.price_unit}</span>
        </div>
      </div>
    </motion.div>
  );
}
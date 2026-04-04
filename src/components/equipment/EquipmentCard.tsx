"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- Types ---
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
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className="group relative bg-[#fcfcfc] border border-black/5 hover:border-black/20 transition-all duration-500 overflow-hidden flex flex-col h-full"
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <div className={`px-3 py-1 text-[10px] font-black tracking-widest uppercase flex items-center gap-2 ${
          isAvailable ? 'bg-black text-white' : 
          isRented ? 'bg-red-600 text-white' : 'bg-yellow-500 text-black'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-green-400' : isRented ? 'bg-red-300' : 'bg-yellow-200'} animate-pulse`} />
          {equipment.status === 'available' ? 'MövCudDur' : 
           equipment.status === 'rented' ? 'İcarədədir' : 'Texniki Baxış'}
        </div>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-1" />
        {equipment.image_url ? (
          <Image
            src={equipment.image_url}
            alt={equipment.name}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-black/20 font-bold uppercase tracking-widest text-sm">
            Şəkil yoxdur
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-black/50 uppercase mb-2">
              {equipment.category}
            </p>
            <h3 className="text-xl font-black text-black uppercase tracking-tight line-clamp-2">
              {equipment.name}
            </h3>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-black/5 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-black/50 uppercase mb-1">
              İcarə Qiyməti
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-[#FFBD59]">{equipment.price}₼</span>
              <span className="text-sm font-bold text-black/40">/ {equipment.price_unit}</span>
            </div>
          </div>
          
          <Link
            href={`/texnikalar/${equipment.id}`}
            className="w-12 h-12 bg-black text-white flex items-center justify-center group-hover:bg-[#FFBD59] transition-colors duration-300"
          >
            Sifariş
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
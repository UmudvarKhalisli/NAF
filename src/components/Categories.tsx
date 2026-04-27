"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { 
  HardHat, 
  Construction, 
  Truck, 
  Zap, 
  Droplets, 
  Wind, 
  Layers, 
  ArrowUpSquare,
  ArrowRight
} from "lucide-react";
import FadeIn from "./FadeIn";

const categories = [
  { id: 1, name: "Ekskavatorlar", count: 12, icon: <HardHat size={32} /> },
  { id: 2, name: "Buldozerlər", count: 8, icon: <Construction size={32} /> },
  { id: 3, name: "Kranlar", count: 15, icon: <Wind size={32} /> },
  { id: 4, name: "Beton Nasosları", count: 6, icon: <Droplets size={32} /> },
  { id: 5, name: "Yük Maşınları", count: 20, icon: <Truck size={32} /> },
  { id: 6, name: "Generatorlar", count: 10, icon: <Zap size={32} /> },
  { id: 7, name: "Kompaktorlar", count: 7, icon: <Layers size={32} /> },
  { id: 8, name: "Qaldırıcılar", count: 9, icon: <ArrowUpSquare size={32} /> },
];

export default function Categories() {
  const [active, setActive] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const visibleCategories = showAll ? categories : categories.slice(0, 3);

  return (
    <section 
      id="categories" 
      ref={containerRef}
      className="relative py-32 bg-white border-t border-black/5 overflow-hidden"
    >
      {/* Background Graphic */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center grayscale"
      >
        <Image 
          src="/images/crane-bg.png" 
          alt="NAF Texnika Tikinti Texnikası İcarəsi Bakı" 
          fill
          className="object-cover scale-110"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn className="text-center mb-24">
          <span className="text-[11px] tracking-[0.4em] font-black text-neutral-500 uppercase mb-6 block">
            Texniki Kataloq
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-8">
            Kateqoriyalar
          </h2>
          <div className="w-16 h-[3px] bg-black mx-auto mb-10" />
          <p className="text-lg text-black/60 max-w-2xl mx-auto font-medium">
            Hər növ tikinti sahəsi üçün ixtisaslaşmış 8 əsas texnika kateqoriyası üzrə xidmətinizdəyik.
          </p>
        </FadeIn>

        {/* Desktop: all 8 always visible */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <FadeIn
              key={cat.id}
              delay={index * 0.1}
              className="group"
            >
              <button
                onClick={() => setActive(cat.id)}
                className={`w-full aspect-square p-10 flex flex-col justify-between border transition-all duration-500 text-left relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl ${
                  active === cat.id 
                  ? "bg-black text-white border-black" 
                  : "bg-white text-black border-black/5 hover:border-neutral-500/50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className={`p-4 rounded-xl transition-colors duration-500 ${
                    active === cat.id ? "bg-white/10 text-neutral-400" : "bg-black/5 text-black/40 group-hover:bg-neutral-200 group-hover:text-neutral-700"
                  }`}>
                    {cat.icon}
                  </div>
                  <span className={`text-4xl font-black opacity-10 transition-opacity ${
                    active === cat.id ? "opacity-30" : "group-hover:opacity-20"
                  }`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-xl font-black mb-2 flex items-center gap-2">
                    {cat.name}
                    <ArrowRight size={16} className={`transition-transform duration-500 ${
                      active === cat.id ? "translate-x-1 opacity-100" : "-translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`} />
                  </h3>
                  <div className={`w-8 h-[2px] transition-all duration-500 mb-4 ${
                    active === cat.id ? "bg-neutral-500 w-16" : "bg-black/20 group-hover:bg-neutral-700 group-hover:w-16"
                  }`} />
                  <span className={`text-[11px] tracking-widest font-bold font-sans uppercase transition-colors ${
                    active === cat.id ? "text-white/50" : "text-black/30"
                  }`}>
                    {cat.count} Texnika
                  </span>
                </div>

                {/* Accent line */}
                <div className={`absolute left-0 bottom-0 top-0 w-[4px] transition-all duration-500 ${
                  active === cat.id ? "bg-neutral-700" : "bg-transparent group-hover:bg-neutral-500/30"
                }`} />
              </button>
            </FadeIn>
          ))}
        </div>

        {/* Mobile: show 3 by default, "Hamısına bax" toggles rest */}
        <div className="sm:hidden">
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence mode="wait">
              {visibleCategories.map((cat, index) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <button
                    onClick={() => setActive(cat.id)}
                    className={`w-full p-6 flex items-center gap-4 border transition-all duration-500 text-left relative overflow-hidden rounded-xl ${
                      active === cat.id 
                      ? "bg-black text-white border-black" 
                      : "bg-white text-black border-black/5"
                    }`}
                  >
                    <div className={`p-3 rounded-lg transition-colors duration-500 ${
                      active === cat.id ? "bg-white/10 text-neutral-400" : "bg-black/5 text-black/40"
                    }`}>
                      {cat.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-base font-black">{cat.name}</h3>
                      <span className={`text-[10px] tracking-widest font-bold uppercase ${
                        active === cat.id ? "text-white/50" : "text-black/30"
                      }`}>
                        {cat.count} Texnika
                      </span>
                    </div>
                    <ArrowRight size={16} className={`transition-all duration-300 ${
                      active === cat.id ? "text-white/60" : "text-black/20"
                    }`} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group relative inline-flex items-center gap-0 overflow-hidden border border-black/10 hover:border-black transition-all duration-500 rounded-xl"
            >
              <span className="px-6 py-3 text-[11px] font-black tracking-[0.15em] uppercase transition-all duration-500">
                {showAll ? 'Gizlət' : 'Hamısına Bax'}
              </span>
              <span className="w-10 flex items-center justify-center bg-black text-white h-full py-3 rounded-r-xl">
                <ArrowRight size={14} className={`transition-transform duration-300 ${showAll ? 'rotate-90' : ''}`} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

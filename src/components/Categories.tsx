"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "./FadeIn";

const categories = [
  { id: 1, name: "EKSKAVATORLAR", count: 12 },
  { id: 2, name: "BULDOZERLƏR", count: 8 },
  { id: 3, name: "KRANLAR", count: 15 },
  { id: 4, name: "BETON NASOSLARI", count: 6 },
  { id: 5, name: "YÜK MAŞINLARI", count: 20 },
  { id: 6, name: "GENERATORLAR", count: 10 },
  { id: 7, name: "KOMPAKTORLAR", count: 7 },
  { id: 8, name: "QALDIRICILAR", count: 9 },
];

export default function Categories() {
  const [active, setActive] = useState<number | null>(null);
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section 
      id="categories" 
      ref={containerRef}
      className="relative py-32 bg-white border-t border-black/5 overflow-hidden"
    >
      {/* Background Blueprint */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-[0.06] grayscale brightness-[1.1] pointer-events-none"
      >
        <img 
          src="/images/crane-bg.png" 
          alt="Blueprint" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn className="text-center mb-24">
          <span className="text-[10px] tracking-[0.4em] font-bold text-black/40 uppercase mb-6 block">
            KATALOQ
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-black tracking-tighter text-black mb-8">
            KATEQORİYALAR
          </h2>
          <div className="w-12 h-[1px] bg-black mx-auto mb-8" />
          <p className="text-sm tracking-widest text-black/60 max-w-xl mx-auto uppercase">
            HƏR EHTİYAC ÜÇÜN MÜASİR AVADANLIQLAR
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-black/5">
          {categories.map((cat, index) => (
            <FadeIn
              key={cat.id}
              delay={index * 0.1}
              className="group"
            >
              <button
                onClick={() => setActive(cat.id)}
                className={`w-full aspect-square p-12 flex flex-col justify-between border-r border-b border-black/5 transition-all duration-700 text-left relative overflow-hidden ${
                  active === cat.id ? "bg-black text-white" : "bg-white hover:bg-black/5"
                }`}
              >
                <span className="text-4xl font-serif font-light opacity-20">
                  {String(index + 1).padStart(2, "0")}
                </span>
                
                <div>
                  <h3 className="text-lg font-bold tracking-[0.15em] mb-2">
                    {cat.name}
                  </h3>
                  <div className={`w-6 h-[1px] transition-all duration-500 mb-4 ${
                    active === cat.id ? "bg-white w-12" : "bg-black group-hover:w-12"
                  }`} />
                  <span className={`text-[10px] tracking-widest font-medium uppercase transition-colors ${
                    active === cat.id ? "text-white/60" : "text-black/40"
                  }`}>
                    {cat.count} TEXNİKA
                  </span>
                </div>

                <div className={`absolute bottom-0 left-0 h-[2px] bg-black transition-all duration-700 ${
                  active === cat.id ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </button>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

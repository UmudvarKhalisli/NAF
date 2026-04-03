"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { supabase } from "@/lib/supabase";
import FadeIn from "./FadeIn";

interface EquipmentItem {
  id: string | number;
  name: string;
  category: string;
  image_url?: string;
  image?: string;
  specs: { [key: string]: string };
  price: number | string;
  status?: string;
  available?: boolean;
}

const SAMPLE_EQUIPMENT: EquipmentItem[] = [
  {
    id: 1,
    name: "CAT 320 EKSKAVATOR",
    category: "EKSKAVATORLAR",
    image: "/machines/excavator.png",
    specs: { "Çəki": "20 ton", "Güc": "162 a.g.", "İstehsal ili": "2023" },
    price: "350 AZN/SAAT",
    available: true,
  },
  {
    id: 2,
    name: "LIEBHERR LTM 1100",
    category: "KRANLAR",
    image: "/machines/crane.png",
    specs: { "Maks. qaldırma": "100 ton", "Boom uzunluğu": "60 m", "İstehsal ili": "2022" },
    price: "800 AZN/SAAT",
    available: true,
  },
  {
    id: 3,
    name: "KOMATSU D65EX",
    category: "BULDOZERLƏR",
    image: "/machines/bulldozer.png",
    specs: { "Çəki": "20.5 ton", "Bıçaq tutumu": "5.4 m³", "İstehsal ili": "2023" },
    price: "400 AZN/SAAT",
    available: true,
  },
  {
    id: 4,
    name: "VOLVO FMX 8x4",
    category: "YÜK MAŞINLARI",
    image: "/machines/truck.png",
    specs: { "Yük tutumu": "25 ton", "Həcm": "16 m³", "İstehsal ili": "2024" },
    price: "250 AZN/SAAT",
    available: false,
  },
  {
    id: 5,
    name: "PUTZMEISTER BSF 36",
    category: "BETON NASOSLARI",
    image: "/machines/pump.png",
    specs: { "Boom uzunluğu": "36 m", "Məhsuldarlıq": "160 m³/saat", "İstehsal ili": "2023" },
    price: "600 AZN/SAAT",
    available: true,
  },
  {
    id: 6,
    name: "CAT C15 GENERATOR",
    category: "GENERATORLAR",
    image: "/machines/generator.png",
    specs: { "Güc": "400 kVA", "Gərginlik": "400V", "İstehsal ili": "2024" },
    price: "200 AZN/GÜN",
    available: true,
  },
];

export default function EquipmentCards() {
  const [dbEquipment, setDbEquipment] = useState<EquipmentItem[]>([]);
  const [filter, setFilter] = useState("HAMISI");
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    async function fetchEquipment() {
      try {
        const { data } = await supabase.from("equipment").select("*").order("created_at", { ascending: false });
        if (data && data.length > 0) {
          setDbEquipment(data);
        }
      } catch (e) {
        console.error("Using samples due to error or empty DB");
      }
    }
    fetchEquipment();
  }, []);

  // If DB is empty, use SAMPLE_EQUIPMENT
  const displayList = dbEquipment.length > 0 ? dbEquipment : SAMPLE_EQUIPMENT;

  const categories = ["HAMISI", ...Array.from(new Set(displayList.map((e) => e.category)))];
  
  const filtered = filter === "HAMISI" 
    ? displayList 
    : displayList.filter((e) => e.category === filter);

  return (
    <section ref={sectionRef} id="equipment" className="relative py-32 bg-white overflow-hidden">
      {/* Background Blueprint */}
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]) }}
        className="absolute inset-0 z-0 opacity-[0.06] grayscale brightness-[1.1] pointer-events-none"
      >
        <img 
          src="/images/gears-bg.png" 
          alt="Blueprint Gears" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn className="text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-black uppercase mb-10">
            AVADANLIQLAR
          </h2>

          <div className="w-12 h-[1px] bg-black mx-auto mb-12" />
          
          <div className="flex flex-wrap justify-center gap-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-[11px] tracking-[0.3em] font-bold transition-all p-2 relative group uppercase ${
                  filter === cat ? "text-black" : "text-black/50 hover:text-black"
                }`}
              >
                {cat}
                <span className={`absolute bottom-0 left-0 h-[1px] bg-black transition-all duration-500 ${
                  filter === cat ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filtered.map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.1} direction="up" className="group">
              <div className="relative border border-black/5 overflow-hidden bg-white">
                <div className="relative aspect-[4/3] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000">
                  <img
                    src={item.image_url || item.image || "/machines/excavator.png"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000" />
                  {(item.status === 'Rented' || item.available === false) && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-[10px] tracking-[0.4em] font-black text-black border border-black px-6 py-2">
                        MƏŞĞULDUR
                      </span>
                    </div>
                  )}
                  <div className="absolute top-6 left-6">
                    <span className="bg-black text-white text-[10px] tracking-[0.3em] font-bold px-3 py-1 uppercase">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl font-serif font-bold tracking-tight text-black uppercase">
                      {item.name}
                    </h3>
                    <div className="w-6 h-[1px] bg-black/20 mt-3" />
                  </div>

                  <div className="space-y-4 mb-8">
                    {item.specs && Object.entries(item.specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-center text-[12px] tracking-widest text-black/80 uppercase border-b border-black/[0.03] pb-2">
                        <span>{key}</span>
                        <span className="font-bold text-black">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <span className="text-lg font-bold tracking-tighter text-black uppercase">
                      {typeof item.price === 'number' ? `${item.price} AZN / SAAT` : item.price}
                    </span>
                    <a
                      href={`https://wa.me/994501234567`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-black tracking-[0.3em] uppercase border-b border-black pb-1 hover:border-black/20 transition-all"
                    >
                      SİFARİŞ
                    </a>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

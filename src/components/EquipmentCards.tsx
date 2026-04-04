"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { MessageCircle, ArrowRight, Gauge, Weight, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
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
    name: "Cat 320 Ekskavator",
    category: "Ekskavatorlar",
    image: "/machines/excavator.png",
    specs: { "Çəki": "20 ton", "Güc": "162 a.g.", "İstehsal ili": "2023" },
    price: "350 AZN / Saat",
    available: true,
  },
  {
    id: 2,
    name: "Liebherr LTM 1100",
    category: "Kranlar",
    image: "/machines/crane.png",
    specs: { "Maks. qaldırma": "100 ton", "Boom uzunluğu": "60 m", "İstehsal ili": "2022" },
    price: "800 AZN / Saat",
    available: true,
  },
  {
    id: 3,
    name: "Komatsu D65EX",
    category: "Buldozerlər",
    image: "/machines/bulldozer.png",
    specs: { "Çəki": "20.5 ton", "Bıçaq tutumu": "5.4 m³", "İstehsal ili": "2023" },
    price: "400 AZN / Saat",
    available: true,
  },
  {
    id: 4,
    name: "Volvo FMX 8x4",
    category: "Yük Maşınları",
    image: "/machines/truck.png",
    specs: { "Yük tutumu": "25 ton", "Həcm": "16 m³", "İstehsal ili": "2024" },
    price: "250 AZN / Saat",
    available: false,
  },
  {
    id: 5,
    name: "Putzmeister BSF 36",
    category: "Beton Nasosları",
    image: "/machines/pump.png",
    specs: { "Boom uzunluğu": "36 m", "Məhsuldarlıq": "160 m³/saat", "İstehsal ili": "2023" },
    price: "600 AZN / Saat",
    available: true,
  },
  {
    id: 6,
    name: "Cat C15 Generator",
    category: "Generatorlar",
    image: "/machines/generator.png",
    specs: { "Güc": "400 kVA", "Gərginlik": "400V", "İstehsal ili": "2024" },
    price: "200 AZN / Gün",
    available: true,
  },
];

export default function EquipmentCards() {
  const [dbEquipment, setDbEquipment] = useState<EquipmentItem[]>([]);
  const [filter, setFilter] = useState("Hamısı");
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
        // Fallback handled by displayList
      }
    }
    fetchEquipment();
  }, []);

  const displayList = dbEquipment.length > 0 ? dbEquipment : SAMPLE_EQUIPMENT;
  const categories = ["Hamısı", ...Array.from(new Set(displayList.map((e) => e.category)))];
  const filtered = filter === "Hamısı" ? displayList : displayList.filter((e) => e.category === filter);

  return (
    <section ref={sectionRef} id="equipment" className="relative py-32 bg-[#f8f9fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-6">
            Mövcud Texnikalar
          </h2>
          <div className="w-20 h-[3px] bg-orange-500 mx-auto mb-10" />
          
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${
                  filter === cat 
                  ? "bg-black text-white shadow-lg" 
                  : "bg-white text-black/60 hover:bg-black/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className={`group relative bg-white border border-black/5 hover:border-orange-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] ${
                  !item.available ? "opacity-75" : ""
                }`}
              >
                {/* Equipment Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img
                    src={item.image_url || item.image || "/machines/excavator.png"}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                  
                  {/* Category Tag */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/80 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Status Badge */}
                  {!item.available && (
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center p-6">
                      <div className="bg-white px-6 py-3 border border-black flex items-center gap-3 shadow-2xl">
                        <AlertCircle size={16} className="text-orange-500" />
                        <span className="text-[11px] font-black tracking-[0.2em] text-black">MƏŞĞULDUR</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-black text-black mb-6 group-hover:text-orange-500 transition-colors">
                    {item.name}
                  </h3>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {Object.entries(item.specs).map(([key, value]) => (
                      <div key={key} className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold">{key}</span>
                        <span className="text-[13px] font-bold text-black">{value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price and Action */}
                  <div className="flex flex-col gap-6 pt-6 border-t border-black/5">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold text-black/30 tracking-widest mb-1">Başlanğıc qiymət</span>
                      <span className="text-2xl font-black text-orange-500">
                        {item.price}
                      </span>
                    </div>

                    <a
                      href={item.available ? `https://wa.me/994501234567?text=Salam, ${item.name} texnikası haqqında məlumat almaq istəyirəm.` : "#"}
                      target={item.available ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`w-full py-4 text-center text-[11px] font-black tracking-[0.3em] uppercase transition-all duration-300 ${
                        item.available 
                        ? "bg-black text-white hover:bg-orange-500 shadow-xl shadow-black/5" 
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {item.available ? "SİFARİŞ ET" : "MÖVCUD DEYİL"}
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

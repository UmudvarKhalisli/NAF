"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { MessageCircle, ArrowRight, Gauge, Weight, Calendar, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import FadeIn from "./FadeIn";
import { EQUIPMENT_DATA, type EquipmentItem } from "@/data/equipment";

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
          // Merge DB items with default data if needed, or prioritize DB
          setDbEquipment(data);
        }
      } catch (e) {
        // Fallback handled by displayList
      }
    }
    fetchEquipment();
  }, []);

  const displayList = dbEquipment.length > 0 ? dbEquipment : EQUIPMENT_DATA;
  const categories = ["Hamısı", ...Array.from(new Set(displayList.map((e) => e.category)))];
  const filtered = filter === "Hamısı" ? displayList : displayList.filter((e) => e.category === filter);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[#f8f9fa] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-6">
            Mövcud Texnikalar
          </h2>
          <div className="w-20 h-[3px] bg-neutral-500 mx-auto mb-10" />

          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${filter === cat
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
                className={`group relative bg-white border border-black/5 hover:border-neutral-500/30 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] ${!item.available ? "opacity-75" : ""
                  }`}
              >
                {/* Equipment Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <Image
                    src={item.image_url || item.image || "/machines/excavator.png"}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
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
                        <AlertCircle size={16} className="text-neutral-700" />
                        <span className="text-[11px] font-black tracking-[0.2em] text-black">MƏŞĞULDUR</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-black text-black mb-6 group-hover:text-neutral-700 transition-colors">
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

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-6 border-t border-black/5">
                    <Link
                      href={`/texnikalar/${item.id}`}
                      className="flex-1 py-3.5 text-center text-[10px] font-black tracking-[0.2em] uppercase border border-black/10 hover:border-black transition-all duration-300 rounded-lg"
                    >
                      ƏTRAFLI
                    </Link>
                    <a
                      href={item.available ? `https://wa.me/994509627766?text=Salam, ${item.name} texnikası haqqında məlumat almaq istəyirəm.` : "#"}
                      target={item.available ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className={`flex-1 py-3.5 text-center text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 rounded-lg ${item.available
                          ? "bg-black text-white hover:bg-neutral-800 shadow-xl shadow-black/5"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-100"
                        }`}
                    >
                      {item.available ? "SİFARİŞ" : "MÖVCUD DEYİL"}
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

"use client";

import { motion } from "framer-motion";
import { Hammer, Clock, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#f59e0b] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#f59e0b] blur-[150px] rounded-full opacity-50" />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {/* Logo Section */}
          <div className="flex justify-center mb-10">
            <div className="w-20 h-20 bg-[#f59e0b] text-black flex items-center justify-center font-black text-4xl shadow-2xl shadow-[#f59e0b]/20">
              N
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-tight">
            SAYTDA <span className="text-[#f59e0b]">TEXNİKİ</span> <br /> İŞLƏR GEDİR
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 font-medium mb-10 leading-relaxed max-w-lg mx-auto">
            Sizə daha yaxşı xidmət göstərmək üçün saytımızda qısamüddətli yenilənmə işləri aparırıq. Tezliklə yanınızdayıq!
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
              <Clock className="text-[#f59e0b]" size={20} />
              <span className="text-white/80 font-bold text-sm uppercase tracking-widest">SİZİN ÜÇÜN YENİLƏNİRİK</span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
              <Hammer className="text-[#f59e0b]" size={20} />
              <span className="text-white/80 font-bold text-sm uppercase tracking-widest">YENİLƏNMƏ MƏRHƏLƏSİ</span>
            </div>
          </div>
        </motion.div>

        {/* Contact info during maintenance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="pt-12 border-t border-white/5"
        >
          <p className="text-xs font-black text-white/30 uppercase tracking-[0.4em] mb-8 select-none">Təcili Əlaqə Üçün</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-8 md:gap-16">
            <a href="tel:*7766" className="group flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#f59e0b] group-hover:bg-[#f59e0b]/5 transition-all">
                <Phone size={20} className="text-white/40 group-hover:text-[#f59e0b]" />
              </div>
              <span className="text-white font-black text-sm tracking-widest group-hover:text-[#f59e0b] transition-colors uppercase">*7766</span>
            </a>
            <a href="mailto:info@naftexnika.az" className="group flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#f59e0b] group-hover:bg-[#f59e0b]/5 transition-all">
                <Mail size={20} className="text-white/40 group-hover:text-[#f59e0b]" />
              </div>
              <span className="text-white font-black text-sm tracking-widest group-hover:text-[#f59e0b] transition-colors uppercase">info@naftexnika.az</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Ground pattern */}
      <div className="absolute bottom-0 left-0 w-full h-[30%] opacity-[0.02] pointer-events-none overflow-hidden">
        <h2 className="text-[20vw] font-black text-white whitespace-nowrap -mb-[5vw]">NAF TEXNIKA NAF TEXNIKA</h2>
      </div>
    </div>
  );
}

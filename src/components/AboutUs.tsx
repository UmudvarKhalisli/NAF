"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { Target, Award, ShieldCheck } from "lucide-react";
import FadeIn from "./FadeIn";

export default function AboutUs() {
  const [text, setText] = useState("");

  useEffect(() => {
    async function fetchAbout() {
      const { data } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "about_us_text")
        .single();
      
      if (data) setText(data.value);
    }
    fetchAbout();
  }, []);

  return (
    <section id="about" className="relative py-32 bg-white overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <FadeIn direction="right" className="relative">
            <span className="text-[11px] tracking-[0.4em] font-black text-neutral-500 uppercase mb-6 block">Haqqımızda</span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-10 leading-tight">
              Müasir Mühəndis Həlləri Və Peşəkar <br /> Texnika İcarəsi
            </h2>
            <div className="w-16 h-[3px] bg-black mb-10" />
            <p className="text-lg md:text-xl font-medium text-black/60 leading-relaxed mb-12">
              {text || "NAF Tikinti Texnikaları - On ildən artıq təcrübə ilə müasir mühəndislik həlləri və peşəkar tikinti texnikası icarəsi sahəsində sizin qabaqcıl tərəfdaşınızdır."}
            </p>

            <div className="grid sm:grid-cols-3 gap-8 pt-8 border-t border-black/5">
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-black text-black">10+</span>
                <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest">İllik Təcrübə</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-black text-black">150+</span>
                <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest">Müasir Texnika</span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-3xl font-black text-black">500+</span>
                <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest">Uğurlu Layihə</span>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.3} className="relative aspect-square md:aspect-auto md:h-[600px] overflow-hidden rounded-3xl group shadow-2xl">
            <img 
              src="/machines/excavator-heavy.png" 
              alt="Heavy Machinery" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark glass element overlay */}
            <div className="absolute bottom-8 left-8 right-8 p-8 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-neutral-700 rounded-lg text-white">
                  <ShieldCheck size={24} />
                </div>
                <h4 className="text-lg font-bold text-white">Keyfiyyət Təminatı</h4>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Hər bir texnikamız mütəmadi mühəndis baxışından keçirilir və ən yüksək təhlükəsizlik standartlarına cavab verir.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}

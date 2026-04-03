"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
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
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeIn direction="right">
            <div className="relative">
              <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-black uppercase mb-12">
                BİZİM <br /> HAQQIMIZDA
              </h2>
              <div className="w-16 h-[2px] bg-black mb-12" />
              <p className="text-lg md:text-xl font-medium text-black/70 leading-relaxed uppercase tracking-wider">
                {text || "NAF Tikinti Texnikaları - Müasir mühəndislik həlləri və peşəkar tikinti texnikası icarəsi sahəsində qabaqcıl tərəfdaşınız."}
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left" delay={0.3}>
            <div className="relative aspect-square border border-black/5 p-12 bg-[#fafafa]">
              <div className="absolute top-0 right-0 w-24 h-[1px] bg-black/10" />
              <div className="absolute top-0 right-0 w-[1px] h-24 bg-black/10" />
              
              <div className="flex flex-col justify-center h-full">
                <span className="text-[100px] font-serif font-black text-black/5 leading-none mb-4">MÜASİR</span>
                <span className="text-[12px] tracking-[0.6em] font-black text-black uppercase border-b border-black pb-4 self-start">
                  YENİ NƏSİL TEXNİKA PARKI
                </span>
                <p className="mt-8 text-[11px] tracking-[0.3em] font-bold text-black/40 uppercase leading-[2.2]">
                  MÜASİR TEXNOLOGİYALAR VƏ PEŞƏKAR <br /> YANAŞMA İLƏ LAYİHƏLƏRİNİZİ <br /> YÜKSƏK SƏVİYYƏDƏ TƏMİN EDİRİK.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

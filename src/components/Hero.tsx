"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, CheckCircle2, ArrowRight, Settings, Info } from "lucide-react";
import FadeIn from "./FadeIn";

interface FeaturedEquipment {
  id: string;
  name: string;
  image_url: string;
  category: string;
  description: string;
  price?: string;
  specs?: any;
}

export default function Hero() {
  const [featured, setFeatured] = useState<FeaturedEquipment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/equipment/featured');
        if (res.ok) {
          const data = await res.json();
          setFeatured(data);
        }
      } catch (err) {
        console.error('Failed to fetch featured equipment:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center bg-[#0a0a0a] overflow-hidden pt-20"
    >
      {/* Static Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img 
          src="/images/hero-bg.png" 
          alt="NAF Texnika - Background" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="text-left">
            <FadeIn direction="up" duration={1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f59e0b]/10 border border-[#f59e0b]/20 rounded-full mb-8">
                <div className="w-1.5 h-1.5 bg-[#f59e0b] rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-[#f59e0b] uppercase tracking-[0.2em]">Sənaye Lideri</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight mb-8">
                Sizin Layihə,<br />
                <span className="text-[#f59e0b]">Bizim Texnika</span>
              </h1>
              
              <p className="max-w-xl text-lg text-white/60 font-medium mb-12 leading-relaxed">
                Modern mühəndislik həlləri və peşəkar tikinti texnikasının icarəsi üzrə ixtisaslaşmış komanda. Ən çətin şəraitlərdə belə yüksək performans.
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-20">
                <a
                  href="#equipment"
                  className="px-10 py-5 bg-[#f59e0b] text-black text-[12px] font-black tracking-[0.2em] uppercase rounded-xl hover:bg-[#d97706] transition-all flex items-center gap-3 shadow-xl shadow-[#f59e0b]/10"
                >
                  Kataloqa bax <ArrowRight size={16} />
                </a>
                <a
                  href="https://wa.me/994509627766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white text-[12px] font-black tracking-[0.2em] uppercase rounded-xl hover:bg-white/10 transition-all"
                >
                  Bizimlə əlaqə
                </a>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-10">
                <div>
                  <h4 className="text-3xl font-black text-white mb-1">500+</h4>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Texnika Sayı</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white mb-1">12+</h4>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">İllik Təcrübə</p>
                </div>
                <div>
                  <h4 className="text-3xl font-black text-white mb-1">24/7</h4>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Texniki Dəstək</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Special Offer Card */}
          <div className="flex justify-center lg:justify-end">
            <FadeIn direction="left" delay={0.4} className="w-full max-w-md">
              <div className="group relative bg-[#111111] p-8 md:p-10 rounded-3xl border border-white/10 shadow-3xl shadow-black/50 overflow-hidden transform hover:-translate-y-2 transition-all duration-700">
                
                {/* Hot Label */}
                <div className="absolute top-6 right-6 z-20">
                  <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-lg uppercase tracking-widest animate-pulse">HƏFTƏLİK</span>
                </div>

                <div className="relative z-10">
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Xüsusi Təklif</h3>
                  
                  {loading ? (
                    <div className="aspect-[4/3] bg-white/5 rounded-2xl animate-pulse mb-8" />
                  ) : featured ? (
                    <>
                      <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden mb-8 shadow-inner">
                        <img 
                          src={featured.image_url} 
                          alt={featured.name} 
                          className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" 
                        />
                      </div>
                      
                      <div className="space-y-6">
                        <div className="flex justify-between items-end border-b border-white/5 pb-4">
                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Model</p>
                          <p className="text-lg font-black text-white">{featured.name}</p>
                        </div>
                        
                        <div className="flex justify-between items-end border-b border-white/5 pb-4">
                          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Kateqoriya</p>
                          <p className="text-base font-bold text-white/80">{featured.category}</p>
                        </div>

                        {featured.description && (
                          <div className="flex justify-between items-start pt-2">
                             <p className="text-xs text-white/50 italic font-medium leading-relaxed">
                              {featured.description.length > 80 ? featured.description.substring(0, 80) + '...' : featured.description}
                             </p>
                          </div>
                        )}

                        <a 
                          href={`https://wa.me/994509627766?text=Sizin saytda Hero hissəsindəki ${featured.name} texnikası ilə maraqlanıram.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-5 bg-white/5 text-white/80 text-[11px] font-black tracking-[0.3em] uppercase rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 border border-white/10"
                        >
                          İNDİ İCARƏLƏ
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="py-20 text-center text-white/20">
                      <Settings className="mx-auto mb-4 opacity-20" size={48} />
                      <p className="text-xs uppercase font-bold tracking-widest">Təklif təyin olunmayıb</p>
                    </div>
                  )}
                </div>

                {/* Decorative background logo */}
                <div className="absolute -bottom-10 -right-10 opacity-[0.02] select-none pointer-events-none group-hover:opacity-[0.04] transition-opacity">
                  <h2 className="text-[150px] font-black leading-none">NAF</h2>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}

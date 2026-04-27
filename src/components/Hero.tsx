"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Send, CheckCircle2, ArrowRight, Settings, Info } from "lucide-react";
import FadeIn from "./FadeIn";
import Image from "next/image";
import Logo from "./ui/Logo";

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
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_Y8ZPc-61_OCp0VhUuZldzXImIchxVu32WdJGNgG2_-VvOuioE2Jn-ZYe0DUGC--0ZQF_GZx83pruFndIt46z6nFk6rnAR4raTzLiaINuEgZcjd15o3y7TyLqHZzsKmPXNsWdrJJ-6z8fdajkyCjLGcHrI6ac39k1P1aeJVFUvQ-yvhh9rFJxmCCUa3AkmdQ5fHclohZyKnOuq-Gvn31F7-rTvdqbkSa_2ursZrfSZLiJW7qaX5H0LKNIVkR18vMypOGzyB9CAEJK"
          alt="NAF Texnika Tikinti Texnikası İcarəsi Bakı"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-20 lg:py-0">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Content (lg:col-span-7) */}
          <div className="lg:col-span-7 text-left space-y-8">
            <FadeIn direction="up" duration={1}>
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-[#f59e0b]/10 border-l-2 border-[#f59e0b] rounded-sm">
                <Settings className="text-[#f59e0b]" size={14} />
                <span className="text-[11px] font-black text-[#f59e0b] uppercase tracking-[0.2em]">Sənaye Lideri</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8">
                Sizin Layihə,<br />
                <span className="text-[#f59e0b]">Bizim Texnika</span>
              </h1>

              <p className="max-w-xl text-xl text-white/60 font-medium mb-10 leading-relaxed">
                Modern mühəndislik həlləri və peşəkar tikinti texnikasının icarəsi üzrə ixtisaslaşmış komanda. Ən çətin şəraitlərdə belə yüksək performans.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href="#equipment"
                  className="group px-10 py-5 bg-[#f59e0b] text-black text-lg font-bold rounded-lg hover:bg-[#d97706] transition-all flex items-center gap-3 shadow-xl shadow-[#f59e0b]/10"
                >
                  Kataloqa bax
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                </a>
                <a
                  href="https://wa.me/994509627766"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-10 py-5 bg-transparent border border-white/20 text-white text-lg font-bold rounded-lg hover:bg-white/5 transition-all"
                >
                  Bizimlə əlaqə
                </a>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-12 max-w-2xl">
                <div>
                  <h4 className="text-3xl font-bold text-[#f59e0b] mb-1">500+</h4>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest uppercase">Texnika Sayı</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-[#f59e0b] mb-1">MÜASİR</h4>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest uppercase">Texnika Parkı</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-[#f59e0b] mb-1">24/7</h4>
                  <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest uppercase">Texniki Dəstək</p>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Special Offer Card (lg:col-span-5) */}
          <div className="hidden lg:block lg:col-span-5 relative">
            <FadeIn direction="left" delay={0.4} className="w-full">
              <div className="group relative bg-[#1c1b1b] p-8 rounded-xl border border-white/5 shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden">

                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-bold text-white uppercase tracking-tight">İcarə Et</h3>
                  <span className="bg-red-600 text-white text-[10px] px-2 py-1 rounded font-black uppercase tracking-tighter">XÜSUSİ TƏKLİF</span>
                </div>

                <div className="relative z-10">
                  {loading ? (
                    <div className="aspect-square bg-white/5 rounded-lg animate-pulse mb-6" />
                  ) : featured ? (
                    <>
                      <div className="relative aspect-square bg-[#353535] rounded-lg overflow-hidden mb-6">
                        <Image
                          src={featured.image_url}
                          alt={`NAF Texnika ${featured.name} İcarəsi Bakı`}
                          fill
                          className="object-cover transition-all duration-700"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <p className="text-zinc-500 text-sm">Model</p>
                          <p className="font-bold text-white">{featured.name}</p>
                        </div>

                        <div className="flex justify-between items-center py-2 border-b border-white/10">
                          <p className="text-zinc-500 text-sm">Kateqoriya</p>
                          <p className="font-bold text-white/80">{featured.category}</p>
                        </div>

                        <a
                          href={`https://wa.me/994509627766?text=Sizin saytda Hero hissəsindəki ${featured.name} texnikası ilə maraqlanıram.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-4 bg-[#353535] text-white hover:bg-[#f59e0b] hover:text-black transition-all rounded font-bold text-sm text-center block"
                        >
                          İNDİ İCARƏLƏ
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="py-20 text-center text-white/20">
                      <p className="text-xs uppercase font-bold tracking-widest">Təklif təyin olunmayıb</p>
                    </div>
                  )}
                </div>

                {/* Decorative background logo watermark */}
                <div className="absolute -bottom-10 -right-10 opacity-[0.05] select-none pointer-events-none group-hover:opacity-[0.08] transition-opacity w-72 h-32">
                  <Logo variant="gold" size="xl" />
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}

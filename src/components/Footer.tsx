"use client";

import FadeIn from "./FadeIn";
import { MessageCircle } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
      href: "#"
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
      href: "#"
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a5 5 0 1 0 5 5V3h5"></path>
        </svg>
      ),
      href: "#"
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.552 4.197 1.604 6.012l-1.704 6.22 6.362-1.669c1.763.96 3.754 1.467 5.787 1.468H12.05c6.635 0 12.05-5.414 12.05-12.05a11.83 11.83 0 00-3.537-8.528" />
        </svg>
      ),
      href: "https://wa.me/994501234567"
    },
  ];

  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-12">
          <div className="lg:col-span-1">
            <a href="#hero" className="inline-block group mb-8">
              <span className="text-4xl font-serif font-black tracking-tighter text-white">
                NAF
              </span>
              <div className="w-12 h-[1px] bg-white/20 group-hover:bg-white mt-2 transition-all duration-500" />
            </a>

            <div className="flex items-center gap-6 mb-8">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-white transition-colors">
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="text-[11px] leading-[2.2] tracking-[0.2em] text-white/40 uppercase">
              MÜASİR MÜHƏNDİSLİK HƏLLƏRİ VƏ PEŞƏKAR TİKİNTİ TEXNİKASI İCARƏSİ. ON İLDƏN ARTIQ TƏCRÜBƏ İLƏ XİDMƏTİNİZDƏYİK.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.4em] font-black text-white/80 mb-10 uppercase">Kateqoriyalar</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-[10px] tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase font-medium">Ekskavatorlar</a></li>
              <li><a href="#" className="text-[10px] tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase font-medium">Buldozerlər</a></li>
              <li><a href="#" className="text-[10px] tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase font-medium">Kranlar</a></li>
              <li><a href="#" className="text-[10px] tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase font-medium">Yük maşınları</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.4em] font-black text-white/80 mb-10 uppercase">Şirkət</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-[10px] tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase font-medium">Haqqımızda</a></li>
              <li><a href="#why-us" className="text-[10px] tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase font-medium">Üstünlüklər</a></li>
              <li><a href="#contact" className="text-[10px] tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase font-medium">Əlaqə</a></li>
              <li><a href="#" className="text-[10px] tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase font-medium">Karyera</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.4em] font-black text-white/80 mb-10 uppercase">Region</h4>
            <ul className="space-y-4 font-medium">
              <li className="text-[10px] tracking-[0.2em] text-white/60 uppercase">Bakı, Azərbaycan</li>
              <li className="text-[10px] tracking-[0.2em] text-white/60 uppercase">+994 50 123 45 67</li>
              <li className="text-[10px] tracking-[0.2em] text-white/60 uppercase italic lowercase">info@naf-construction.az</li>
              <li className="text-[10px] tracking-[0.2em] text-white/40 uppercase mt-2">09:00 - 18:00 (B.e. - C.)</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-center gap-8 text-center sm:text-left">
          <p className="text-[9px] tracking-[0.5em] text-white/20 uppercase font-medium">
            &copy; 2026 NAF Tikinti Texnikaları. BÜTÜN HÜQUQLAR QORUNUR.
          </p>
          <div className="flex gap-12">
            <a href="/privacy" className="text-[9px] tracking-[0.3em] text-white/20 hover:text-white transition-colors uppercase font-medium">Məxfilik</a>
            <a href="/terms" className="text-[9px] tracking-[0.3em] text-white/20 hover:text-white transition-colors uppercase font-medium">İstifadə Şərtləri</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

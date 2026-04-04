"use client";

import { Instagram, Facebook, MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: <Instagram size={20} />, href: "https://instagram.com/naf_construction" },
    { icon: <Facebook size={20} />, href: "https://facebook.com/naf_construction" },
    { icon: <MessageCircle size={20} />, href: "https://wa.me/994501234567" },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative large logo watermark */}
      <div className="absolute -bottom-20 -left-20 opacity-[0.02] select-none pointer-events-none">
        <h2 className="text-[300px] font-black leading-none">NAF</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <a href="#hero" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-orange-500 text-white flex items-center justify-center font-black text-xl">N</div>
              <span className="text-3xl font-black tracking-tight text-white transition-colors duration-500">NAF</span>
            </a>
            <p className="text-[13px] leading-[1.8] text-white/40 mb-10 max-w-xs">
              Modern mühəndislik həlləri və peşəkar tikinti texnikası icarəsində etibarlı tərəfdaşınız. 
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-orange-500 hover:text-white transition-all duration-300">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.2em] text-orange-500 mb-8 uppercase">Xidmətlər</h4>
            <ul className="space-y-4">
              <li><a href="#categories" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">Kateqoriyalar</a></li>
              <li><a href="#equipment" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">Avadanlıqlar</a></li>
              <li><a href="#why-us" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">Üstünlüklər</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.2em] text-orange-500 mb-8 uppercase">Şirkət</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">Haqqımızda</a></li>
              <li><a href="/privacy" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">Məxfilik Siyasəti</a></li>
              <li><a href="/terms" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">İstifadə Şərtləri</a></li>
              <li><a href="#contact" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">Əlaqə</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.2em] text-orange-500 mb-8 uppercase">Region</h4>
            <ul className="space-y-6">
              <li className="flex gap-3">
                <MapPin size={18} className="text-orange-500 shrink-0" />
                <span className="text-[14px] text-white/60">Bakı, Azərbaycan</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-orange-500 shrink-0" />
                <span className="text-[14px] text-white/60">+994 50 123 45 67</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-orange-500 shrink-0" />
                <span className="text-[14px] text-white/60">info@naf.az</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright section */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[11px] tracking-widest text-white/20 font-medium font-sans">
            &copy; 2026 NAF Tikinti Texnikaları. Bütün hüquqlar qorunur.
          </p>
          <div className="flex gap-8">
            <span className="text-[11px] tracking-widest text-white/20 font-medium">Power by NAF Design</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

// Monochrome icons that show brand color on hover via CSS
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);


const TikTokIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.17V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z" />
  </svg>
);

export default function Footer() {
  const socialLinks = [
    { icon: "instagram", href: "https://instagram.com/naf_construction", hoverColor: "hover:text-pink-500" },
    { icon: "facebook", href: "https://facebook.com/naf_construction", hoverColor: "hover:text-[#1877F2]" },
    { icon: "phone", href: "tel:*7766", hoverColor: "hover:text-[#f59e0b]" },
    { icon: "tiktok", href: "https://tiktok.com/@naf_construction", hoverColor: "hover:text-white" },
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
            <Link href="/#hero" className="flex items-center gap-3 mb-8 group">
              <img src="/logo.png" alt="NAF" className="w-10 h-10 object-contain brightness-0 invert" />
              <span className="text-3xl font-black tracking-tight text-white transition-colors duration-500">NAF</span>
            </Link>
            <p className="text-[13px] leading-[1.8] text-white/40 mb-10 max-w-xs">
              Modern mühəndislik həlləri və peşəkar tikinti texnikası icarəsində etibarlı tərəfdaşınız.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 transition-all duration-300 hover:bg-white/10 hover:scale-110 ${social.hoverColor}`}>
                  {social.icon === 'instagram' && <InstagramIcon />}
                  {social.icon === 'facebook' && <FacebookIcon />}
                  {social.icon === 'phone' && <Phone size={20} />}
                  {social.icon === 'tiktok' && <TikTokIcon />}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.2em] text-neutral-400 mb-8 uppercase">Xidmətlər</h4>
            <ul className="space-y-4">
              <li><Link href="/#categories" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">Kateqoriyalar</Link></li>
              <li><Link href="/#equipment" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">Avadanlıqlar</Link></li>
              <li><Link href="/#why-us" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">Üstünlüklər</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.2em] text-neutral-400 mb-8 uppercase">Şirkət</h4>
            <ul className="space-y-4">
              <li><Link href="/#about" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">Haqqımızda</Link></li>
              <li><Link href="/privacy" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">Məxfilik Siyasəti</Link></li>
              <li><Link href="/terms" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">İstifadə Şərtləri</Link></li>
              <li><Link href="/#contact" className="text-[14px] text-white/60 hover:text-white transition-colors font-medium">Əlaqə</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[11px] font-black tracking-[0.2em] text-neutral-400 mb-8 uppercase">Region</h4>
            <ul className="space-y-6">
              <li className="flex gap-3">
                <MapPin size={18} className="text-neutral-400 shrink-0" />
                <span className="text-[14px] text-white/60">Bakı, Azərbaycan</span>
              </li>
              <li className="flex gap-3">
                <Phone size={18} className="text-neutral-400 shrink-0" />
                <span className="text-[14px] text-white/60">+994 50 962 77 66</span>
              </li>
              <li className="flex gap-3">
                <Mail size={18} className="text-neutral-400 shrink-0" />
                <span className="text-[14px] text-white/60">info@naftexnika.az</span>
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
            <span className="text-[10px] tracking-[0.2em] text-white/10 font-black uppercase transition-all duration-500 hover:text-white/40 cursor-default">
              established by umudvar
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

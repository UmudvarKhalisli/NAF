"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import Logo from "./ui/Logo";

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

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.17V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z" />
  </svg>
);

export default function Footer() {
  const socialLinks = [
    { icon: "instagram", href: "https://www.instagram.com/naftexnika.az?igsh=ODF1Ym1tN2dlaGxy&utm_source=qr", hoverColor: "hover:text-pink-500" },
    { icon: "facebook", href: "https://www.facebook.com/people/Naf-Texnika-Az/61570786507582/?mibextid=wwXIfr&rdid=uPsc2RhEdPAKRaG8&share_url=https%253A%252F%252Fwww.facebook.com%252Fshare%252F14Zj2zCgtDZ%252F%253Fmibextid%253DwwXIfr", hoverColor: "hover:text-[#1877F2]" },
    { icon: "whatsapp", href: "https://wa.me/994509627766", hoverColor: "hover:text-[#25D366]" },
    { icon: "tiktok", href: "https://www.tiktok.com/@naftexnika.az?_r=1&_t=ZS-95VApVTzIfA", hoverColor: "hover:text-white" },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white border-t border-white/5 pt-24 pb-12 overflow-hidden relative">
      {/* Decorative large logo watermark */}
      <div className="absolute -bottom-20 -left-20 opacity-[0.02] select-none pointer-events-none">
        <h2 className="text-[300px] font-black leading-none font-playfair">NAF</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/#hero" className="group flex items-center mb-8">
              <Logo variant="gold" size="lg" align="left" className="transition-all duration-300 group-hover:scale-105" />
            </Link>
            <p className="text-[13px] leading-[1.8] text-white/40 mb-10 max-w-xs">
              Modern mühəndislik həlləri və peşəkar tikinti texnikası icarəsində etibarlı tərəfdaşınız.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 transition-all duration-300 hover:bg-white/10 hover:scale-110 ${social.hoverColor}`}>
                  {social.icon === 'instagram' && <InstagramIcon />}
                  {social.icon === 'facebook' && <FacebookIcon />}
                  {social.icon === 'whatsapp' && <WhatsAppIcon />}
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
              established by umudvar khalisli
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

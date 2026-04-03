"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Menu, X, Phone } from "lucide-react";

const navLinks = [
  { label: "ANA SƏHİFƏ", href: "/#hero" },
  { label: "HAQQIMIZDA", href: "/#about" },
  { label: "TEXNİKA", href: "/#equipment" },
  { label: "KATEQORİYALAR", href: "/#categories" },
  { label: "ÜSTÜNLÜKLƏR", href: "/#why-us" },
  { label: "ƏLAQƏ", href: "/#contact" },
];

const socialLinks = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
    href: "#"
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
      </svg>
    ),
    href: "#"
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a5 5 0 1 0 5 5V3h5"></path>
      </svg>
    ),
    href: "#"
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 0 5.414 0 12.05c0 2.123.552 4.197 1.604 6.012l-1.704 6.22 6.362-1.669c1.763.96 3.754 1.467 5.787 1.468H12.05c6.635 0 12.05-5.414 12.05-12.05a11.83 11.83 0 00-3.537-8.528" />
      </svg>
    ),
    href: "https://wa.me/994501234567"
  },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
        ? "bg-white/95 backdrop-blur-md border-b border-black/5 py-4"
        : "bg-white py-6"
        }`}
    >
      {/* Top thin separator line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-black/[0.03]" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <a href="/#hero" className="group flex items-center gap-4 flex-shrink-0">
            <span className="text-2xl font-serif font-black tracking-tighter text-black">
              NAF
            </span>
            <div className="hidden xl:block w-[1px] h-6 bg-black/10" />
            <div className="hidden xl:flex flex-col">
              <span className="text-[9px] tracking-[0.3em] font-black text-black/40 group-hover:text-black/60 transition-colors duration-500 uppercase whitespace-nowrap">
                Tikinti
              </span>
              <span className="text-[8px] tracking-[0.15em] font-bold text-black/20 uppercase whitespace-nowrap">
                Texnikaları
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative text-[10.5px] font-bold tracking-[0.2em] text-black/70 hover:text-black transition-colors duration-300 group font-sans whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-2 left-0 w-0 h-[1.5px] bg-black transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0">
            <div className="hidden xl:flex items-center gap-4 border-r border-black/5 pr-6">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-colors">
                  {social.icon}
                </a>
              ))}
            </div>
            <a href="tel:+994501234567" className="text-[10.5px] font-bold tracking-[0.15em] text-black/90 hover:text-black transition-colors font-sans whitespace-nowrap">
              *7766
            </a>
            <a
              href="https://wa.me/994501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-black text-white text-[10px] font-black tracking-[0.25em] hover:bg-white hover:text-black border border-black transition-all duration-500 shadow-lg shadow-black/5 whitespace-nowrap"
            >
              SİFARİŞ
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex flex-col gap-1.5 p-2 transition-all group"
          >
            <div className={`w-6 h-[1.5px] bg-black transition-all duration-300 ${open ? "rotate-45 translate-y-[4.5px]" : ""}`} />
            <div className={`w-6 h-[1.5px] bg-black transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <div className={`w-6 h-[1.5px] bg-black transition-all duration-300 ${open ? "-rotate-45 -translate-y-[4.5px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Bottom thin separator line */}
      <div className={`absolute bottom-0 left-0 w-full h-[1px] bg-black/[0.03] transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`} />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute top-full left-0 w-full bg-white border-b border-black/10 py-16 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-10 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-xl font-serif tracking-[0.2em] text-black hover:text-black/50 transition-colors uppercase"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex justify-center gap-8 py-4 border-t border-black/5 mt-4">
                {socialLinks.map((social, i) => (
                  <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="text-black/40 hover:text-black transition-colors">
                    {social.icon}
                  </a>
                ))}
              </div>
              <div className="pt-8">
                <a
                  href="https://wa.me/994501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-block px-14 py-5 bg-black text-white text-[12px] font-bold tracking-[0.4em] border border-black"
                >
                  SİFARİŞ VER
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

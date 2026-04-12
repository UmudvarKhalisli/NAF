"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Instagram, Facebook, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Ana Səhifə", href: "/#hero", id: "hero" },
  { label: "Haqqımızda", href: "/#about", id: "about" },
  { label: "Texnika", href: "/#equipment", id: "equipment" },
  { label: "Layihələr", href: "/#layiheler", id: "layiheler" },
  { label: "Bloq", href: "/blog", id: "blog" },
  { label: "Əlaqə", href: "/#contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const isHome = pathname === "/";
  const forceSolid = !isHome || scrolled;

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (isHome) {
        const sections = navLinks.map(link => document.getElementById(link.id));  
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
          if (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
              setActiveSection(section.id);
            }
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!mounted) return null;

  return (
    <>
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          forceSolid
            ? "bg-white/95 backdrop-blur-xl border-b border-black/5 py-4 shadow-sm"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <Link href="/#hero" className="group flex items-center flex-shrink-0">
              <Image 
                src="/logo-gold.png" 
                alt="NAF Logo" 
                width={200} 
                height={80} 
                priority
                className={`transition-all duration-500 h-14 md:h-16 lg:h-20 w-auto object-contain ${
                  forceSolid ? 'drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]' : 'drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]'
                }`} 
              />
            </Link>

            <div className="hidden lg:flex items-center gap-8 xl:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-[15px] font-bold tracking-wide transition-all duration-300 group ${
                    activeSection === link.id && isHome
                      ? (forceSolid ? "text-neutral-900" : "text-gray-300")      
                      : (forceSolid ? "text-black/60 hover:text-black" : "text-white/70 hover:text-white")
                  }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-neutral-700 transition-all duration-300 ${
                    activeSection === link.id && isHome ? "w-full" : "w-0 group-hover:w-full"
                  }`} />
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4 lg:gap-8 flex-shrink-0">      
              <a
                href="tel:*7766"
                className={`hidden sm:flex items-center gap-2 text-[13px] font-bold tracking-tighter transition-colors ${
                  forceSolid || open ? "text-black" : "text-white"
                }`}
              >
                <Phone size={14} className={forceSolid || open ? "text-neutral-700" : "text-neutral-400"} />
                *7766
              </a>

              <a
                href="https://wa.me/994509627766"
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden md:block px-6 py-2.5 text-[11px] font-black tracking-[0.2em] uppercase border transition-all duration-500 rounded-lg ${
                  forceSolid || open
                  ? "bg-black text-white border-black hover:bg-neutral-800 hover:border-neutral-800"
                  : "bg-white text-black border-white hover:bg-neutral-200 hover:text-black hover:border-neutral-200"
                }`}
              >
                Sifariş
              </a>

              <button
                onClick={() => setOpen(!open)}
                className={`lg:hidden flex flex-col gap-1.5 p-2 transition-all group z-[120]`}
              >
                <div className={`w-6 h-[2px] transition-all duration-300 ${open ? "rotate-45 translate-y-[8px]" : ""} ${forceSolid || open ? "bg-black" : "bg-white"}`} />
                <div className={`w-6 h-[2px] transition-all duration-300 ${open ? "opacity-0" : ""} ${forceSolid || open ? "bg-black" : "bg-white"}`} />
                <div className={`w-6 h-[2px] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[8px]" : ""} ${forceSolid || open ? "bg-black" : "bg-white"}`} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu — OUTSIDE nav to avoid backdrop-filter containing block bug */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}        
            className="fixed inset-0 bg-white z-[110] flex flex-col px-8 lg:hidden overflow-hidden"
          >
            {/* Header: Logo left, X right */}
            <div className="flex items-center justify-between py-5 mb-6">
              <Link href="/#hero" onClick={() => setOpen(false)} className="flex items-center">
                <Image 
                  src="/logo-gold.png" 
                  alt="NAF" 
                  width={120} 
                  height={45} 
                  className="h-10 w-auto object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]" 
                />
              </Link>
              <button onClick={() => setOpen(false)} className="p-2">
                <X size={22} className="text-black" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-6 flex-grow">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`text-xl font-black tracking-tight transition-colors block ${
                      activeSection === link.id && isHome ? "text-neutral-400" : "text-black"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Bottom: divider + links + icons */}
            <div className="pt-6 pb-8 border-t border-black/5 space-y-5">
              {/* Phone */}
              <a href="tel:*7766" className="flex items-center gap-2 text-base font-black text-black">
                <Phone size={15} className="text-black/40" />
                *7766
              </a>

              {/* Legal links */}
              <div className="flex gap-6">
                <a href="/privacy" className="text-[11px] font-bold text-black/30 hover:text-black transition-colors uppercase tracking-widest">Məxfilik Siyasəti</a>
                <a href="/terms" className="text-[11px] font-bold text-black/30 hover:text-black transition-colors uppercase tracking-widest">İstifadə Şərtləri</a>
              </div>

              {/* Social icons */}
              <div className="flex gap-2">
                <a href="https://instagram.com/naf_construction" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center text-black/40 hover:bg-black/10 transition-colors">       
                  <Instagram size={16} />
                </a>
                <a href="https://facebook.com/naf_construction" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center text-black/40 hover:bg-black/10 transition-colors">       
                  <Facebook size={16} />
                </a>
                <a href="https://wa.me/994509627766" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center text-black/40 hover:bg-black/10 transition-colors">       
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                <a href="https://tiktok.com/@naf_construction" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center text-black/40 hover:bg-black/10 transition-colors">       
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48V13a8.28 8.28 0 005.58 2.17V11.7a4.83 4.83 0 01-3.77-1.24V6.69h3.77z"/></svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

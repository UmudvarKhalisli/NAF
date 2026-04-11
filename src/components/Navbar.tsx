"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Instagram, Facebook, X } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

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
            <Link href="/#hero" className="group flex items-center gap-3 flex-shrink-0">
              <img src="/logo.png" alt="NAF" className={`w-9 h-9 sm:w-10 sm:h-10 object-contain transition-all duration-500 ${forceSolid ? 'scale-90 mix-blend-multiply' : 'brightness-0 invert'}`} />
              <div className="flex flex-col">
                <span className={`text-xl font-black tracking-tight transition-colors duration-500 ${forceSolid || open ? "text-black" : "text-white"}`}>
                  NAF
                </span>
                <span className={`text-[9px] font-bold tracking-[0.2em] transition-colors duration-500 ${forceSolid || open ? "text-black/40" : "text-white/40"} uppercase`}>
                  Texnika İcarəsi
                </span>
              </div>
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
                href="tel:*7766"
                className={`hidden md:block px-6 py-2.5 text-[11px] font-black tracking-[0.2em] uppercase border transition-all duration-500 rounded-lg ${
                  forceSolid || open
                  ? "bg-black text-white border-black hover:bg-neutral-800 hover:border-neutral-800"
                  : "bg-white text-black border-white hover:bg-neutral-200 hover:text-black hover:border-neutral-200"
                }`}
              >
                Sifariş Et
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
              <Link href="/#hero" onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                <img src="/logo.png" alt="NAF" className="w-8 h-8 object-contain mix-blend-multiply" />
                <span className="text-lg font-black tracking-tight text-black">NAF</span>
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
                <a href="tel:*7766" className="w-9 h-9 rounded-lg bg-black/5 flex items-center justify-center text-black/40 hover:bg-black/10 transition-colors">       
                  <Phone size={15} />
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

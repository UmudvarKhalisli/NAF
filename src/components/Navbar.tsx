"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Instagram, Facebook, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Ana Səhifə", href: "/#hero", id: "hero" },
  { label: "Haqqımızda", href: "/#about", id: "about" },
  { label: "Texnika", href: "/#equipment", id: "equipment" },
  { label: "Layihələr", href: "/layiheler", id: "layiheler" },
  { label: "Kateqoriyalar", href: "/#categories", id: "categories" },
  { label: "Üstünlüklər", href: "/#why-us", id: "why-us" },
  { label: "Əlaqə", href: "/#contact", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const pathname = usePathname();
  const isHome = pathname === "/";
  // On sub-pages, the navbar should always have a solid background natively.
  const forceSolid = !isHome || scrolled;

  useEffect(() => {
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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        forceSolid
          ? "bg-white/95 backdrop-blur-xl border-b border-black/5 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between gap-4">
          <a href="/#hero" className="group flex items-center gap-3 flex-shrink-0">
            <div className={`w-10 h-10 flex items-center justify-center bg-black text-white font-black text-xl transition-all duration-500 group-hover:bg-neutral-700 ${forceSolid ? 'scale-90' : ''}`}>
              N
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-black tracking-tight transition-colors duration-500 ${forceSolid || open ? "text-black" : "text-white"}`}>
                NAF
              </span>
              <span className={`text-[9px] font-bold tracking-[0.2em] transition-colors duration-500 ${forceSolid || open ? "text-black/40" : "text-white/40"} uppercase`}>
                Texnika İcarəsi
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative text-[13px] font-bold tracking-wide transition-all duration-300 group ${
                  activeSection === link.id && isHome
                    ? (forceSolid ? "text-neutral-900" : "text-gray-300")      
                    : (forceSolid ? "text-black/60 hover:text-black" : "text-white/70 hover:text-white")
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-neutral-700 transition-all duration-300 ${
                  activeSection === link.id && isHome ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 lg:gap-8 flex-shrink-0">      
            <a
              href="tel:+994501234567"
              className={`hidden sm:flex items-center gap-2 text-[13px] font-bold tracking-tighter transition-colors ${
                forceSolid || open ? "text-black" : "text-white"
              }`}
            >
              <Phone size={14} className={forceSolid || open ? "text-neutral-700" : "text-neutral-400"} />
              *7766
            </a>

            <a
              href="https://wa.me/994501234567"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:block px-6 py-2.5 text-[11px] font-black tracking-[0.2em] uppercase border transition-all duration-500 ${
                forceSolid || open
                ? "bg-black text-white border-black hover:bg-neutral-800 hover:border-neutral-800"
                : "bg-white text-black border-white hover:bg-neutral-200 hover:text-black hover:border-neutral-200"
              }`}
            >
              Sifariş
            </a>

            <button
              onClick={() => setOpen(!open)}
              className={`lg:hidden flex flex-col gap-1.5 p-2 transition-all group z-[110]`}
            >
              <div className={`w-6 h-[2px] transition-all duration-300 ${open ? "rotate-45 translate-y-[8px]" : ""} ${forceSolid || open ? "bg-black" : "bg-white"}`} />
              <div className={`w-6 h-[2px] transition-all duration-300 ${open ? "opacity-0" : ""} ${forceSolid || open ? "bg-black" : "bg-white"}`} />
              <div className={`w-6 h-[2px] transition-all duration-300 ${open ? "-rotate-45 -translate-y-[8px]" : ""} ${forceSolid || open ? "bg-black" : "bg-white"}`} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}        
            className="fixed inset-0 bg-white z-[105] flex flex-col pt-32 px-10 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-3xl font-black tracking-tighter transition-colors ${
                    activeSection === link.id && isHome ? "text-neutral-600" : "text-black"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto py-12 border-t border-black/5 flex flex-col gap-8">
              <a href="tel:+994501234567" className="flex items-center gap-4 text-2xl font-black text-black">
                <div className="w-12 h-12 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-700 font-bold font-sans">
                  <Phone size={24} />
                </div>
                *7766
              </a>

              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white hover:bg-neutral-700 transition-colors">       
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-xl bg-black flex items-center justify-center text-white hover:bg-neutral-700 transition-colors">       
                  <Facebook size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

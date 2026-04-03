"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FadeIn from "./FadeIn";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-white overflow-hidden pt-20"
    >
      {/* Background Blueprint - Grand Construction Site */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.09] grayscale brightness-[1.05] pointer-events-none"
      >
        <img 
          src="/images/hero-grand.png" 
          alt="Grand Construction Blueprint" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-black/[0.02]" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-black/[0.02]" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-black/[0.02]" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-black/[0.02]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        <FadeIn direction="up" duration={1.5}>
          {/* Subtle large watermark background text */}
          <h1 className="text-[120px] md:text-[200px] lg:text-[280px] font-serif font-black leading-none tracking-tighter mb-8 select-none opacity-[0.02] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 uppercase">
            NAF
          </h1>
          
          <div className="relative mt-24">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif tracking-[0.3em] font-black text-black leading-tight mb-12 uppercase drop-shadow-[0_2px_15px_rgba(255,255,255,1)]">
              SİZİN LAYİHƏ, <br /> BİZİM TEXNİKA
            </h2>
            <div className="w-24 h-[1.5px] bg-black mx-auto mb-16" />
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.6} duration={1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a
              href="#equipment"
              className="group relative px-16 py-6 bg-black text-white border border-black overflow-hidden transition-all duration-700"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
              <span className="relative z-10 text-[12px] font-black tracking-[0.5em] group-hover:text-black uppercase">Kataloq</span>
            </a>
            <a
              href="https://wa.me/994501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-16 py-6 bg-transparent text-black border border-black overflow-hidden transition-all duration-700"
            >
              <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out" />
              <span className="relative z-10 text-[12px] font-black tracking-[0.5em] group-hover:text-white uppercase">Bizimlə Əlaqə</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={1.4} duration={2} className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-24 bg-black/10 relative overflow-hidden">
            <motion.div
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 left-0 w-full h-1/2 bg-black/20"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

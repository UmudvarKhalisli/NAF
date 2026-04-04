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

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-[#0a0a0a] overflow-hidden pt-20"
    >
      {/* Background Image with Dark Overlay */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 flex items-center justify-center grayscale brightness-[0.4] pointer-events-none transition-all duration-1000"
      >
        <img 
          src="/images/hero-grand.png" 
          alt="Grand Construction Foundation" 
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay as requested */}
        <div className="absolute inset-0 bg-black/60" />
      </motion.div>

      {/* Blueprint Grid Lines */}
      <div className="absolute inset-0 z-1 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-white/[0.03]" />
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-white/[0.03]" />
        <div className="absolute top-1/3 left-0 w-full h-[1px] bg-white/[0.03]" />
        <div className="absolute top-2/3 left-0 w-full h-[1px] bg-white/[0.03]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 text-center flex flex-col items-center">
        <FadeIn direction="up" duration={1.5}>
          {/* Watermark Logo */}
          <h1 className="text-[120px] md:text-[200px] lg:text-[280px] font-black leading-none tracking-tighter mb-8 select-none opacity-[0.03] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
            NAF
          </h1>
          
          <div className="relative mt-24">
            <h2 className="text-3xl md:text-5xl lg:text-7xl tracking-[0.1em] font-black text-white leading-tight mb-8 drop-shadow-2xl">
              Sizin Layihə, <br /> Bizim Texnika
            </h2>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-medium mb-12">
              Modern mühəndislik həlləri və peşəkar tikinti texnikasının icarəsi üzrə ixtisaslaşmış komanda.
            </p>
            <div className="w-24 h-[2px] bg-neutral-500 mx-auto mb-16" />
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.6} duration={1}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#equipment"
              className="group relative px-16 py-6 bg-neutral-700 text-white border border-neutral-700 overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(64,64,64,0.3)]"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 text-[13px] font-bold tracking-[0.2em] group-hover:text-black">Kataloq</span>
            </a>
            <a
              href="https://wa.me/994501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-16 py-6 bg-transparent text-white border border-white/20 overflow-hidden transition-all duration-500 hover:border-white"
            >
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 text-[13px] font-bold tracking-[0.2em] group-hover:text-black">Bizimlə əlaqə</span>
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={1.4} duration={2} className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-24 bg-white/10 relative overflow-hidden">
            <motion.div
              animate={{
                y: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 left-0 w-full h-1/2 bg-neutral-500/50"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

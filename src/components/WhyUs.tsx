"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "./FadeIn";

const reasons = [
  {
    title: <>SÜRƏTLİ <br /> ÇATDIRILMA</>,
    desc: "Sifarişiniz 24 saat ərzində ünvanınıza çatdırılır. Modern loqistika həlləri.",
  },
  {
    title: <>SIĞORTA VƏ <br /> ZƏMANƏT</>,
    desc: "Bütün texnikalarımız tam sığortalıdır. Hər hansı problem olarsa, dərhal əvəzlənir.",
  },
  {
    title: <>RƏQABƏTLİ <br /> QİYMƏTLƏR</>,
    desc: "Bazarda ən uyğun qiymətlər. Həcmli sifarişlər üçün xüsusi endirimlər.",
  },
  {
    title: <>TEXNİKİ DƏSTƏK <br /> 24/7</>,
    desc: "Peşəkar mühəndis komandamız hər an xidmətinizdədir. Gecə-gündüz dəstək.",
  },
  {
    title: <>MÜQAVİLƏ <br /> ŞƏFFAFLIĞI</>,
    desc: "Aydınlıq və şəffaf müqavilə şərtləri. Gizli xərclər və əlavə ödənişlər yoxdur.",
  },
  {
    title: <>10+ İL <br /> TƏCRÜBƏ</>,
    desc: "On ildən artıq mühəndislik təcrübəsi. 500-dən çox uğurlu dövlət və özəl layihə.",
  },
];

export default function WhyUs() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section 
      id="why-us" 
      ref={containerRef}
      className="relative py-32 bg-white overflow-hidden"
    >
      {/* Background Blueprint */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-[0.07] grayscale brightness-[1.1] pointer-events-none"
      >
        <img 
          src="/images/site-bg.png" 
          alt="Blueprint Site" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn className="text-center mb-24">
          <span className="text-[12px] tracking-[0.4em] font-bold text-black/60 uppercase mb-6 block">
            FƏLSƏFƏMİZ
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-black tracking-tighter text-black mb-8">
            NİYƏ BİZ?
          </h2>
          <div className="w-12 h-[1px] bg-black mx-auto mb-8" />
          <p className="text-sm tracking-widest text-black/60 max-w-xl mx-auto uppercase">
            ETİBARLI TƏRƏFDAŞLIQ VƏ PEŞƏKAR YANAŞMA
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {reasons.map((r, i) => (
            <FadeIn
              key={i}
              delay={i * 0.1}
              className="group p-12 border border-black/5 hover:border-black/20 transition-all duration-700 bg-white relative overflow-hidden"
            >
              <span className="text-5xl font-serif font-light text-black/5 absolute top-8 right-8 group-hover:text-black/10 transition-colors duration-700">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="text-lg font-bold tracking-[0.2em] text-black mb-6 uppercase">
                {r.title}
              </h3>
              <div className="w-8 h-[1px] bg-black mb-6 group-hover:w-16 transition-all duration-700" />
              <p className="text-[13px] tracking-widest text-black/75 leading-[1.8] uppercase font-medium">
                {r.desc}
              </p>

              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

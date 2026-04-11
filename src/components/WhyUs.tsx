"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Truck, ShieldCheck, Banknote, Wrench, FileText, History } from "lucide-react";
import FadeIn from "./FadeIn";

const reasons = [
  {
    title: "Sürətli Çatdırılma",
    desc: "Sifarişiniz 24 saat ərzində ünvanınıza çatdırılır. Modern loqistika həllərimizlə vaxtınıza qənaət edirik.",
    icon: <Truck size={32} />
  },
  {
    title: "Sığorta Və Zəmanət",
    desc: "Bütün texnikalarımız tam sığortalıdır. Hər hansı texniki problem olarsa, dərhal yenisi ilə əvəzləyirik.",
    icon: <ShieldCheck size={32} />
  },
  {
    title: "Rəqabətli Qiymətlər",
    desc: "Bazarda ən münasib qiymətlər bizdədir. Uzunmüddətli icarə sifarişləri üçün xüsusi endirimlər təklif edirik.",
    icon: <Banknote size={32} />
  },
  {
    title: "Texniki Dəstək 24/7",
    desc: "Peşəkar mühəndis komandamız hər an xidmətinizdədir. Gecə-gündüz texniki dəstək göstərilir.",
    icon: <Wrench size={32} />
  },
  {
    title: "Müqavilə Şəffaflığı",
    desc: "Aydın və şəffaf müqavilə şərtləri. Heç bir gizli xərc və ya əlavə ödənişlər nəzərdə tutulmayıb.",
    icon: <FileText size={32} />
  },
  {
    title: "10+ İl Təcrübə",
    desc: "On ildən artıq mühəndislik təcrübəsi. 500-dən çox uğurlu dövlət və özəl tikinti layihəsində tərəfdaşıq.",
    icon: <History size={32} />
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
      className="relative py-32 bg-[#f8f9fa] overflow-hidden border-t border-black/5"
    >
      {/* Background Blueprint Graphic */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
      >
        <Image 
          src="/images/site-bg.png" 
          alt="NAF Texnika - Müasir Mühəndislik Çizimi və Texnoloji Həllər" 
          fill
          className="object-cover scale-110"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn className="text-center mb-24">
          <span className="text-[11px] tracking-[0.4em] font-black text-neutral-500 uppercase mb-6 block">
            NİYƏ BİZ?
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-8">
            Bizim Üstünlüklərimiz
          </h2>
          <div className="w-16 h-[3px] bg-black mx-auto mb-8" />
          <p className="text-lg text-black/60 max-w-xl mx-auto font-medium">
            Müştərilərimizə yalnız texnika deyil, həm də sürətli xidmət və peşəkar mühəndis dəstəyi vəd edirik.
          </p>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, i) => (
            <FadeIn
              key={i}
              delay={i * 0.1}
              className="group p-10 bg-white border border-black/5 hover:border-neutral-500/30 transition-all duration-500 relative overflow-hidden rounded-3xl hover:shadow-2xl"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-4 bg-gray-50 text-neutral-700 rounded-2xl group-hover:bg-neutral-700 group-hover:text-white transition-colors duration-500">
                  {r.icon}
                </div>
                <span className="text-4xl font-black text-black/5 group-hover:text-black/10 transition-colors">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-xl font-black text-black mb-4 transition-colors group-hover:text-neutral-700">
                {r.title}
              </h3>
              <div className="w-10 h-[2px] bg-black/10 mb-6 transition-all duration-500 group-hover:w-20 group-hover:bg-neutral-700" />
              <p className="text-[15px] font-medium text-black/60 leading-relaxed">
                {r.desc}
              </p>

              {/* Accent bar at bottom */}
              <div className="absolute left-0 bottom-0 right-0 h-[4px] bg-neutral-700 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

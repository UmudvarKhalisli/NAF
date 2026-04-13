"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import FadeIn from "./FadeIn";

const faqs = [
  {
    question: "Tikinti texnikası icarəsi qiymətləri necə hesablanır?",
    answer: "Qiymətlər texnikanın növünə, icarə müddətinə (saatlıq, günlük və ya aylıq) və işin yerləşdiyi ünvana görə dəyişir. Uzunmüddətli icarələr üçün xüsusi endirimlər tətbiq olunur."
  },
  {
    question: "Texnikalar operatorla təmin olunurmu?",
    answer: "Bəli, bütün texnikalarımız təcrübəli və peşəkar operatorlar tərəfindən idarə olunur. Operator xidməti icarə qiymətinə daxildir."
  },
  {
    question: "Hansı bölgələrdə xidmət göstərirsiniz?",
    answer: "Biz bütün Azərbaycan ərazisində, xüsusilə Bakı, Sumqayıt, Gəncə və azad edilmiş Qarabağ bölgəsi daxil olmaqla bütün rayonlarda xidmət göstəririk. Textnikalarımız istənilən ünvana operativ şəkildə çatdırılır."
  },
  {
    question: "Texnika nasazlıq halında nə baş verir?",
    answer: "Texniki nasazlıq baş verdikdə, mühəndis komandamız dərhal müdaxilə edir. Problem yerində həll olunmazsa, texnika 24 saat ərzində eyni növ digər texnika ilə əvəzlənir."
  },
  {
    question: "Sifariş prosesi necədir?",
    answer: "Siz bizimlə telefon və ya WhatsApp vasitəsilə əlaqə saxlayırsınız, mütəxəssisimiz layihənizi qiymətləndirir və sizə ən uyğun texnikanı məsləhət görür. Razılıq əldə olunduqdan sonra texnika təyin olunan vaxtda ünvana çatdırılır."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-32 bg-white border-t border-black/5">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <FadeIn className="text-center mb-16">
          <span className="text-[11px] tracking-[0.4em] font-black text-neutral-500 uppercase mb-6 block">
            Tez-tez Verilən Suallar
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-8">
            Müştərilərimizi Maraqlandıran Suallar
          </h2>
          <div className="w-16 h-[3px] bg-black mx-auto" />
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div 
                className={`border rounded-2xl transition-all duration-300 ${
                  openIndex === index ? "border-black shadow-lg" : "border-black/5 hover:border-black/20"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <span className="text-lg md:text-xl font-bold text-black">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-colors ${
                    openIndex === index ? "bg-black text-white" : "bg-gray-50 text-black"
                  }`}>
                    {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 text-black/60 font-medium leading-relaxed text-lg">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

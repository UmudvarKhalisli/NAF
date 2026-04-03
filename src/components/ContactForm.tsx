"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FadeIn from "./FadeIn";

export default function ContactForm() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    equipment: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Salam, mən ${form.name}. ${form.equipment} texnikası haqqında məlumat və qiymət təklifi almaq istəyirəm.\nTelefon: ${form.phone}\nE-poçt: ${form.email}\nMesaj: ${form.message}`;
    window.open(`https://wa.me/994501234567?text=${encodeURIComponent(text)}`, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", phone: "", email: "", equipment: "", message: "" });
    }, 4000);
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative py-32 bg-white overflow-hidden"
    >
      {/* Background Blueprint */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0 opacity-[0.11] grayscale brightness-[1.1] pointer-events-none"
      >
        <img 
          src="/images/engine-bg.png" 
          alt="Blueprint Engine" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeIn className="text-center mb-24">
          <span className="text-[10px] tracking-[0.4em] font-bold text-black/40 uppercase mb-6 block">
            ƏLAQƏ
          </span>
          <h2 className="text-5xl md:text-6xl font-serif font-black tracking-tighter text-black mb-8 uppercase">
            SİFARİŞ FORMU
          </h2>
          <div className="w-12 h-[1px] bg-black mx-auto mb-8" />
          <p className="text-sm tracking-widest text-black/60 max-w-xl mx-auto uppercase">
            MƏLUMATLARI DOLDURUN VƏ BİRBASA WHATSAPP ÜZƏRİNDƏN BİZƏ GÖNDƏRİN
          </p>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-24">
          <FadeIn direction="right">
            <div className="space-y-12">
              <div>
                <h4 className="text-[10px] tracking-[0.3em] font-black text-black/40 mb-4 uppercase">Telefon</h4>
                <p className="text-2xl font-serif font-bold text-black tracking-tight">+994 50 123 45 67</p>
              </div>
              <div>
                <h4 className="text-[10px] tracking-[0.3em] font-black text-black/40 mb-4 uppercase">E-poçt</h4>
                <p className="text-2xl font-serif font-bold text-black tracking-tight">info@naf-construction.az</p>
              </div>
              <div>
                <h4 className="text-[10px] tracking-[0.3em] font-black text-black/40 mb-4 uppercase">Ünvan</h4>
                <p className="text-2xl font-serif font-bold text-black tracking-tight">Bakı, Azərbaycan</p>
              </div>
              
              <div className="pt-12 border-t border-black/5">
                <h4 className="text-[10px] tracking-[0.3em] font-black text-black/40 mb-8 uppercase">İş saatları</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-[11px] tracking-widest text-black/60 uppercase">
                    <span>Bazar ertəsi — Cümə</span>
                    <span className="font-bold text-black">08:00 — 18:00</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] tracking-widest text-black/60 uppercase">
                    <span>Şənbə</span>
                    <span className="font-bold text-black">09:00 — 15:00</span>
                  </div>
                  <div className="flex justify-between items-center text-[11px] tracking-widest text-black/60 uppercase">
                    <span>Bazar</span>
                    <span className="font-bold text-black/20">Bağlı</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 border border-black/5">
                <div className="w-16 h-[1px] bg-black mb-8" />
                <h3 className="text-2xl font-serif font-bold text-black mb-4 uppercase tracking-widest">
                  GÖNDƏRİLDİ
                </h3>
                <p className="text-[10px] tracking-widest text-black/40 uppercase">
                  TEZLİKLƏ SİZİNLƏ ƏLAQƏ SAXLANILACAQ
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] font-bold text-black/40 uppercase">
                      Ad, Soyad
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-transparent border-b border-black/10 py-4 text-sm tracking-widest outline-none focus:border-black transition-colors"
                      placeholder="DAXİL EDİN"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] tracking-[0.2em] font-bold text-black/40 uppercase">
                      Telefon
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-transparent border-b border-black/10 py-4 text-sm tracking-widest outline-none focus:border-black transition-colors"
                      placeholder="+994"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.2em] font-bold text-black/40 uppercase">
                    Texnika növü
                  </label>
                  <select
                    required
                    value={form.equipment}
                    onChange={(e) => setForm({ ...form, equipment: e.target.value })}
                    className="w-full bg-transparent border-b border-black/10 py-4 text-sm tracking-widest outline-none focus:border-black transition-colors appearance-none"
                  >
                    <option value="">SEÇİN</option>
                    <option>EKSKAVATOR</option>
                    <option>BULDOZER</option>
                    <option>KRAN</option>
                    <option>BETON NASOSU</option>
                    <option>YÜK MAŞINI</option>
                    <option>GENERATOR</option>
                    <option>KOMPAKTOR</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.2em] font-bold text-black/40 uppercase">
                    Mesaj
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent border-b border-black/10 py-4 text-sm tracking-widest outline-none focus:border-black transition-colors resize-none"
                    placeholder="QEYDLƏRİNİZ"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-black text-white text-[11px] font-black tracking-[0.4em] uppercase hover:bg-white hover:text-black border border-black transition-all duration-700"
                >
                  WHATSAPP ÜZƏRİNDƏN GÖNDƏR
                </button>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
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
    equipment: "",
    message: "",
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!form.name.trim()) newErrors.name = "Ad daxil edilməlidir";
    if (!form.phone.trim()) newErrors.phone = "Telefon daxil edilməlidir";
    if (!form.equipment) newErrors.equipment = "Texnika seçilməlidir";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const text = `Salam, mən ${form.name}. ${form.equipment} texnikası haqqında məlumat və qiymət təklifi almaq istəyirəm.\nTelefon: ${form.phone}\nMesaj: ${form.message}`;
      window.open(`https://wa.me/994501234567?text=${encodeURIComponent(text)}`, "_blank");
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: "", phone: "", equipment: "", message: "" });
      }, 4000);
    }
  };

  return (
    <section 
      id="contact" 
      ref={containerRef}
      className="relative py-32 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Contact Info */}
          <FadeIn direction="right" className="space-y-12">
            <div>
              <span className="text-[11px] tracking-[0.4em] font-black text-neutral-500 uppercase mb-4 block">Əlaqə Məlumatları</span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-8">Bizimlə Əlaqə Saxlayın</h2>
              <p className="text-lg text-black/60 font-medium mb-10 max-w-md">
                Hər hansı bir sualınız və ya xüsusi tələbiniz varsa, bizə birbaşa yazın və ya zəng edin.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-gray-50 flex items-center justify-center text-neutral-700 rounded-xl">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-[12px] font-black text-black/40 uppercase mb-1">Zəng Edin</h4>
                  <p className="text-lg font-bold text-black">*7766</p>
                  <p className="text-sm text-black/60">+994 50 123 45 67</p>
                </div>
              </div>
              <div className="flex gap-4">
                <a href="https://wa.me/994501234567" target="_blank" rel="noopener noreferrer" className="w-12 h-12 shrink-0 bg-gray-50 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="#333"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                </a>
                <div>
                  <h4 className="text-[12px] font-black text-black/40 uppercase mb-1">WhatsApp</h4>
                  <a href="https://wa.me/994501234567" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-black hover:text-black/70 transition-colors">
                    +994 50 123 45 67
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-gray-50 flex items-center justify-center text-neutral-700 rounded-xl">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-[12px] font-black text-black/40 uppercase mb-1">E-poçt</h4>
                  <p className="text-lg font-bold text-black">info@naf.az</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-gray-50 flex items-center justify-center text-neutral-700 rounded-xl">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-[12px] font-black text-black/40 uppercase mb-1">Ünvan</h4>
                  <p className="text-lg font-bold text-black">Bakı, Azərbaycan</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-gray-50 flex items-center justify-center text-neutral-700 rounded-xl">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="text-[12px] font-black text-black/40 uppercase mb-1">İş Saatları</h4>
                  <p className="text-lg font-bold text-black">09:00 — 18:00</p>
                  <p className="text-sm text-black/60">Bazar ertəsi — Şənbə</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Form */}
          <FadeIn direction="left" className="bg-[#f8f9fa] p-8 md:p-12 rounded-3xl border border-black/5 shadow-2xl relative overflow-hidden">
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={48} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-black text-black">Məlumat Göndərildi</h3>
                <p className="text-black/60 font-medium">Mütəxəssislərimiz ən qısa zamanda sizinlə əlaqə saxlayacaq.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-black/40 uppercase tracking-widest pl-1">Ad, Soyad</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => {
                        setForm({ ...form, name: e.target.value });
                        if (errors.name) setErrors({...errors, name: ""});
                      }}
                      className={`w-full bg-white border ${errors.name ? 'border-red-500' : 'border-black/5'} px-6 py-4 rounded-xl outline-none focus:border-neutral-700 transition-all text-sm`}
                      placeholder="Məs: Elvin Məmmədov"
                    />
                    {errors.name && <span className="text-[10px] text-red-500 font-bold pl-1">{errors.name}</span>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-black/40 uppercase tracking-widest pl-1">Telefon</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        if (errors.phone) setErrors({...errors, phone: ""});
                      }}
                      className={`w-full bg-white border ${errors.phone ? 'border-red-500' : 'border-black/5'} px-6 py-4 rounded-xl outline-none focus:border-neutral-700 transition-all text-sm`}
                      placeholder="Məs: +994 50 123 45 67"
                    />
                    {errors.phone && <span className="text-[10px] text-red-500 font-bold pl-1">{errors.phone}</span>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-black/40 uppercase tracking-widest pl-1">Texnika Növü</label>
                  <select
                    value={form.equipment}
                    onChange={(e) => {
                      setForm({ ...form, equipment: e.target.value });
                      if (errors.equipment) setErrors({...errors, equipment: ""});
                    }}
                    className={`w-full bg-white border ${errors.equipment ? 'border-red-500' : 'border-black/5'} px-6 py-4 rounded-xl outline-none focus:border-neutral-700 transition-all text-sm appearance-none cursor-pointer`}
                  >
                    <option value="">Kateqoriya seçin</option>
                    <option>Ekskavatorlar</option>
                    <option>Buldozerlər</option>
                    <option>Kranlar</option>
                    <option>Beton Nasosları</option>
                    <option>Yük Maşınları</option>
                    <option>Generatorlar</option>
                    <option>Kompaktorlar</option>
                    <option>Qaldırıcılar</option>
                  </select>
                  {errors.equipment && <span className="text-[10px] text-red-500 font-bold pl-1">{errors.equipment}</span>}
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-black/40 uppercase tracking-widest pl-1">Mesaj (İxtiyari)</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-white border border-black/5 px-6 py-4 rounded-xl outline-none focus:border-neutral-700 transition-all text-sm resize-none"
                    placeholder="Əlavə qeydləriniz və ya tələbləriniz..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-black text-white text-[12px] font-black tracking-[0.3em] uppercase hover:bg-neutral-700 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 shadow-xl shadow-black/10 group"
                >
                  <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Sifariş Formunu Göndər
                </button>
              </form>
            )}

            {/* Decorative background logo */}
            <div className="absolute -bottom-10 -right-10 opacity-[0.03] select-none pointer-events-none">
              <h2 className="text-[150px] font-black">NAF</h2>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

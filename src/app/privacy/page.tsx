"use client";

import FadeIn from "../../components/FadeIn";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PrivacyPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-40">
        <FadeIn>
          <span className="text-[12px] tracking-[0.4em] font-bold text-black/40 uppercase mb-8 block">HÜQUQİ MƏLUMAT</span>
          <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-black uppercase mb-16">
            MƏXFİLİK <br/> SİYASƏTİ
          </h1>
          <div className="w-24 h-[1px] bg-black mb-16" />
          
          <div className="space-y-12 text-[14px] leading-loose tracking-widest text-black/70 uppercase">
            <section>
              <h2 className="text-black font-black mb-6">1. MƏLUMATLARIN TOPLANMASI</h2>
              <p>
                SİFARİŞ ZAMANI DAXİL ETDİYİNİZ AD, SOYAD, TELEFON VƏ ÜNVAN MƏLUMATLARI YALNIZ XİDMƏTİN KEYFİYYƏTLİ TƏŞKİLİ ÜÇÜN İSTİFADƏ OLUNUR.
              </p>
            </section>
            
            <section>
              <h2 className="text-black font-black mb-6">2. TƏHLÜKƏSİZLİK</h2>
              <p>
                BÜTÜN MƏLUMATLARINIZ MÜASİR SSL ŞİFRƏLƏMƏ SİSTEMLƏRİ İLƏ QORUNUR VƏ ÜÇÜNCÜ ŞƏXSLƏRƏ QƏTİYYƏN ÖTÜRÜLMÜR.
              </p>
            </section>
            
            <section>
              <h2 className="text-black font-black mb-6">3. COOKIE (KUKİ) FAYLLARI</h2>
              <p>
                SAYTIMIZDA İSTİFADƏÇİ TƏCRÜBƏSİNİ YAXŞILAŞDIRMAQ ÜÇÜN ANONİM KUKİ FAYLLARINDAN İSTİFADƏ OLUNA BİLƏR.
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
      <Footer />
    </main>
  );
}

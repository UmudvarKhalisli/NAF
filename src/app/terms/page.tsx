"use client";

import FadeIn from "../../components/FadeIn";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TermsPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-40">
        <FadeIn>
          <span className="text-[12px] tracking-[0.4em] font-bold text-black/40 uppercase mb-8 block">MÜQAVİLƏ ŞƏRTLƏRİ</span>
          <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-black uppercase mb-16">
            İSTİFADƏ <br/> ŞƏRTLƏRİ
          </h1>
          <div className="w-24 h-[1px] bg-black mb-16" />
          
          <div className="space-y-12 text-[14px] leading-loose tracking-widest text-black/70 uppercase font-light">
            <section>
              <h2 className="text-black font-black mb-6">1. İCARƏ ŞƏRTLƏRİ</h2>
              <p>
                BÜTÜN TEXNİKALAR PEŞƏKAR OPERATORLARIMIZ İLƏ BİRLİKDƏ VƏ YALNIZ MÜQAVİLƏ ƏSASINDA İCARƏYƏ VERİLİR.
              </p>
            </section>
            
            <section>
              <h2 className="text-black font-black mb-6">2. ÖDƏNİŞ QAYDALARI</h2>
              <p>
                ÖDƏNİŞLƏR SİFARİŞ QƏBUL OLUNDUQDA VƏ YA MÜQAVİLƏDƏ QEYD OLUNAN ŞƏRTLƏR ƏSASINDA BANK VƏ YA NƏĞD ŞƏKİLDƏ HƏYATA KEÇİRİLİR.
              </p>
            </section>
            
            <section>
              <h2 className="text-black font-black mb-6">3. MƏSULİYYƏT</h2>
              <p>
                İSTİFADƏ ZAMANI TEXNİKAYA VURULAN ZƏRƏRLƏR VƏ TƏHLÜKƏSİZLİK QAYDALARI MÜQAVİLƏDƏKİ MUVAFİQ BƏNDLƏRƏ UYĞUN OLARAQ TƏNZİMLƏNİR.
              </p>
            </section>
          </div>
        </FadeIn>
      </div>
      <Footer />
    </main>
  );
}

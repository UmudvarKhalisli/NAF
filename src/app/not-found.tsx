import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Səhifə Tapılmadı',
  description: 'Axtardığınız səhifə tapılmadı və ya silinib.',
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <div className="bg-black">
        <Navbar />
      </div>

      <main className="flex-grow flex items-center justify-center pt-32 pb-24 px-6">
        <div className="max-w-3xl w-full text-center">
          {/* Large Backgroun Number */}
          <div className="relative mb-12">
            <h1 className="text-[12rem] md:text-[20rem] font-black leading-none text-black/[0.03] select-none">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center rotate-12 shadow-2xl">
                <Search size={40} className="text-white -rotate-12" />
              </div>
            </div>
          </div>

          <div className="space-y-6 relative z-10 -mt-12 md:-mt-24">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase">
              Səhifə Tapılmadı
            </h2>
            <p className="text-lg md:text-xl text-black/40 font-medium max-w-xl mx-auto leading-relaxed">
              Axtardığınız səhifə silinmiş ola bilər, adı dəyişdirilib və ya müvəqqəti olaraq əlçatmazdır.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 font-black uppercase tracking-widest text-sm rounded-xl hover:bg-neutral-800 transition-all border border-black shadow-xl shadow-black/10"
              >
                <Home size={18} />
                Ana Səhifəyə Qayıt
              </Link>
              <Link
                href="/texnikalar"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-black px-8 py-4 font-black uppercase tracking-widest text-sm rounded-xl hover:bg-neutral-50 transition-all border border-black/10"
              >
                <ArrowLeft size={18} />
                Kataloqa Bax
              </Link>
            </div>
          </div>

          {/* Decorative Construction Pattern */}
          <div className="mt-24 grid grid-cols-6 gap-2 md:gap-4 opacity-[0.03]">
             {[...Array(6)].map((_, i) => (
               <div key={i} className="aspect-square bg-black rounded-lg" />
             ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

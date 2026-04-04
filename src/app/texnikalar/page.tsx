import { supabase } from '@/lib/supabase/client';
import CatalogClient from './CatalogClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const revalidate = 60; // 1 minute revalidation

export default async function EquipmentCatalogPage() {
  const { data: equipment, error } = await supabase
    .from('equipment')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col">
      <div className="bg-black">
        <Navbar />
      </div>
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="mb-12 border-b border-black/5 pb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-black uppercase mb-2">
              TEXNİKALARIMIZ
            </h1>
            <p className="text-[10px] tracking-[0.4em] font-bold text-black/40 uppercase">
              BÜTÜN TEXNİKA PARKI
            </p>
          </div>

          {!error && equipment ? (
            <CatalogClient initialData={equipment} />
          ) : (
            <div className="text-center py-24 text-black/50 font-bold uppercase tracking-widest">
              Texnikalar yüklənərkən xəta baş verdi və ya siyahı boşdur.
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
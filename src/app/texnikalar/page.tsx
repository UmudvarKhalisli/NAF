import { supabase } from '@/lib/supabase/client';
import CatalogClient from './CatalogClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { DUMMY_EQUIPMENT } from '@/components/equipment/EquipmentGrid';
import type { Metadata } from 'next';

import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: "Texnikalar | Tikinti Texnikası İcarəsi",
  description: "İcarəyə verilən tikinti texnikalarına baxın. Kran, ekskavator, səbət maşını, forklift və digər xüsusi texnikalar NAF Texnika tərəfindən təqdim olunur.",
  canonical: "https://naftexnika.az/texnikalar"
});

export const revalidate = 60;

import BackButton from '@/components/ui/BackButton';

export default async function EquipmentCatalogPage() {
  const { data: equipment, error } = await supabase
    .from('equipment')
    .select('*')
    .order('created_at', { ascending: false });

  const displayData = (equipment && equipment.length > 0 && !error) ? equipment : DUMMY_EQUIPMENT;

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col">
      <div className="bg-black">
        <Navbar />
      </div>
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="mb-8">
            <BackButton href="/" />
          </div>
          <div className="mb-12 border-b border-black/5 pb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-black uppercase mb-2">
              İcarəyə Verilən Texnikalar
            </h1>
            <p className="text-[10px] tracking-[0.4em] font-bold text-black/40 uppercase">
              BÜTÜN TEXNİKA PARKI
            </p>
          </div>

          <CatalogClient initialData={displayData} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
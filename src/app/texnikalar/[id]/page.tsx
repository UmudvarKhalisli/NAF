import { supabase } from '@/lib/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 60;

export default async function EquipmentDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const { data: equipment } = await supabase
    .from('equipment')
    .select('*')
    .eq('id', id)
    .single();

  if (!equipment) {
    return notFound();
  }

  // Create a WhatsApp link based on the equipment name
  const whatsappMsg = `Salam, mən ${equipment.name} (${equipment.category}) növlü texnika haqqında maraqlanıram. Qiyməti saytda ${equipment.price} AZN / ${equipment.price_unit} olaraq göstərilib.`;
  const whatsappUrl = `https://wa.me/994501234567?text=${encodeURIComponent(whatsappMsg)}`;

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col">
      <div className="bg-black">
        <Navbar />
      </div>
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          
          <div className="mb-8">
            <Link href="/texnikalar" className="text-xs font-black tracking-widest uppercase text-black/50 hover:text-black transition-colors flex items-center gap-2">
              <span>←</span> Gerİ Qayıt
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
            {/* Image Gallery Area */}
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[4/3] w-full bg-black/5 border border-black/10 overflow-hidden">
                {equipment.image_url ? (
                  <Image 
                    src={equipment.image_url} 
                    alt={equipment.name} 
                    fill 
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-black text-black/20 uppercase tracking-widest">Şəkil yoxdur</div>
                )}
              </div>
            </div>

            {/* Info Area */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-black text-white">
                  {equipment.category}
                </span>
                <span className={`px-3 py-1 text-[10px] font-black tracking-widest uppercase ${
                  equipment.status === 'available' ? 'bg-green-500/10 text-green-600 border border-green-500/20' : 
                  equipment.status === 'rented' ? 'bg-red-500/10 text-red-600 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-600 border border-yellow-500/20'
                }`}>
                  {equipment.status === 'available' ? 'Mövcuddur' : equipment.status === 'rented' ? 'İcarədədir' : 'Təmirə Ehtiyacı Var'}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tighter uppercase mb-6">
                {equipment.name}
              </h1>

              <div className="mb-8 border-b border-t border-black/10 py-6 flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-black text-[#FFBD59]">{equipment.price}₼</span>
                <span className="text-sm font-bold uppercase tracking-widest text-black/40">/ {equipment.price_unit}</span>
              </div>

              {equipment.description && (
                <div className="mb-10 text-sm md:text-base text-black/70 leading-relaxed font-medium">
                  {equipment.description}
                </div>
              )}

              {/* Order Button */}
              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center bg-black text-white py-5 px-8 font-black uppercase tracking-widest text-sm hover:bg-[#FFBD59] hover:text-black transition-colors"
              >
                WHATSAPP TƏSİQİLƏ İCARƏYƏ GÖTÜR
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
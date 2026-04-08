import { supabase } from '@/lib/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { DUMMY_EQUIPMENT } from '@/components/equipment/EquipmentGrid';

export const revalidate = 60;

export default async function EquipmentDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  // Try Supabase first
  let equipment: any = null;
  
  const { data } = await supabase
    .from('equipment')
    .select('*')
    .eq('id', id)
    .single();
  
  if (data) {
    equipment = data;
  } else {
    // Fallback to dummy data
    const dummy = DUMMY_EQUIPMENT.find(e => e.id === id);
    if (dummy) {
      equipment = dummy;
    }
  }

  if (!equipment) {
    return notFound();
  }

  const whatsappMsg = `Salam, mən ${equipment.name} (${equipment.category}) növlü texnika haqqında maraqlanıram. Qiyməti saytda ${equipment.price} AZN / ${equipment.price_unit} olaraq göstərilib.`;
  const whatsappUrl = `https://wa.me/994509627766?text=${encodeURIComponent(whatsappMsg)}`;

  const isAvailable = equipment.status === 'available';

  // Parse specs
  const specs = equipment.specs && typeof equipment.specs === 'object' ? equipment.specs : {};

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
            {/* Image */}
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[4/3] w-full bg-black/5 border border-black/10 overflow-hidden rounded-2xl">
                {equipment.image_url ? (
                  equipment.image_url.startsWith('/') ? (
                    <img 
                      src={equipment.image_url} 
                      alt={equipment.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image 
                      src={equipment.image_url} 
                      alt={equipment.name} 
                      fill 
                      className="object-cover"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-black text-black/20 uppercase tracking-widest">Şəkil yoxdur</div>
                )}

                {!isAvailable && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <span className="bg-white text-black text-sm font-black tracking-[0.2em] uppercase px-6 py-3 rounded-xl">
                      Məşğuldur
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="px-3 py-1.5 text-[10px] font-black tracking-widest uppercase bg-black text-white rounded-lg">
                  {equipment.category}
                </span>
                <span className={`px-3 py-1.5 text-[10px] font-black tracking-widest uppercase rounded-lg ${
                  isAvailable 
                    ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
                    : 'bg-red-500/10 text-red-600 border border-red-500/20'
                }`}>
                  {isAvailable ? 'Mövcuddur' : 'İcarədədir'}
                </span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-6">
                {equipment.name}
              </h1>

              <div className="mb-8 border-b border-t border-black/10 py-6 flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-black text-black">{equipment.price}₼</span>
                <span className="text-sm font-bold uppercase tracking-widest text-black/40">/ {equipment.price_unit}</span>
              </div>

              {equipment.description && (
                <div className="mb-8 text-sm md:text-base text-black/70 leading-relaxed font-medium">
                  {equipment.description}
                </div>
              )}

              {/* Specs */}
              {Object.keys(specs).length > 0 && (
                <div className="mb-8 grid grid-cols-2 gap-4">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="bg-white border border-black/5 rounded-xl p-4">
                      <p className="text-[10px] font-black text-black/30 uppercase tracking-widest mb-1">{key}</p>
                      <p className="text-base font-black text-black">{String(value)}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Order Button */}
              {isAvailable ? (
                <a 
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-black text-white py-4 px-8 font-black uppercase tracking-widest text-sm hover:bg-neutral-700 transition-colors rounded-xl"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                  Sifariş Et
                </a>
              ) : (
                <div className="w-full sm:w-auto inline-flex items-center justify-center bg-neutral-200 text-neutral-500 py-4 px-8 font-black uppercase tracking-widest text-sm rounded-xl cursor-not-allowed">
                  Hal-hazırda məşğuldur
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import AboutUs from "@/components/AboutUs";
import EquipmentGrid from "@/components/equipment/EquipmentGrid";
import WhyUs from "@/components/WhyUs";
import ContactForm from "@/components/ContactForm";      
import Footer from "@/components/Footer";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      
      <section className="w-full py-24 md:py-32 bg-white" id="equipment">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-black/5 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-black uppercase mb-2">
                TEXNİKALARIMIZ
              </h2>
              <p className="text-[10px] tracking-[0.4em] font-bold text-black/40 uppercase">TEXNİKA PARKI</p>
            </div>
            <Link 
              href="/texnikalar" 
              className="group inline-flex items-center gap-4 bg-black text-white px-8 py-5 hover:bg-neutral-700 transition-all duration-300"
            >
              <span className="text-[12px] font-black tracking-[0.2em] relative top-[1px] uppercase">
                BÜTÜN TEXNİKALARA BAX
              </span>
            </Link>
          </div>
          
          <EquipmentGrid limit={6} featuredOnly={true} />
        </div>
      </section>

      <Categories />
      <WhyUs />
      <ContactForm />
      <Footer />
    </>
  );
}

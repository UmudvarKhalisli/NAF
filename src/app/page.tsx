import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import AboutUs from "@/components/AboutUs";
import EquipmentGrid from "@/components/equipment/EquipmentGrid";
import WhyUs from "@/components/WhyUs";
import ContactForm from "@/components/ContactForm";      
import Footer from "@/components/Footer";
import Link from 'next/link';

import ProjectsSection from "@/components/projects/ProjectsSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutUs />
      
      <section className="w-full py-24 md:py-32 bg-white border-t border-black/5" id="equipment">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[11px] tracking-[0.4em] font-black text-neutral-500 uppercase mb-6 block">
              Texnika Parkı
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-8">
              Texnikalarımız
            </h2>
            <div className="w-16 h-[3px] bg-black mx-auto" />
          </div>
          
          <EquipmentGrid limit={6} featuredOnly={true} />

          <div className="flex justify-center mt-14">
            <Link 
              href="/texnikalar" 
              className="group relative inline-flex items-center gap-0 overflow-hidden border border-black/10 hover:border-black transition-all duration-500 hover:shadow-lg"
            >
              <span className="px-8 py-4 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-500 group-hover:px-6">
                Bütün Texnikalara Bax
              </span>
              <span className="w-0 group-hover:w-12 overflow-hidden transition-all duration-500 flex items-center justify-center bg-black text-white h-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <ProjectsSection />

      <Categories />
      <WhyUs />
      <ContactForm />
      <Footer />
    </>
  );
}

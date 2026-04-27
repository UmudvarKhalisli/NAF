import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { constructMetadata } from '@/lib/seo';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/FadeIn';
import JsonLd from '@/components/JsonLd';
import BackButton from '@/components/ui/BackButton';
import { supabase } from '@/lib/supabase/client';
import Image from 'next/image';
import { FALLBACK_PROJECTS } from '@/data/fallback-projects';
import { MapPin, User, Calendar, Briefcase, ArrowRight } from 'lucide-react';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { id } = await params;
  
  // Try fallback first for speed/SEO if it's a known project
  const fallback = FALLBACK_PROJECTS.find(p => p.id === id);
  if (fallback) {
    return constructMetadata({
      title: `${fallback.title} | NAF Layihələr`,
      description: fallback.description,
      canonical: `https://naftexnika.az/layiheler/${id}`
    });
  }

  const { data: project } = await supabase
    .from('projects')
    .select('title, description')
    .eq('id', id)
    .single();

  if (project) {
    return constructMetadata({
      title: `${project.title} | NAF Layihələr`,
      description: project.description || `${project.title} layihəsi haqqında ətraflı məlumat.`,
      canonical: `https://naftexnika.az/layiheler/${id}`
    });
  }

  return {};
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;

  let project: any = null;

  // Try DB
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (data) {
    project = data;
  } else {
    // Try Fallback
    project = FALLBACK_PROJECTS.find(p => p.id === id);
  }

  if (!project) {
    return notFound();
  }

  const isCompleted = project.status === 'completed';

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Project",
    "name": project.title,
    "description": project.description,
    "location": {
      "@type": "Place",
      "name": project.location
    },
    "provider": {
      "@type": "Organization",
      "name": "NAF Texnika",
      "url": "https://naftexnika.az"
    }
  };

  const infoItems = [
    { label: 'Məkan', value: project.location, icon: MapPin },
    { label: 'Müştəri', value: project.client || 'Dövlət Layihəsi', icon: User },
    { label: 'Tarix', value: project.start_date || 'Qarabağ Dirçəliş', icon: Calendar },
    { label: 'Status', value: isCompleted ? 'Tamamlandı' : 'Davam Edir', icon: Briefcase, color: isCompleted ? 'text-emerald-500' : 'text-amber-500' },
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <JsonLd data={schemaData} />
      <div className="bg-black">
        <Navbar />
      </div>

      <main className="flex-grow">
        {/* Immersive Hero Section */}
        <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">
            {/* Blurred Background Overlay */}
            <div className="absolute inset-0 z-0">
                <Image 
                    src={project.cover_image_url || '/images/project-placeholder.jpg'}
                    alt={`NAF Texnika ${project.title} İcarəsi Bakı`}
                    fill
                    className="object-cover opacity-30 blur-2xl scale-110"
                    priority
                />
            </div>
            
            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10 w-full h-full flex flex-col justify-end pb-20">
                <FadeIn direction="up">
                    <div className="mb-8">
                        <BackButton href="/#layiheler" className="text-white border-white/20 hover:bg-white/10" />
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white leading-tight mb-6 tracking-tighter uppercase italic">
                        {project.title}
                    </h1>
                </FadeIn>
            </div>
            
            {/* Floating Image element */}
            <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block z-5">
                <div className="relative w-full h-full">
                    <Image 
                        src={project.cover_image_url || '/images/project-placeholder.jpg'}
                        alt={`NAF Texnika ${project.title} İcarəsi Bakı`}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent" />
                </div>
            </div>
        </section>

        {/* Project Content Section */}
        <section className="relative z-20 -mt-20 bg-white rounded-t-[40px] md:rounded-t-[80px] pt-20 pb-32">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    
                    {/* Left Column: Description */}
                    <div className="lg:col-span-7">
                        <FadeIn>
                            <h2 className="text-[11px] font-black tracking-[0.4em] text-neutral-400 uppercase mb-8">Layihə Haqqında</h2>
                            <div className="text-xl md:text-2xl text-black/80 font-medium leading-[1.6] mb-12">
                                {project.description}
                            </div>
                            
                            <div className="p-8 bg-[#fafafa] border border-black/5 rounded-3xl mb-12">
                                <h3 className="text-lg font-black mb-4">Texnika Təminatı</h3>
                                <p className="text-black/60 font-medium leading-relaxed">
                                    NAF Texnika bu layihə üçün yüksək performanslı sənaye avadanlıqları və peşəkar operator heyəti təmin etmişdir. Layihənin vaxtında və keyfiyyətlə tamamlanması üçün ən müasir texnologiyalardan istifadə olunmuşdur.
                                </p>
                            </div>
                        </FadeIn>
                    </div>

                    {/* Right Column: Info Grid */}
                    <div className="lg:col-span-5">
                        <FadeIn direction="left" delay={0.2}>
                            <div className="sticky top-32">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {infoItems.map((item, idx) => (
                                        <div key={idx} className="bg-white border border-black/10 p-6 rounded-2xl hover:border-black transition-all group">
                                            <div className="mb-4 text-neutral-300 group-hover:text-black transition-colors">
                                                <item.icon size={24} />
                                            </div>
                                            <p className="text-[10px] font-black text-black/30 uppercase tracking-[0.2em] mb-1">{item.label}</p>
                                            <p className={`text-sm font-black text-black leading-tight ${item.color || ''}`}>
                                                {item.value}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                                
                                <a 
                                    href={`https://wa.me/994509627766?text=${encodeURIComponent(`Salam, "${project.title}" layihəsi ilə maraqlanıram.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-8 w-full py-6 bg-black text-white text-center font-black uppercase tracking-[0.2em] text-[11px] rounded-2xl hover:bg-neutral-800 transition-all flex items-center justify-center gap-3"
                                >
                                    Bənzər Layihə Üçün Müraciət ET
                                    <ArrowRight size={16} />
                                </a>
                            </div>
                        </FadeIn>
                    </div>

                </div>
            </div>
        </section>

        <div className="bg-[#fafafa]">
            <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}

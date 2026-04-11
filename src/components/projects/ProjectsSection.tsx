import { supabase } from '@/lib/supabase/client';
import ProjectCard from './ProjectCard';
import Link from 'next/link';

export default async function ProjectsSection() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, title, location, status, cover_image_url')
    .eq('is_published', true)
    .order('created_at', { ascending: false })
    .limit(6);

  const FALLBACK_PROJECTS = [
    {
      id: 'road-reconstruction',
      title: 'Bakı-Quba Yolunun Yenidən Qurulması',
      location: 'Bakı-Quba Şosesi',
      status: 'ongoing',
      cover_image_url: '/images/projects/road.png'
    },
    {
      id: 'white-city-foundation',
      title: 'Ağ Şəhər Bünövrə Qazıntı İşləri',
      location: 'Bakı, Ağ Şəhər',
      status: 'completed',
      cover_image_url: '/images/projects/white-city.png'
    },
    {
      id: 'stp-industrial',
      title: 'STP Sənaye Obyektinin Tikintisi',
      location: 'Sumqayıt',
      status: 'completed',
      cover_image_url: '/images/projects/stp.png'
    }
  ];

  const displayProjects = hasProjects ? projects : FALLBACK_PROJECTS;

  return (
    <section className="w-full py-24 md:py-32 bg-[#fafafa] border-t border-black/5" id="layiheler">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[11px] tracking-[0.4em] font-black text-neutral-500 uppercase mb-6 block">
            İşlərimiz
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-black mb-8">
            Son Layihələrimiz
          </h2>
          <p className="text-black/40 text-[11px] font-bold tracking-[0.2em] uppercase max-w-2xl mx-auto">
            Tikinti texnikasının real layihələrdə tətbiqi və mühəndislik həllərimiz.
          </p>
          <div className="w-16 h-[3px] bg-black mx-auto mt-8" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProjects.map((project) => (
            <ProjectCard key={project.id} project={project as any} />
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <Link 
            href="/layiheler" 
            className="group relative inline-flex items-center gap-0 overflow-hidden border border-black/10 hover:border-black transition-all duration-500 hover:shadow-lg bg-white"
          >
            <span className="px-10 py-5 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-500 group-hover:px-8">
              Bütün Layihələrə Bax
            </span>
            <span className="w-0 group-hover:w-14 overflow-hidden transition-all duration-500 flex items-center justify-center bg-black text-white h-full absolute right-0 top-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </span>
            <span className="w-0 group-hover:w-14 transition-all duration-500" />
          </Link>
        </div>
      </div>
    </section>
  );
}

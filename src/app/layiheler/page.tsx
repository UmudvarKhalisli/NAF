import type { Metadata } from 'next';
import { supabase } from '@/lib/supabase/client';
import { FALLBACK_PROJECTS } from '@/data/fallback-projects';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/projects/ProjectCard';
import FadeIn from '@/components/FadeIn';
import { constructMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = constructMetadata({
  title: 'Bütün Layihələr | NAF Texnika',
  description: 'Azərbaycanın müxtəlif bölgələrində icra etdiyimiz infrastruktur, dövlət və sənaye layihələri haqqında ətraflı məlumat.',
  canonical: 'https://naftexnika.az/layiheler'
});

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, title, location, status, cover_image_url, is_featured, sort_order')
    .eq('is_published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  const hasProjects = !!(projects && projects.length > 0 && !error);
  
  const displayProjects = hasProjects 
    ? projects 
    : FALLBACK_PROJECTS;

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col">
      <div className="bg-black">
        <Navbar />
      </div>

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          
          <header className="mb-20">
            <FadeIn>
              <span className="text-[11px] tracking-[0.4em] font-black text-neutral-500 uppercase mb-6 block">
                Portfoliomuz
              </span>
              <h1 className="text-4xl md:text-7xl font-black tracking-tight text-black mb-8 max-w-4xl">
                Böyük Layihələrdə <br/> Güclü Tərəfdaş
              </h1>
              <div className="w-24 h-1 bg-black" />
            </FadeIn>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, idx) => (
              <FadeIn key={project.id} delay={idx * 0.05}>
                <ProjectCard project={project as any} />
              </FadeIn>
            ))}
          </div>

        </div>
        
        <div className="mt-32">
          <ContactForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}

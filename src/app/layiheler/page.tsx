import { supabase } from '@/lib/supabase/client';
import ProjectCard from '@/components/projects/ProjectCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const revalidate = 60; // 1 minute revalidation

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('id, title, location, status, cover_image_url')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col">
      <div className="bg-black">
        <Navbar />
      </div>
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="mb-12 border-b border-black/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-black uppercase mb-2">
                LAYİHƏLƏRİMİZ
              </h1>
              <p className="text-[10px] tracking-[0.4em] font-bold text-black/40 uppercase">
                İCRA ETDİYİMİZ İŞLƏR VƏ HƏLLƏR
              </p>
            </div>
            <div className="flex gap-4">
              <span className="w-12 h-1 bg-black hidden md:block mt-auto mb-2" />
            </div>
          </div>

          {!error && projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project as any} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-dashed border-black/10 text-black/40 font-bold uppercase tracking-widest text-sm flex flex-col items-center gap-4">
              {error ? "Layihələr yüklənərkən xəta baş verdi" : "Hazırda qeydiyyatda olan layihə yoxdur"}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
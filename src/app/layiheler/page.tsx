"use client";

import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase/client';
import ProjectCard from '@/components/projects/ProjectCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FALLBACK_PROJECTS } from '@/data/fallback-projects';
import BackButton from '@/components/ui/BackButton';
import FadeIn from '@/components/FadeIn';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('id, title, location, status, cover_image_url, is_featured, sort_order, created_at')
          .eq('is_published', true)
          .order('is_featured', { ascending: false })
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          // Fallbacks are already prioritized in the file but combined here
          setProjects(data);
        } else {
          setProjects(FALLBACK_PROJECTS.filter(p => !p.is_featured || p.is_featured));
        }
      } catch (err) {
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const hasMore = visibleCount < projects.length;

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
          <div className="mb-12 border-b border-black/5 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase mb-2">
                LAYİHƏLƏRİMİZ
              </h1>
              <p className="text-[10px] tracking-[0.4em] font-bold text-black/40 uppercase">
                İCRA ETDİYİMİZ İŞLƏR VƏ HƏLLƏR
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="aspect-video bg-neutral-200 animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.slice(0, visibleCount).map((project, idx) => (
                  <FadeIn key={project.id} delay={idx * 0.1}>
                    <ProjectCard project={project as any} />
                  </FadeIn>
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-16">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 6)}
                    className="group relative inline-flex items-center gap-0 overflow-hidden border border-black/10 hover:border-black transition-all duration-500 hover:shadow-lg bg-white"
                  >
                    <span className="px-10 py-5 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-500 group-hover:px-8">
                      Daha çox göstər
                    </span>
                    <span className="w-0 group-hover:w-14 overflow-hidden transition-all duration-500 flex items-center justify-center bg-black text-white h-full absolute right-0 top-0">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m5 12 7 7 7-7"/></svg>
                    </span>
                    <span className="w-0 group-hover:w-14 transition-all duration-500" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
import { FALLBACK_PROJECTS } from '@/data/fallback-projects';

export const revalidate = 60;

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  
  // Try to find in database first
  const { data: dbProject } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  // If not in database, check fallback projects
  const fallbackProject = !dbProject ? FALLBACK_PROJECTS.find(p => p.id === id) : null;
  
  const project = dbProject || fallbackProject;

  if (!project) {
    return notFound();
  }

  return (
    <div className="bg-[#fafafa] min-h-screen flex flex-col">
      <div className="bg-black">
        <Navbar />
      </div>
      
      <main className="flex-grow pt-24">
        {/* Hero Image */}
        <div className="w-full h-[50vh] md:h-[70vh] relative bg-black">
          {project.cover_image_url && (
            <Image 
              src={project.cover_image_url} 
              alt={project.title} 
              fill 
              className="object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.2em] mb-4 uppercase bg-white text-black">
              {project.status === 'completed' ? 'Tamamlandı' : 'Davam Edir'}
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-black text-white uppercase tracking-tighter">
              {project.title}
            </h1>
            <p className="mt-4 text-sm md:text-base text-white/70 font-bold uppercase tracking-widest max-w-2xl">
              {project.location} {project.client ? `• Sifarişçi: ${project.client}` : ''}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1000px] mx-auto px-6 py-20 pb-32">
          {project.description && (
            <div className="prose prose-lg w-full max-w-none mb-16 text-black/80">
              <h2 className="text-2xl font-black uppercase tracking-wider mb-6">Layihə Haqqında</h2>
              <p className="whitespace-pre-line leading-relaxed">{project.description}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 border-t border-b border-black/10 py-10 gap-8">
            <div>
              <p className="text-[10px] font-bold tracking-widest text-black/40 uppercase mb-2">Yerləşmə</p>
              <p className="font-bold text-black uppercase tracking-wide">{project.location}</p>
            </div>
            {project.client && (
              <div>
                <p className="text-[10px] font-bold tracking-widest text-black/40 uppercase mb-2">Sifarişçi</p>
                <p className="font-bold text-black uppercase tracking-wide">{project.client}</p>
              </div>
            )}
            <div>
              <p className="text-[10px] font-bold tracking-widest text-black/40 uppercase mb-2">Tarix</p>
              <p className="font-bold text-black uppercase tracking-wide">
                {project.start_date ? new Date(project.start_date).getFullYear() : 'Bilinmir'}
              </p>
            </div>
          </div>
          
          <div className="mt-16 flex justify-center">
            <Link href="/layiheler" className="px-8 py-4 bg-black text-white text-xs font-black uppercase tracking-widest hover:bg-neutral-700 transition-colors">
              GERİ QAYIT
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
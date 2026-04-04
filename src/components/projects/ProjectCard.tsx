import React from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  location: string;
  status: string;
  cover_image_url: string;
}

export default function ProjectCard({ project }: { project: Project }) {
  const isCompleted = project.status === 'completed';

  return (
    <Link href={`/layiheler/${project.id}`} className="group relative block overflow-hidden aspect-video bg-black">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-40"
        style={{ backgroundImage: `url(${project.cover_image_url || '/images/project-placeholder.jpg'})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        <span className={`px-3 py-1 text-[10px] font-black tracking-widest uppercase ${isCompleted ? 'bg-green-500 text-black' : 'bg-white text-black'} `}>
          {isCompleted ? 'Tamamlandı' : 'Davam Edir'}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <p className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mb-2">
          {project.location}
        </p>
        <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-neutral-300 transition-colors">
          {project.title}
        </h3>
        
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span className="text-[10px] font-black tracking-[0.2em] text-white uppercase">
            Ətraflı Bax
          </span>
          <span className="w-6 h-[1px] bg-white transform translate-x-[-10px] group-hover:translate-x-0 transition-transform duration-500 delay-200" />
        </div>
      </div>
    </Link>
  );
}
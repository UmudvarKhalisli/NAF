"use client";

import { useState, useEffect } from 'react';
import { Plus, Search, Edit3, Trash2, X, ImagePlus, Globe, Loader2, Star, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import UploadWidget from '@/components/admin/UploadWidget';

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);

  const emptyForm = {
    title: '',
    location: '',
    client: '',
    status: 'ongoing',
    is_published: true,
    is_featured: false,
    sort_order: 999,
    cover_image_url: '',
    description: '',
    start_date: new Date().toISOString().split('T')[0]
  };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/projects');
    if(res.ok) setProjects(await res.json());
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Layihəni silmək istədiyinizə əminsiniz?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editItem ? 'PUT' : 'POST';
    const url = editItem ? `/api/admin/projects/${editItem.id}` : '/api/admin/projects';

    const payload: any = { ...formData };
    payload.sort_order = Number(payload.sort_order) || 999;
    
    // Clean payload
    delete payload.id;
    delete payload.created_at;

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const err = await res.json();
        alert("Xəta baş verdi: " + (err.error || 'Naməlum xəta'));
        return;
    }

    setIsModalOpen(false);
    setEditItem(null);
    fetchProjects();
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    setFormData({
        ...emptyForm,
        ...item,
        start_date: item.start_date ? item.start_date.split('T')[0] : emptyForm.start_date
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-1">LAYİHƏLƏR</h1>
          <p className="text-sm font-bold text-white/40 tracking-widest uppercase">PORTFOLİO VƏ İŞLƏR</p>
        </div>
        <button onClick={() => {setEditItem(null); setFormData(emptyForm); setIsModalOpen(true)}} className="bg-[#f59e0b] text-black px-6 py-3 font-black text-xs tracking-widest uppercase rounded-xl hover:bg-[#d97706] transition-colors flex items-center justify-center gap-2">
          <Plus size={16} /> YENİ LAYİHƏ
        </button>
      </div>

      <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/20 text-[10px] uppercase font-black text-white/50 tracking-widest border-b border-white/5">
                <th className="p-4">Şəkil</th>
                <th className="p-4">Başlıq / Yer</th>
                <th className="p-4">Sıra</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Önə Ç.</th>
                <th className="p-4 text-center">Yayında</th>
                <th className="p-4 text-right">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={7} className="p-8 text-center text-[#f59e0b]"><Loader2 className="animate-spin mx-auto"/></td></tr>
              ) : projects.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center text-white/50 uppercase font-black tracking-widest">Heç nə tapılmadı</td></tr>
              ) : projects.map((item, idx) => (
                <motion.tr initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={item.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-4">
                    <div className="w-20 h-12 bg-black rounded overflow-hidden relative">
                      {item.cover_image_url ? <Image src={item.cover_image_url} alt="" fill className="object-cover" /> : <ImagePlus size={16} className="text-white/20 absolute inset-0 m-auto"/>}
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-white font-bold">{item.title}</p>
                    <p className="text-[10px] text-white/40 uppercase font-black tracking-widest mt-1">{item.location}</p>
                  </td>
                  <td className="p-4 font-mono text-xs text-white/40">{item.sort_order ?? 999}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[10px] rounded uppercase font-black tracking-widest ${item.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>{item.status}</span>
                  </td>
                  <td className="p-4 text-center">
                    {item.is_featured && <Star className="text-yellow-500 mx-auto fill-yellow-500" size={14}/>}
                  </td>
                  <td className="p-4 text-center">
                    {item.is_published ? <Globe className="text-blue-500 mx-auto" size={16}/> : <span className="text-white/20">-</span>}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(item)} className="p-2 bg-blue-500/10 text-blue-500 rounded hover:bg-blue-500/20 transition-colors"><Edit3 size={14}/></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20 transition-colors"><Trash2 size={14}/></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#1a1a1a] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-hidden z-10 flex flex-col">
              <div className="p-6 border-b border-white/10 flex justify-between items-center shrink-0">
                <h2 className="text-xl font-black text-white uppercase tracking-widest">{editItem ? 'Layihəyə Düzəliş Et' : 'Yeni Layihə Əlavə Et'}</h2>
                <button type="button" onClick={() => setIsModalOpen(false)} className="text-white/50 hover:text-white transition-colors">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="md:col-span-2">
                    <label className="block text-[10px] text-white/50 tracking-[0.2em] font-black uppercase mb-2">Layihə Başlığı *</label>
                    <input type="text" required value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full bg-[#2a2a2a] text-white p-4 rounded-xl border-none outline-none focus:ring-1 focus:ring-[#f59e0b]/50" />
                  </div>

                  <div>
                    <label className="block text-[10px] text-white/50 tracking-[0.2em] font-black uppercase mb-2">Yerləşmə / Ünvan</label>
                    <div className="relative">
                        <Globe size={16} className="absolute left-4 top-4 text-white/20"/>
                        <input type="text" value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} className="w-full bg-[#2a2a2a] text-white p-4 pl-12 rounded-xl border-none outline-none focus:ring-1 focus:ring-[#f59e0b]/50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-white/50 tracking-[0.2em] font-black uppercase mb-2">Sifarişçi (Müştəri)</label>
                    <div className="relative">
                        <User size={16} className="absolute left-4 top-4 text-white/20"/>
                        <input type="text" value={formData.client} onChange={e=>setFormData({...formData, client: e.target.value})} className="w-full bg-[#2a2a2a] text-white p-4 pl-12 rounded-xl border-none outline-none focus:ring-1 focus:ring-[#f59e0b]/50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-white/50 tracking-[0.2em] font-black uppercase mb-2">Başlama Tarixi</label>
                    <div className="relative">
                        <Calendar size={16} className="absolute left-4 top-4 text-white/20"/>
                        <input type="date" value={formData.start_date} onChange={e=>setFormData({...formData, start_date: e.target.value})} className="w-full bg-[#2a2a2a] text-white p-4 pl-12 rounded-xl border-none outline-none focus:ring-1 focus:ring-[#f59e0b]/50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-white/50 tracking-[0.2em] font-black uppercase mb-2">Layihə Statusu</label>
                    <select value={formData.status} onChange={e=>setFormData({...formData, status: e.target.value})} className="w-full bg-[#2a2a2a] text-white p-4 rounded-xl border-none outline-none focus:ring-1 focus:ring-[#f59e0b]/50 appearance-none cursor-pointer">
                      <option value="ongoing">Davam edir</option>
                      <option value="completed">Tamamlandı</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[10px] text-white/50 tracking-[0.2em] font-black uppercase mb-2">Təfərrüatlı Məlumat (Storytelling)</label>
                    <textarea value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} rows={5} className="w-full bg-[#2a2a2a] text-white p-4 rounded-xl border-none outline-none focus:ring-1 focus:ring-[#f59e0b]/50 resize-none" placeholder="Layihənin gedişatı, görülən işlər və NAF Texnikanın rolu haqqında peşəkar məlumat..." />
                  </div>

                  <div className="md:col-span-2">
                    <UploadWidget label="Layihə Şəkli (Premium Shot)" folder="projects" defaultImage={formData.cover_image_url} onUpload={(url) => setFormData({...formData, cover_image_url: url})} />
                  </div>

                  <div>
                    <label className="block text-[10px] text-white/50 tracking-[0.2em] font-black uppercase mb-2">Sıralama (1 = İlk sırada)</label>
                    <input type="number" value={formData.sort_order} onChange={e=>setFormData({...formData, sort_order: parseInt(e.target.value)})} className="w-full bg-[#2a2a2a] text-white p-4 rounded-xl border-none outline-none focus:ring-1 focus:ring-[#f59e0b]/50" />
                  </div>

                  <div className="flex flex-col justify-center gap-4">
                    <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                        <input type="checkbox" checked={formData.is_featured} onChange={e=>setFormData({...formData, is_featured: e.target.checked})} className="w-5 h-5 accent-[#f59e0b] rounded" />
                        <span className="text-[10px] text-white font-black uppercase tracking-widest">Önə Çıxar (Landing Page)</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-white/5 rounded-xl cursor-pointer hover:bg-white/10 transition-colors">
                        <input type="checkbox" checked={formData.is_published} onChange={e=>setFormData({...formData, is_published: e.target.checked})} className="w-5 h-5 accent-[#f59e0b] rounded" />
                        <span className="text-[10px] text-white font-black uppercase tracking-widest">Portfolioda Yayımla</span>
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 flex justify-end">
                   <button type="submit" className="bg-[#f59e0b] text-black px-10 py-5 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#d97706] transition-all shadow-xl shadow-[#f59e0b]/10 active:scale-95">
                    Yadda Saxla
                   </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";

import { useState, useEffect } from 'react';
import { Plus, Search, Edit3, Trash2, X, ImagePlus, Globe, Loader2 } from 'lucide-react';
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
    is_published: false,
    cover_image_url: '',
    description: ''
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

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    setIsModalOpen(false);
    setEditItem(null);
    fetchProjects();
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    setFormData(item);
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
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Yayında</th>
                <th className="p-4 text-right">Əməliyyatlar</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {loading ? (
                <tr><td colSpan={5} className="p-8 text-center text-[#f59e0b]"><Loader2 className="animate-spin mx-auto"/></td></tr>
              ) : projects.length === 0 ? (
                <tr><td colSpan={5} className="p-8 text-center text-white/50 uppercase font-black tracking-widest">Heç nə tapılmadı</td></tr>
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
                  <td className="p-4">
                    <span className={`px-2 py-1 text-[10px] rounded uppercase font-black tracking-widest ${item.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>{item.status}</span>
                  </td>
                  <td className="p-4 text-center">
                    {item.is_published ? <Globe className="text-blue-500 mx-auto" size={16}/> : <span className="text-white/20">-</span>}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <button onClick={() => openEdit(item)} className="p-2 bg-blue-500/10 text-blue-500 rounded"><Edit3 size={14}/></button>
                      <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/10 text-red-500 rounded"><Trash2 size={14}/></button>
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
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#1a1a1a] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-10">
              <form onSubmit={handleSave} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 border-b border-white/10 pb-4 mb-2 flex justify-between">
                   <h2 className="text-xl font-black text-white">{editItem ? 'Düzəliş' : 'Yeni Layihə'}</h2>
                   <button type="button" onClick={() => setIsModalOpen(false)}><X size={20} className="text-white/50 hover:text-white"/></button>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-xs text-white/50 tracking-widest uppercase mb-2">Başlıq *</label>
                  <input type="text" required value={formData.title} onChange={e=>setFormData({...formData, title: e.target.value})} className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border-none" />
                </div>

                <div>
                  <label className="block text-xs text-white/50 tracking-widest uppercase mb-2">Yerləşmə *</label>
                  <input type="text" required value={formData.location} onChange={e=>setFormData({...formData, location: e.target.value})} className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border-none" />
                </div>
                
                <div>
                  <label className="block text-xs text-white/50 tracking-widest uppercase mb-2">Status</label>
                  <select value={formData.status} onChange={e=>setFormData({...formData, status: e.target.value})} className="w-full bg-[#2a2a2a] text-white p-3 rounded-lg border-none">
                    <option value="ongoing">Davam edir</option>
                    <option value="completed">Tamamlandı</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <UploadWidget label="Cover Şəkil (Üz qabığı)" folder="projects" defaultImage={formData.cover_image_url} onUpload={(url) => setFormData({...formData, cover_image_url: url})} />
                </div>

                <div className="md:col-span-2 flex items-center">
                  <input type="checkbox" id="pub" checked={formData.is_published} onChange={e=>setFormData({...formData, is_published: e.target.checked})} className="w-5 h-5 accent-[#f59e0b] rounded cursor-pointer" />
                  <label htmlFor="pub" className="ml-3 text-white font-bold text-sm tracking-widest uppercase cursor-pointer">Saytda Yayımla (Public)</label>
                </div>

                <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-white/10">
                  <button type="submit" className="px-6 py-3 bg-[#f59e0b] text-black font-black uppercase text-xs tracking-widest rounded-lg">Yadda Saxla</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
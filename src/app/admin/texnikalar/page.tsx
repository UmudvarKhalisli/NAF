"use client";

import { useState, useEffect } from 'react';
import { Plus, Search, Edit3, Trash2, X, ImagePlus, Star, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import UploadWidget from '@/components/admin/UploadWidget';

export default function AdminEquipment() {
  const [equipment, setEquipment] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);

  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const emptyForm = {
    name: '',
    category: 'Ekskavator',
    price: '',
    price_unit: 'SAAT',
    status: 'available',
    is_featured: false,
    sort_order: 999,
    image_url: '',
    description: ''
  };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/equipment');
    if(res.ok) setEquipment(await res.json());
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Əminsiniz?")) return;
    await fetch(`/api/admin/equipment/${id}`, { method: 'DELETE' });
    fetchEquipment();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editItem ? 'PUT' : 'POST';
    const url = editItem ? `/api/admin/equipment/${editItem.id}` : '/api/admin/equipment';

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    setIsModalOpen(false);
    setEditItem(null);
    fetchEquipment();
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const filteredEq = equipment.filter(eq => 
    (filterCategory === 'all' || eq.category === filterCategory) &&
    (eq.name.toLowerCase().includes(search.toLowerCase()) || eq.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-1">TEXNİKALAR</h1>
          <p className="text-sm font-bold text-white/40 tracking-widest uppercase">SİYAHI VƏ İDARƏETMƏ</p>
        </div>
        <button onClick={() => {setEditItem(null); setFormData(emptyForm); setIsModalOpen(true)}} className="bg-[#f59e0b] text-black px-6 py-3 tracking-widest uppercase rounded-xl font-black hover:bg-[#d97706] text-xs flex items-center gap-2">
          <Plus size={16}/> YENİ TEXNİKA
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 text-white/40" size={16}/>
          <input type="text" placeholder="Axtar..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full bg-[#1a1a1a] text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/10" />
        </div>
        <select value={filterCategory} onChange={e=>setFilterCategory(e.target.value)} className="bg-[#1a1a1a] text-white px-4 py-2.5 rounded-xl border border-white/10 outline-none">
          <option value="all">Bütün Kat.</option>
          <option value="Torpaq İşləri">Torpaq İşləri</option>
          <option value="Daşıma Texnikası">Daşıma Texnikası</option>
          <option value="Qaldırıcı Texnikalar">Qaldırıcı Texnikalar</option>
          <option value="Beton və Tikinti">Beton və Tikinti</option>
          <option value="Yol Tikinti">Yol Tikinti</option>
          <option value="Yükləmə və Köməkçi">Yükləmə və Köməkçi</option>
          <option value="Xüsusi Texnikalar">Xüsusi Texnikalar</option>
          <option value="Yeraltı və Kommunikasiya">Yeraltı və Kommunikasiya</option>
          <option value="Dağıtma (Demolition)">Dağıtma</option>
        </select>
      </div>

      <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-black/20 text-[10px] uppercase font-black text-white/50 tracking-widest">
              <th className="p-4">Şəkil</th>
              <th className="p-4">Ad / Kateqoriya</th>
              <th className="p-4">Qiymət</th>
              <th className="p-4">Sıra</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Önə Ç.</th>
              <th className="p-4 text-right">Əməliyyat</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan={6} className="p-8 text-center"><Loader2 className="animate-spin text-[#f59e0b] mx-auto"/></td></tr> 
            : filteredEq.map((item, idx) => (
              <motion.tr initial={{opacity:0}} animate={{opacity:1}} key={item.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                <td className="p-4">
                  <div className="w-16 h-12 bg-black rounded overflow-hidden relative">
                    {item.image_url ? <Image src={item.image_url} alt="" fill className="object-cover" /> : <ImagePlus className="m-auto text-white/20 relative top-3"/>}
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-white font-bold">{item.name}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest">{item.category}</p>
                </td>
                <td className="p-4 font-black">
                  <span className="text-[#f59e0b]">{item.price}₼</span><span className="text-white/50 text-[10px]">/{item.price_unit}</span>
                </td>
                <td className="p-4">
                  <span className="text-white/60 text-xs font-mono">{item.sort_order ?? '-'}</span>
                </td>
                <td className="p-4 text-[10px] uppercase font-black tracking-widest text-white/70">{item.status}</td>
                <td className="p-4 text-center">{item.is_featured && <Star size={16} className="mx-auto text-yellow-500"/>}</td>
                <td className="p-4 text-right">
                  <button onClick={() => openEdit(item)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded"><Edit3 size={16}/></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded"><Trash2 size={16}/></button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#1a1a1a] rounded-2xl border border-white/10 w-full max-w-2xl z-10 p-6 overflow-hidden max-h-[90vh] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black uppercase text-white">{editItem ? 'Texnikaya Düzəliş Et' : 'Yeni Texnika'}</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="text-white/50"/></button>
              </div>
              <form onSubmit={handleSave} className="overflow-y-auto space-y-4 pr-2">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-1">Ad *</label>
                    <input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-1">Kateqoriya *</label>
                    <select required value={formData.category} onChange={e=>setFormData({...formData, category: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none">
                      <option value="Torpaq İşləri">Torpaq İşləri</option>
                      <option value="Daşıma Texnikası">Daşıma Texnikası</option>
                      <option value="Qaldırıcı Texnikalar">Qaldırıcı Texnikalar</option>
                      <option value="Beton və Tikinti">Beton və Tikinti</option>
                      <option value="Yol Tikinti">Yol Tikinti</option>
                      <option value="Yükləmə və Köməkçi">Yükləmə və Köməkçi</option>
                      <option value="Xüsusi Texnikalar">Xüsusi Texnikalar</option>
                      <option value="Yeraltı və Kommunikasiya">Yeraltı və Kommunikasiya</option>
                      <option value="Dağıtma (Demolition)">Dağıtma</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-1">Sıralama (1 = Ən birinci)</label>
                    <input type="number" value={formData.sort_order} onChange={e=>setFormData({...formData, sort_order: parseInt(e.target.value)})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none" />
                  </div>
                  <div className="flex">
                    <div className="w-full">
                      <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-1">Qiymət</label>
                      <div className="flex">
                        <input type="number" required value={formData.price} onChange={e=>setFormData({...formData, price: e.target.value})} className="w-2/3 bg-[#2a2a2a] rounded-l-lg p-3 text-white outline-none border-r border-white/5" />
                        <select value={formData.price_unit} onChange={e=>setFormData({...formData, price_unit: e.target.value})} className="w-1/3 bg-[#2a2a2a] rounded-r-lg p-3 text-white outline-none">
                          <option value="SAAT">SAAT</option><option value="GÜN">GÜN</option><option value="AY">AY</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-1">Status</label>
                    <select value={formData.status} onChange={e=>setFormData({...formData, status: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none">
                      <option value="available">Mövcuddur</option>
                      <option value="rented">İcarədədir</option>
                      <option value="maintenance">T. Baxış</option>
                    </select>
                  </div>
                </div>
                
                <UploadWidget label="Şəkil" folder="equipment" defaultImage={formData.image_url} onUpload={url => setFormData({...formData, image_url: url})} />

                <div className="flex items-center gap-3">
                  <input type="checkbox" id="f" checked={formData.is_featured} onChange={e=>setFormData({...formData, is_featured: e.target.checked})} className="accent-[#f59e0b] w-5 h-5" />
                  <label htmlFor="f" className="text-white text-xs font-bold uppercase tracking-widest">Önə Çıxarılmış (Featured)</label>
                </div>

                <button type="submit" className="w-full mt-4 bg-[#f59e0b] text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#d97706]">Yadda Saxla</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
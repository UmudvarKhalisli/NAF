"use client";

import { useState, useEffect } from 'react';
import { Plus, Search, Edit3, Trash2, X, CircleDollarSign, TrendingUp, TrendingDown, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminRevenue() {
  const [revenue, setRevenue] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);

  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  const emptyForm = {
    amount: '',
    type: 'rental',
    date: new Date().toISOString().substring(0, 10),
    description: ''
  };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const fetchRevenue = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/revenue');
    if(res.ok) setRevenue(await res.json());
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Yalnız revenue POST edirik (düzəliş dəstəkləmirik, hələlik add kifayətdir, delete olmur ki history qalsın)
    const url = '/api/admin/revenue';

    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({...formData, amount: parseFloat(formData.amount)})
    });

    setIsModalOpen(false);
    fetchRevenue();
  };

  const filteredRev = revenue.filter(r => 
    (filterType === 'all' || r.type === filterType) &&
    (r.description?.toLowerCase().includes(search.toLowerCase()))
  );

  const totalRevenue = revenue.reduce((acc, curr) => acc + (curr.type === 'refund' ? -curr.amount : curr.amount), 0);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-1">MALİYYƏ</h1>
          <p className="text-sm font-bold text-white/40 tracking-widest uppercase">GƏLİR VƏ XƏRCLƏR</p>
        </div>
        <button onClick={() => {setFormData(emptyForm); setIsModalOpen(true)}} className="bg-[#f59e0b] text-black px-6 py-3 tracking-widest uppercase rounded-xl font-black hover:bg-[#d97706] text-xs flex items-center gap-2">
          <Plus size={16}/> GƏLİR/XƏRC ƏLAVƏ ET
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-32">
           <div className="flex items-start justify-between">
             <p className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase">ÜMUMİ GƏLİR</p>
             <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex justify-center items-center"><TrendingUp size={20}/></div>
           </div>
           <h3 className="text-3xl font-black text-white">{totalRevenue.toLocaleString()} AZN</h3>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
           <Search className="absolute left-3 top-3 text-white/40" size={16}/>
           <input type="text" placeholder="Axtar..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full bg-[#1a1a1a] text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/10" />
        </div>
        <select value={filterType} onChange={e=>setFilterType(e.target.value)} className="bg-[#1a1a1a] text-white px-4 py-2.5 rounded-xl border border-white/10 outline-none">
          <option value="all">Bütün Növlər</option>
          <option value="rental">İcarə</option>
          <option value="deposit">Depozit</option>
          <option value="extra">Əlavə</option>
          <option value="refund">Geri Qaytarma</option>
        </select>
      </div>

      <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/20 text-[10px] uppercase font-black text-white/50 tracking-widest border-b border-white/5">
                <th className="p-4">Tarix</th>
                <th className="p-4">Növ</th>
                <th className="p-4">Məbləğ</th>
                <th className="p-4">Açıqlama</th>
              </tr>
            </thead>
            <tbody className="text-sm border-t border-white/5">
              {loading ? <tr><td colSpan={4} className="p-8 text-center"><Loader2 className="animate-spin text-[#f59e0b] mx-auto"/></td></tr> 
              : filteredRev.map((item, idx) => (
                <motion.tr initial={{opacity:0}} animate={{opacity:1}} key={item.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-4 font-bold text-white/70 w-40">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="p-4 w-40">
                     <span className={`px-2 py-1 text-[10px] rounded uppercase font-black tracking-widest ${
                      item.type === 'rental' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                      item.type === 'deposit' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                      item.type === 'refund' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                     }`}>
                        {item.type}
                     </span>
                  </td>
                  <td className="p-4 w-40">
                    <span className={`font-black tracking-wider ${item.type === 'refund' ? 'text-red-500' : 'text-emerald-500'}`}>
                      {item.type === 'refund' ? '-' : '+'}{item.amount}₼
                    </span>
                  </td>
                  <td className="p-4 text-white/70">{item.description}</td>
                </motion.tr>
              ))}
              {filteredRev.length === 0 && !loading && (
                 <tr><td colSpan={4} className="p-8 text-center text-white/40 uppercase text-xs font-bold tracking-widest">Qeyd tapılmadı</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
         {isModalOpen && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#1a1a1a] rounded-2xl border border-white/10 w-full max-w-lg z-10 p-6">
                <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                   <h2 className="text-xl font-black uppercase text-white">YENİ ƏMƏLİYYAT</h2>
                   <button onClick={() => setIsModalOpen(false)}><X className="text-white/50"/></button>
                </div>

                <form onSubmit={handleSave} className="space-y-4">
                   <div>
                     <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-1">Məbləğ (AZN) *</label>
                     <input type="number" required value={formData.amount} onChange={e=>setFormData({...formData, amount: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none" />
                   </div>
                   
                   <div>
                     <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-1">Tarix *</label>
                     <input type="date" required value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none" />
                   </div>

                   <div>
                     <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-1">Növ *</label>
                     <select value={formData.type} onChange={e=>setFormData({...formData, type: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none">
                       <option value="rental">İcarə</option>
                       <option value="deposit">Depozit</option>
                       <option value="extra">Əlavə</option>
                       <option value="refund">Geri Qaytarma</option>
                     </select>
                   </div>

                   <div>
                     <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-1">Açıqlama</label>
                     <textarea rows={3} value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none placeholder:text-white/20" placeholder="Məs: İcarə gəliri, Təmir xərci..." />
                   </div>
                   
                   <button type="submit" className="w-full mt-4 bg-[#f59e0b] text-black font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#d97706] transition-colors">Əlavə Et</button>
                </form>
             </motion.div>
           </div>
         )}
      </AnimatePresence>
    </div>
  );
}
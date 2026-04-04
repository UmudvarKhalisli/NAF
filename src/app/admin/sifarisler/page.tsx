"use client";

import { useState, useEffect } from 'react';
import { Plus, Search, Edit3, Trash2, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [equipmentList, setEquipmentList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItem, setEditItem] = useState<any | null>(null);

  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const emptyForm = {
    customer_name: '',
    customer_phone: '',
    equipment_id: '',
    equipment_name: '',
    rental_start: '',
    rental_end: '',
    status: 'pending',
    source: 'website',
    total_price: 0
  };
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchOrders();
    fetchEquipment();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await fetch('/api/admin/orders');
    if(res.ok) setOrders(await res.json());
    setLoading(false);
  };

  const fetchEquipment = async () => {
    const res = await fetch('/api/admin/equipment');
    if(res.ok) setEquipmentList(await res.json());
  };

  const handleDelete = async (id: string) => {
    if(!confirm("Əminsiniz?")) return;
    await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
    fetchOrders();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editItem ? 'PUT' : 'POST';
    const url = editItem ? `/api/admin/orders/${editItem.id}` : '/api/admin/orders';

    // Texnika adını seçilmiş ID-yə görə formanın içinə əlavə edirik
    if (formData.equipment_id) {
      const selectedEq = equipmentList.find(eq => eq.id === formData.equipment_id);
      if (selectedEq) formData.equipment_name = selectedEq.name;
    }

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    setIsModalOpen(false);
    setEditItem(null);
    fetchOrders();
  };

  const openEdit = (item: any) => {
    setEditItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  const filteredOrders = orders.filter(o => 
    (filterStatus === 'all' || o.status === filterStatus) &&
    (o.customer_name.toLowerCase().includes(search.toLowerCase()) || 
     o.customer_phone.includes(search) ||
     (o.equipment_name && o.equipment_name.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-1">SİFARİŞLƏR</h1>
          <p className="text-sm font-bold text-white/40 tracking-widest uppercase">MÜŞTƏRİ MÜRACİƏTLƏRİ</p>
        </div>
        <button onClick={() => {setEditItem(null); setFormData(emptyForm); setIsModalOpen(true)}} className="bg-[#f59e0b] text-black px-6 py-3 tracking-widest uppercase rounded-xl font-black hover:bg-[#d97706] text-xs flex items-center gap-2">
          <Plus size={16}/> SİFARİŞ ƏLAVƏ ET
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 text-white/40" size={16}/>
          <input type="text" placeholder="Axtar..." value={search} onChange={e=>setSearch(e.target.value)} className="w-full bg-[#1a1a1a] text-white pl-10 pr-4 py-2.5 rounded-xl border border-white/10" />
        </div>
        <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)} className="bg-[#1a1a1a] text-white px-4 py-2.5 rounded-xl border border-white/10 outline-none">
          <option value="all">Bütün Statuslar</option>
          <option value="pending">Gözləyir</option>
          <option value="confirmed">Təsdiqləndi</option>
          <option value="active">Aktiv</option>
          <option value="completed">Tamamlandı</option>
          <option value="cancelled">Ləğv edildi</option>
        </select>
      </div>

      <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/20 text-[10px] uppercase font-black text-white/50 tracking-widest border-b border-white/5">
                <th className="p-4">Müştəri / Əlaqə</th>
                <th className="p-4">Texnika</th>
                <th className="p-4">Tarix Aralığı</th>
                <th className="p-4">Məbləğ</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Əməliyyat</th>
              </tr>
            </thead>
            <tbody>
              {loading ? <tr><td colSpan={6} className="p-8 text-center"><Loader2 className="animate-spin text-[#f59e0b] mx-auto"/></td></tr> 
              : filteredOrders.map((item, idx) => (
                <motion.tr initial={{opacity:0}} animate={{opacity:1}} key={item.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                  <td className="p-4">
                    <p className="text-white font-bold">{item.customer_name}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{item.customer_phone}</p>
                  </td>
                  <td className="p-4 text-white font-bold">{item.equipment_name || '-'}</td>
                  <td className="p-4">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/70">
                      {item.rental_start ? new Date(item.rental_start).toLocaleDateString() : '-'} <br/> 
                      {item.rental_end ? new Date(item.rental_end).toLocaleDateString() : '-'}
                    </div>
                  </td>
                  <td className="p-4 font-black">
                    <span className="text-[#f59e0b]">{item.total_price || 0}₼</span>
                  </td>
                  <td className="p-4">
                     <span className={`px-2 py-1 text-[10px] rounded uppercase font-black tracking-widest ${
                      item.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500' :
                      item.status === 'active' || item.status === 'confirmed' ? 'bg-blue-500/10 text-blue-500' :
                      item.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-white/10 text-white/50'
                     }`}>
                        {item.status}
                     </span>
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => openEdit(item)} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded"><Edit3 size={16}/></button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded"><Trash2 size={16}/></button>
                  </td>
                </motion.tr>
              ))}
              {filteredOrders.length === 0 && !loading && (
                 <tr><td colSpan={6} className="p-8 text-center text-white/40 uppercase text-xs font-bold tracking-widest">Sifariş tapılmadı</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-[#1a1a1a] rounded-2xl border border-white/10 w-full max-w-xl z-10 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black uppercase text-white">{editItem ? 'Sifarişə Düzəliş' : 'Yeni Sifariş'}</h2>
                <button onClick={() => setIsModalOpen(false)}><X className="text-white/50"/></button>
              </div>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Müştəri Adı" required value={formData.customer_name} onChange={e=>setFormData({...formData, customer_name: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none" />
                  <input placeholder="Telefon" required value={formData.customer_phone} onChange={e=>setFormData({...formData, customer_phone: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none" />
                </div>
                
                <select value={formData.equipment_id} onChange={e=>setFormData({...formData, equipment_id: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none">
                   <option value="">Texnika Seçin</option>
                   {equipmentList.map(eq => <option key={eq.id} value={eq.id}>{eq.name} ({eq.category})</option>)}
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-1">Başlanğıc Tarixi</label>
                    <input type="date" required value={formData.rental_start} onChange={e=>setFormData({...formData, rental_start: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-1">Bitiş Tarixi</label>
                    <input type="date" required value={formData.rental_end} onChange={e=>setFormData({...formData, rental_end: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <select value={formData.status} onChange={e=>setFormData({...formData, status: e.target.value})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none">
                    <option value="pending">Gözləyir</option>
                    <option value="confirmed">Təsdiqləndi</option>
                    <option value="active">Aktiv</option>
                    <option value="completed">Tamamlandı</option>
                    <option value="cancelled">Ləğv edildi</option>
                  </select>
                  <input type="number" placeholder="Ümumi Məbləğ" required value={formData.total_price} onChange={e=>setFormData({...formData, total_price: parseFloat(e.target.value)})} className="w-full bg-[#2a2a2a] rounded-lg p-3 text-white outline-none" />
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
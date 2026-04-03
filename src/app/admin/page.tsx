"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';

// --- Types ---

interface Equipment {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'Available' | 'Rented';
  specs: { [key: string]: string };
}

interface Order {
  id: string;
  customer_name: string;
  customer_phone: string;
  machine_name: string;
  duration: string;
  status: 'Pending' | 'Accepted' | 'Completed' | 'Rejected';
  created_at: string;
}

// --- UI Components ---

const Badge = ({ status }: { status: string }) => {
  const isActive = status === 'Available' || status === 'Accepted' || status === 'Completed';
  return (
    <span className={`text-[10px] font-black tracking-[0.2em] px-3 py-1 uppercase ${isActive ? 'bg-black text-white' : 'border border-black text-black'}`}>
      {status}
    </span>
  );
};

const SectionHeader = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: React.ReactNode }) => (
  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-black/5 pb-8">
    <div>
      <h2 className="text-4xl md:text-5xl font-serif font-black tracking-tighter text-black uppercase mb-2">
        {title}
      </h2>
      {subtitle && <p className="text-[10px] tracking-[0.4em] font-bold text-black/40 uppercase">{subtitle}</p>}
    </div>
    {action}
  </div>
);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'orders' | 'about' | 'settings'>('dashboard');
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [aboutUsText, setAboutUsText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState(1);
  const [newEq, setNewEq] = useState<Partial<Equipment>>({ specs: {} });

  // --- Data Fetching ---

  useEffect(() => {
    fetchData();
    sessionStorage.setItem('is_admin_mode', 'true');
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: eqData } = await supabase.from('equipment').select('*').order('created_at', { ascending: false });
      const { data: ordData } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
      const { data: settingsData } = await supabase.from('settings').select('*').eq('key', 'about_us_text').single();

      if (eqData) setEquipment(eqData as Equipment[]);
      if (ordData) setOrders(ordData as Order[]);
      if (settingsData) setAboutUsText(settingsData.value);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // --- Handlers ---

  const handleUpdateAboutUs = async () => {
    const { error } = await supabase
      .from('settings')
      .upsert({ key: 'about_us_text', value: aboutUsText }, { onConflict: 'key' });
    
    if (!error) alert('Haqqımızda mətni yeniləndi!');
  };

  const handleAction = async (orderId: string, newStatus: Order['status']) => {
    const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    if (!error) fetchData();
  };

  const handleAddEquipment = async () => {
    const eq = {
      name: newEq.name || 'YENİ TEXNİKA',
      category: newEq.category || 'DİGƏR',
      price: newEq.price || 0,
      status: 'Available',
      specs: newEq.specs || {},
    };
    
    const { error } = await supabase.from('equipment').insert([eq]);
    if (!error) {
      setIsModalOpen(false);
      setModalStep(1);
      setNewEq({ specs: {} });
      fetchData();
    }
  };

  const handleDeleteEquipment = async (id: string) => {
    if (confirm('Silmək istədiyinizə əminsiniz?')) {
      const { error } = await supabase.from('equipment').delete().eq('id', id);
      if (!error) fetchData();
    }
  };

  if (isLoading) return <div className="h-screen w-full flex items-center justify-center font-serif text-black uppercase tracking-widest">Yüklənir...</div>;

  return (
    <div className="flex h-screen bg-white text-black font-sans selection:bg-black selection:text-white overflow-hidden">
      {/* Sidebar */}
      <aside className="w-80 h-full border-r border-black/5 flex flex-col p-10 bg-[#fafafa]">
        <div className="mb-16">
          <h1 className="text-3xl font-serif font-black tracking-tighter mb-1">NAF</h1>
          <div className="w-8 h-[2px] bg-black" />
          <p className="text-[9px] tracking-[0.5em] font-bold text-black/30 mt-4 uppercase">Architecture of Management</p>
        </div>

        <nav className="flex-grow space-y-1">
          {[
            { id: 'dashboard', label: 'Dashboard' },
            { id: 'inventory', label: 'Texnika' },
            { id: 'orders', label: 'Sifarişlər' },
            { id: 'about', label: 'Haqqımızda' },
            { id: 'settings', label: 'Ayarlar' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full text-left p-4 text-[11px] font-black tracking-[0.3em] uppercase transition-all flex items-center gap-4 ${
                activeTab === item.id ? 'bg-black text-white' : 'text-black/40 hover:text-black hover:bg-black/5'
              }`}
            >
              <div className={`w-1.5 h-1.5 rotate-45 ${activeTab === item.id ? 'bg-white' : 'bg-black/20'}`} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-10 border-t border-black/5 mt-auto">
          <a
            href="/?admin=true"
            className="group flex items-center justify-between p-4 border border-black hover:bg-black hover:text-white transition-all duration-500"
          >
            <span className="text-[10px] font-black tracking-[0.4em] uppercase">SAYTA BAX</span>
            <div className="w-4 h-[1px] bg-black group-hover:bg-white transition-all" />
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow h-full overflow-y-auto p-12 lg:p-20 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <SectionHeader title="İCMAL" subtitle="SİSTEMİN ÜMUMİ VƏZİYYƏTİ" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                {[
                  { label: 'Ümumi Texnika', value: equipment.length },
                  { label: 'Yeni Sifarişlər', value: orders.filter(o => o.status === 'Pending').length },
                  { label: 'Aktiv İcarələr', value: equipment.filter(e => e.status === 'Rented').length },
                ].map((stat, i) => (
                  <div key={i} className="p-10 border border-black/5 hover:border-black/20 transition-all group">
                    <p className="text-[10px] tracking-[0.4em] font-bold text-black/30 uppercase mb-8 group-hover:text-black">{stat.label}</p>
                    <span className="text-6xl font-serif font-black tracking-tighter">{stat.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div key="inventory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <SectionHeader 
                title="TEXNİKA" 
                subtitle="İNVENTARIN İDARƏ EDİLMƏSİ" 
                action={<button onClick={() => setIsModalOpen(true)} className="px-8 py-4 bg-black text-white text-[10px] font-black tracking-[0.4em] uppercase hover:bg-black/90 transition-all">ƏLAVƏ ET</button>}
              />
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-black tracking-[0.4em] text-black/30 uppercase border-b border-black/5">
                    <th className="pb-6">AD</th>
                    <th className="pb-6">KATEQORİYA</th>
                    <th className="pb-6">QİYMƏT</th>
                    <th className="pb-6">STATUS</th>
                    <th className="pb-6 text-right">FƏALİYYƏT</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((eq) => (
                    <tr key={eq.id} className="border-b border-black/5 hover:bg-black/[0.01]">
                      <td className="py-8 font-black text-sm uppercase tracking-widest">{eq.name}</td>
                      <td className="py-8 text-black/60 uppercase text-[10px] font-bold tracking-widest">{eq.category}</td>
                      <td className="py-8 font-black text-sm">{eq.price} AZN</td>
                      <td className="py-8"><Badge status={eq.status} /></td>
                      <td className="py-8 text-right">
                        <button onClick={() => handleDeleteEquipment(eq.id)} className="text-[10px] font-black tracking-widest uppercase hover:text-red-500">Sil</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div key="orders" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <SectionHeader title="SİFARİŞLƏR" subtitle="GƏLƏN SİFARİŞLƏRİN SİYAHISI" />
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border border-black/5 p-10 flex flex-col md:flex-row justify-between items-center hover:border-black/20">
                    <div>
                      <h3 className="text-xl font-serif font-black tracking-tighter uppercase mb-2">{order.machine_name}</h3>
                      <p className="text-[11px] font-bold tracking-widest">{order.customer_name} | {order.customer_phone}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <Badge status={order.status} />
                      <div className="flex gap-2">
                        {order.status === 'Pending' && (
                          <button onClick={() => handleAction(order.id, 'Accepted')} className="px-4 py-2 border border-black text-[10px] font-black tracking-widest uppercase hover:bg-black hover:text-white transition-all">Qəbul</button>
                        )}
                        {order.status !== 'Completed' && (
                          <button onClick={() => handleAction(order.id, 'Completed')} className="px-4 py-2 bg-black text-white text-[10px] font-black tracking-widest uppercase hover:bg-white hover:text-black border border-black transition-all">Tamamla</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'about' && (
            <motion.div key="about" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <SectionHeader title="HAQQIMIZDA" subtitle="SAYTDAKI HAQQIMIZDA MƏTNİNİ REDAKTƏ EDİN" />
              <div className="max-w-2xl">
                <textarea 
                  value={aboutUsText}
                  onChange={(e) => setAboutUsText(e.target.value)}
                  className="w-full h-80 border border-black/10 p-8 outline-none focus:border-black font-bold text-sm tracking-widest uppercase mb-10 leading-relaxed"
                />
                <button onClick={handleUpdateAboutUs} className="px-16 py-5 bg-black text-white text-[11px] font-black tracking-[0.4em] uppercase hover:bg-white hover:text-black border border-black transition-all">YADDA SAXLA</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modal - Add Equipment */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative w-full max-w-xl bg-white border border-black p-12 shadow-2xl">
              <h3 className="text-2xl font-serif font-black tracking-tighter uppercase mb-10 pb-4 border-b border-black/10">YENİ TEXNİKA</h3>
              <div className="space-y-6">
                <input type="text" placeholder="AD" className="w-full border-b border-black/10 p-4 outline-none focus:border-black font-black text-[11px] tracking-widest uppercase transition-all" onChange={(e) => setNewEq({ ...newEq, name: e.target.value })} />
                <input type="text" placeholder="KATEQORİYA" className="w-full border-b border-black/10 p-4 outline-none focus:border-black font-black text-[11px] tracking-widest uppercase transition-all" onChange={(e) => setNewEq({ ...newEq, category: e.target.value })} />
                <input type="number" placeholder="QİYMƏT (AZN)" className="w-full border-b border-black/10 p-4 outline-none focus:border-black font-black text-[11px] tracking-widest uppercase transition-all" onChange={(e) => setNewEq({ ...newEq, price: Number(e.target.value) })} />
                <div className="flex gap-4 pt-6">
                  <button onClick={handleAddEquipment} className="flex-1 py-5 bg-black text-white text-[11px] font-black tracking-[0.4em] uppercase transition-all">ƏLAVƏ ET</button>
                  <button onClick={() => setIsModalOpen(false)} className="flex-1 py-5 border border-black text-[11px] font-black tracking-[0.4em] uppercase transition-all">LƏĞV ET</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

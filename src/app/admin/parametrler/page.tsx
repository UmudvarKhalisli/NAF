"use client";

import { useState, useEffect } from 'react';
import { Save, Loader2, Shield, Globe, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);
  
  const [settings, setSettings] = useState({
    site_name: 'NAF Texnika',
    contact_email: 'info@naf.az',
    contact_phone: '+994 50 123 45 67',
    address: 'Bakı, Azərbaycan',
    maintenance_mode: false
  });

  const fetchSettings = async () => {
    setFetching(true);
    try {
      const res = await fetch('/api/admin/settings');
      if (res.ok) {
        const data = await res.json();
        setSettings({
          site_name: data.site_name,
          contact_email: data.contact_email,
          contact_phone: data.contact_phone,
          address: data.address,
          maintenance_mode: data.maintenance_mode
        });
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert('Yadda saxlayarkən xəta baş verdi.');
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Sistem xətası baş verdi.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-[#f59e0b] mb-4" size={40} />
        <p className="text-white/40 text-xs font-black uppercase tracking-widest">Məlumatlar yüklənir...</p>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-end mb-10 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2">PARAMETRLƏR</h1>
          <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase">SİSTEM VƏ SAYT TENZİMLƏMƏLƏRİ</p>
        </div>
        <button 
          onClick={fetchSettings}
          className="p-3 bg-white/5 hover:bg-white/10 text-white/70 rounded-xl transition-colors mb-2"
          title="Yenilə"
        >
          <RefreshCw size={20} className={fetching ? 'animate-spin' : ''} />
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* General Settings */}
        <div className="bg-[#1a1a1a] p-6 lg:p-8 rounded-2xl border border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/60">
               <Globe size={24}/>
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider">ƏSAS MƏLUMATLAR</h2>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Saytın ad və rekvizitləri</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-2">Sayt başlığı (Title)</label>
              <input type="text" value={settings.site_name} onChange={e=>setSettings({...settings, site_name: e.target.value})} className="w-full bg-[#2a2a2a] rounded-xl p-4 text-white outline-none border border-transparent focus:border-[#f59e0b]/30 transition-colors placeholder:text-white/20" />
            </div>

            <div>
              <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-2">Əlaqə E-poçt</label>
              <input type="email" value={settings.contact_email} onChange={e=>setSettings({...settings, contact_email: e.target.value})} className="w-full bg-[#2a2a2a] rounded-xl p-4 text-white outline-none border border-transparent focus:border-[#f59e0b]/30 transition-colors placeholder:text-white/20" />
            </div>

            <div>
              <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-2">Əlaqə Nömrəsi</label>
              <input type="text" value={settings.contact_phone} onChange={e=>setSettings({...settings, contact_phone: e.target.value})} className="w-full bg-[#2a2a2a] rounded-xl p-4 text-white outline-none border border-transparent focus:border-[#f59e0b]/30 transition-colors placeholder:text-white/20" />
            </div>

            <div>
              <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-2">Ünvan</label>
              <input type="text" value={settings.address} onChange={e=>setSettings({...settings, address: e.target.value})} className="w-full bg-[#2a2a2a] rounded-xl p-4 text-white outline-none border border-transparent focus:border-[#f59e0b]/30 transition-colors placeholder:text-white/20" />
            </div>
          </div>
        </div>

        {/* System & Maintenance */}
        <div className="bg-[#1a1a1a] p-6 lg:p-8 rounded-2xl border border-white/5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/60">
               <Shield size={24}/>
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider">SİSTEM VƏ TƏHLÜKƏSİZLİK</h2>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Giriş, baxım və ehtiyat nüsxə</p>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <label className={`flex items-center gap-4 cursor-pointer p-6 rounded-2xl transition-all border ${settings.maintenance_mode ? 'bg-[#f59e0b]/5 border-[#f59e0b]/20' : 'bg-white/5 border-transparent hover:bg-white/8'}`}>
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={settings.maintenance_mode} onChange={e=>setSettings({...settings, maintenance_mode: e.target.checked})} />
                <div className={`block w-14 h-8 rounded-full transition-colors ${settings.maintenance_mode ? 'bg-[#f59e0b]' : 'bg-[#2a2a2a]'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.maintenance_mode ? 'translate-x-6' : ''}`}></div>
              </div>
              <div>
                <p className="font-black text-sm text-white uppercase tracking-widest">Baxım Rejimi (Maintenance)</p>
                <p className="text-[10px] text-white/40 font-bold tracking-[0.2em] uppercase mt-1">
                  {settings.maintenance_mode 
                    ? 'Sayt hazırda ziyarətçilərə qapalıdır' 
                    : 'Aktiv etdikdə sayt ziyarətçilərə qapalı olur'}
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="bg-black border-t border-white/10 sticky bottom-0 p-6 flex justify-end items-center gap-6 z-20">
          {success && (
            <motion.p initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="text-[#f59e0b] text-xs font-black uppercase tracking-widest">
              UĞURLA YADDA SAXLANDI
            </motion.p>
          )}
          <button type="submit" disabled={loading} className="bg-[#f59e0b] hover:bg-[#d97706] text-black px-10 py-5 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-colors disabled:opacity-50 shadow-xl shadow-[#f59e0b]/10">
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />}
            Yadda Saxla
          </button>
        </div>
      </form>
    </div>
  );
}
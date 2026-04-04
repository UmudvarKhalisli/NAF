"use client";

import { useState } from 'react';
import { Save, Loader2, Database, Shield, Globe, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminSettings() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [settings, setSettings] = useState({
    siteName: 'Tikinti Texnika Portalı',
    contactEmail: 'info@tikinti.az',
    contactPhone: '+994 50 123 45 67',
    address: 'Bakı şəhəri, Azərbaycan',
    maintenanceMode: false
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    // Simulate save
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-10 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2">PARAMETRLƏR</h1>
        <p className="text-[10px] font-bold text-white/40 tracking-widest uppercase">SİSTEM VƏ SAYT TENZİMLƏMƏLƏRİ</p>
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
              <input type="text" value={settings.siteName} onChange={e=>setSettings({...settings, siteName: e.target.value})} className="w-full bg-[#2a2a2a] rounded-xl p-4 text-white outline-none border border-transparent focus:border-white/10 transition-colors placeholder:text-white/20" />
            </div>

            <div>
              <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-2">Əlaqə E-poçt</label>
              <input type="email" value={settings.contactEmail} onChange={e=>setSettings({...settings, contactEmail: e.target.value})} className="w-full bg-[#2a2a2a] rounded-xl p-4 text-white outline-none border border-transparent focus:border-white/10 transition-colors placeholder:text-white/20" />
            </div>

            <div>
              <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-2">Əlaqə Nömrəsi</label>
              <input type="text" value={settings.contactPhone} onChange={e=>setSettings({...settings, contactPhone: e.target.value})} className="w-full bg-[#2a2a2a] rounded-xl p-4 text-white outline-none border border-transparent focus:border-white/10 transition-colors placeholder:text-white/20" />
            </div>

            <div>
              <label className="text-[10px] text-white/50 uppercase tracking-widest font-black block mb-2">Ünvan</label>
              <input type="text" value={settings.address} onChange={e=>setSettings({...settings, address: e.target.value})} className="w-full bg-[#2a2a2a] rounded-xl p-4 text-white outline-none border border-transparent focus:border-white/10 transition-colors placeholder:text-white/20" />
            </div>
          </div>
        </div>

        {/* System & Maintenance */}
        <div className="bg-[#1a1a1a] p-6 lg:p-8 rounded-2xl border border-white/5">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white/60">
               <Shield size={24}/>
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-wider">SİSTEM VƏ TƏHLÜKƏSİZLİK</h2>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Giriş, baxım və ehtiyat nüsxə</p>
            </div>
          </div>

          <div className="space-y-6">
            <label className="flex items-center gap-4 cursor-pointer p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <div className="relative">
                <input type="checkbox" className="sr-only" checked={settings.maintenanceMode} onChange={e=>setSettings({...settings, maintenanceMode: e.target.checked})} />
                <div className={`block w-14 h-8 rounded-full transition-colors ${settings.maintenanceMode ? 'bg-[#f59e0b]' : 'bg-[#2a2a2a]'}`}></div>
                <div className={`absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${settings.maintenanceMode ? 'translate-x-6' : ''}`}></div>
              </div>
              <div>
                <p className="font-bold text-sm text-white uppercase tracking-wider">Baxım Rejimi (Maintenance)</p>
                <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase">Aktiv etdikdə sayt ziyarətçilərə qapalı olur</p>
              </div>
            </label>
            
            <div className="flex gap-4 p-4 bg-white/5 rounded-xl items-center justify-between">
              <div className="flex items-center gap-4">
                <Database className="text-white/30" />
                <div>
                  <p className="font-bold text-sm text-white uppercase tracking-wider">Verilənlər Bazası Təmizlənməsi</p>
                  <p className="text-[10px] text-white/40 font-bold tracking-widest uppercase">Köhnə loglar və lazımsız keş</p>
                </div>
              </div>
              <button type="button" className="px-4 py-2 bg-[#2a2a2a] rounded-lg text-xs font-bold uppercase tracking-widest text-white/70 hover:bg-white/10 hover:text-white transition-colors">Təmizlə</button>
            </div>
          </div>
        </div>

        {/* Action Bottom */}
        <div className="bg-black border-t border-white/10 sticky bottom-0 p-6 flex justify-end items-center gap-6 z-20">
          {success && (
            <motion.p initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} className="text-[#f59e0b] text-xs font-black uppercase tracking-widest">
              UĞURLA YADDA SAXLANDI
            </motion.p>
          )}
          <button type="submit" disabled={loading} className="bg-[#f59e0b] hover:bg-[#d97706] text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-colors disabled:opacity-50">
            {loading ? <Loader2 className="animate-spin" size={18}/> : <Save size={18} />}
            Yadda Saxla
          </button>
        </div>
      </form>
    </div>
  );
}
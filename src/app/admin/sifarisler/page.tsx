"use client";

import { useState, useEffect } from 'react';
import { Mail, Phone, Clock, Trash2, CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminOrders() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      if (res.ok) {
        setMessages(await res.json());
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="p-6 lg:p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-1">MÜRACİƏTLƏR</h1>
          <p className="text-sm font-bold text-white/40 tracking-widest uppercase">GƏLƏN SİFARİŞLƏR VƏ MESAJLAR</p>
        </div>
        <button 
          onClick={fetchMessages}
          className="p-3 bg-white/5 hover:bg-white/10 text-white/70 rounded-xl transition-colors"
          title="Yenilə"
        >
          <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-[#f59e0b]" size={40} />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-2xl">
            <p className="text-white/30 font-black uppercase tracking-widest">Hələ ki, müraciət yoxdur</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={msg.id} 
              className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${msg.status === 'new' ? 'bg-blue-500 animate-pulse' : 'bg-gray-500'}`} />
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">{msg.name}</h3>
                    {msg.status === 'new' && (
                      <span className="bg-blue-500/10 text-blue-500 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-widest">Yenİ</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 text-white/60">
                      <div className="bg-white/5 p-2 rounded-lg"><Phone size={16}/></div>
                      <span className="text-sm font-bold">{msg.phone}</span>
                    </div>
                    {msg.equipment && (
                      <div className="flex items-center gap-3 text-white/60">
                        <div className="bg-white/5 p-2 rounded-lg"><CheckCircle2 size={16} className="text-[#f59e0b]"/></div>
                        <span className="text-sm font-bold">{msg.equipment}</span>
                      </div>
                    )}
                  </div>

                  {msg.message && (
                    <div className="bg-black/20 p-4 rounded-xl border border-white/[0.03]">
                      <p className="text-white/70 text-sm leading-relaxed italic">"{msg.message}"</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-row md:flex-col justify-between items-end gap-4 min-w-[150px]">
                  <div className="flex items-center gap-2 text-white/30">
                    <Clock size={14} />
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      {new Date(msg.created_at).toLocaleString('az-AZ')}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    {/* Silmək və ya Oxundu kimi işarələmək üçün əlavə funksiyalar bura gələ bilər */}
                    <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest rounded-lg transition-colors">
                      Öhədlikdədİr
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      if (res.ok) {
        router.push('/admin/dashboard');
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || 'Daxil olarkən xəta baş verdi');
      }
    } catch (err) {
      setError('Sistem xətası');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-2xl border border-white/10"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-2">NAF Admin</h1>
          <p className="text-[#f59e0b] text-sm tracking-widest font-bold">İDARƏETMƏ PANELİ</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-lg text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2 uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#2a2a2a] border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/70 text-sm font-medium mb-2 uppercase tracking-wider">Şifrə</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#2a2a2a] border border-white/10 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b] transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-black font-black uppercase tracking-widest py-3 rounded-lg transition-colors flex items-center justify-center"
          >
            {loading ? 'Yoxlanılır...' : 'Daxil Ol'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
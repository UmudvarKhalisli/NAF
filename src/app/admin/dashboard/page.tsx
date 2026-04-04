"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase/client';
import { 
  Users, 
  Truck, 
  CreditCard, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  PackageCheck
} from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalEquipment: 0,
    rentedEquipment: 0,
    monthlyOrders: 0,
    monthlyRevenue: 0
  });
  
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Total Equipment
      const { count: eqCount } = await supabase
        .from('equipment')
        .select('*', { count: 'exact', head: true });
        
      // 2. Rented Equipment
      const { count: rentedCount } = await supabase
        .from('equipment')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'rented');
        
      // 3. Mod kəşfiyyatı (real DB yoxlamaq lazımdı, dummy data)
      const currentMonth = new Date().toISOString().substring(0, 7);
      
      const { data: revenueData } = await supabase
        .from('revenue')
        .select('amount')
        .gte('date', `${currentMonth}-01`);

      const totalRevenue = revenueData?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

      const { count: orderCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', `${currentMonth}-01`);

      // Gecikməmək üçün:
      setStats({
        totalEquipment: eqCount || 0,
        rentedEquipment: rentedCount || 0,
        monthlyOrders: orderCount || 0,
        monthlyRevenue: totalRevenue
      });

      // 4. Son 5 Sifariş
      const { data: latestOrders } = await supabase
        .from('orders')
        .select('id, customer_name, equipment_name, status, created_at, source')
        .order('created_at', { ascending: false })
        .limit(5);

      if (latestOrders) setRecentOrders(latestOrders);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "ÜMUMİ TEXNİKA",
      value: stats.totalEquipment.toString(),
      icon: Truck,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "İCARƏDƏ OLAN",
      value: stats.rentedEquipment.toString(),
      icon: PackageCheck,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    {
      title: "BU AY SİFARİŞ",
      value: stats.monthlyOrders.toString(),
      icon: Users,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "BU AY GƏLİR",
      value: `${stats.monthlyRevenue.toLocaleString()} AZN`,
      icon: TrendingUp,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    }
  ];

  return (
    <div className="p-6 lg:p-8">
      {/* Header Info */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white uppercase tracking-wider mb-1">
          DASHBOARD
        </h1>
        <p className="text-sm font-bold text-white/40 tracking-widest uppercase">
          Ümumi Statistika Və Nəzarət Panelİ
        </p>
      </div>

      {loading ? (
        <div className="h-64 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#1a1a1a] border-t-[#f59e0b] rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 bg-[#1a1a1a] rounded-2xl border border-white/5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mb-2">
                      {stat.title}
                    </p>
                    <h3 className="text-3xl font-black text-white truncate break-all">
                      {stat.value}
                    </h3>
                  </div>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                    <stat.icon size={24} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Recent Orders Section */}
          <div className="bg-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-white uppercase tracking-wider">Son SİFARİŞLƏR</h2>
                <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 mt-1 uppercase">Sistemə daxil olan ardıcıllıqla</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-black/20 text-[10px] uppercase tracking-widest text-white/50 font-black">
                    <th className="p-4 border-b border-white/5 whitespace-nowrap">Sifariş ID / Tarix</th>
                    <th className="p-4 border-b border-white/5 whitespace-nowrap">Müştəri</th>
                    <th className="p-4 border-b border-white/5 whitespace-nowrap">Texnika</th>
                    <th className="p-4 border-b border-white/5 whitespace-nowrap">Mənbə</th>
                    <th className="p-4 border-b border-white/5 whitespace-nowrap text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-white/30 uppercase tracking-widest font-bold text-xs">
                        Hələ sifariş yoxdur
                      </td>
                    </tr>
                  ) : (
                    recentOrders.map((order, index) => (
                      <motion.tr 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        key={order.id} 
                        className="hover:bg-white/[0.02] border-b border-white/5 transition-colors group"
                      >
                        <td className="p-4 align-top whitespace-nowrap max-w-[200px]">
                          <div className="font-bold text-white mb-1 truncate">{order.id.split('-')[0]}..</div>
                          <div className="text-[10px] text-white/40 tracking-wider">
                            {new Date(order.created_at).toLocaleDateString('az-AZ')}
                          </div>
                        </td>
                        <td className="p-4 align-top text-white/80 font-medium">
                          {order.customer_name}
                        </td>
                        <td className="p-4 align-top">
                          <span className="font-bold text-white group-hover:text-[#f59e0b] transition-colors break-all line-clamp-2">
                            {order.equipment_name}
                          </span>
                        </td>
                        <td className="p-4 align-top">
                          <span className="inline-flex px-2 py-1 bg-white/5 text-white/70 text-[10px] tracking-widest uppercase font-bold rounded">
                            {order.source}
                          </span>
                        </td>
                        <td className="p-4 align-top text-right whitespace-nowrap">
                          <span className={`inline-flex px-3 py-1 text-[10px] uppercase font-black tracking-widest rounded-sm ${
                            order.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' : 
                            order.status === 'active' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                            order.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                            'bg-neutral-500/10 text-neutral-400 border border-neutral-500/20'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
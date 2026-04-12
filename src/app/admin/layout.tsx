"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Truck, 
  Hammer, 
  ShoppingCart, 
  CircleDollarSign, 
  Settings, 
  LogOut,
  Menu,
  ChevronLeft
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/ui/Logo';

export default function AdminLayoutComponent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsOpen(window.innerWidth >= 1024);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    // API-dan çıxış et
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Texnikalar', icon: Truck, path: '/admin/texnikalar' },
    { label: 'Layihələr', icon: Hammer, path: '/admin/layiheler' },
    { label: 'Sifarişlər', icon: ShoppingCart, path: '/admin/sifarisler' },
    { label: 'Maliyyə', icon: CircleDollarSign, path: '/admin/maliyye' },
    { label: 'Parametrlər', icon: Settings, path: '/admin/parametrler' },
  ];

  const isLoginPage = pathname === '/admin/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a] text-white">
      <BrandingGradients />
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isMobile ? 256 : (isOpen ? 256 : 80),
          x: isMobile ? (isOpen ? 0 : -256) : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`fixed lg:sticky top-0 left-0 h-full bg-[#1a1a1a] border-r border-white/5 z-50 flex flex-col shrink-0 overflow-hidden shadow-2xl shadow-black/50`}
      >
        {/* Sidebar Header */}
        <div className="h-24 flex items-center justify-between px-6 border-b border-white/5 whitespace-nowrap overflow-hidden">
          <Link href="/admin/dashboard" className="flex items-center gap-3 w-full">
            {isOpen ? (
              <Logo 
                variant="gold" 
                size={isMobile ? "sm" : "md"} 
                align="left" 
                className="transition-all duration-300"
              />
            ) : (
              <div className="w-10 h-10 bg-[#f59e0b] text-black font-black text-xl flex items-center justify-center shrink-0">N</div>
            )}
          </Link>
          {isMobile && isOpen && (
            <button 
              onClick={() => setIsOpen(false)} 
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/50 hover:text-white transition-colors"
            >
              <ChevronLeft size={22} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2 custom-scrollbar">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => { if(isMobile) setIsOpen(false) }}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all font-bold tracking-widest text-xs uppercase group ${
                pathname.startsWith(item.path)
                  ? 'bg-[#f59e0b] text-black'
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              <AnimatePresence>
                {isOpen && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors font-bold tracking-widest text-xs uppercase group overflow-hidden`}
          >
            <LogOut size={18} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
            <AnimatePresence>
              {isOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="truncate"
                >
                  Çıxış
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Header */}
        <header className="h-20 bg-[#1a1a1a]/50 backdrop-blur-md border-b border-white/5 flex items-center px-6 sticky top-0 z-30 shrink-0">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors"
          >
            <Menu size={20} />
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-white uppercase tracking-widest">Administrator</p>
              <p className="text-[10px] text-[#f59e0b] font-bold uppercase tracking-widest">Onlayn</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-[#f59e0b] flex items-center justify-center bg-black">
              <span className="text-[#f59e0b] font-black text-sm">A</span>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#0a0a0a] custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
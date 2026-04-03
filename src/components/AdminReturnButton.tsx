"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function AdminReturnButton() {
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check if the user came from admin via sessionStorage or query param
    const adminMode = sessionStorage.getItem("is_admin_mode");
    const urlParams = new URLSearchParams(window.location.search);
    
    if (adminMode === "true" || urlParams.has("admin")) {
      // If we see the URL param, make sure it's stored in session too
      if (urlParams.has("admin")) {
        sessionStorage.setItem("is_admin_mode", "true");
      }
      setIsAdmin(true);
    }
  }, []);

  // Hide the button if you're not an admin OR if you're currently in the admin section
  if (!isAdmin || pathname.startsWith("/admin")) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className="fixed bottom-10 right-10 z-[9999]"
      >
        <a
          href="/admin"
          className="group flex flex-col items-end gap-1"
        >
          <span className="text-[10px] font-black tracking-[0.4em] text-black/40 uppercase mb-2 group-hover:text-black transition-colors">
            ADMIN PANELİ
          </span>
          <div className="flex items-center gap-6 px-10 py-5 bg-black text-white border border-black hover:bg-white hover:text-black transition-all duration-700 shadow-2xl">
            <span className="text-[11px] font-black tracking-[0.3em] uppercase">GERİ QAYIT</span>
            <div className="w-8 h-[1px] bg-white group-hover:bg-black transition-all" />
          </div>
        </a>
      </motion.div>
    </AnimatePresence>
  );
}

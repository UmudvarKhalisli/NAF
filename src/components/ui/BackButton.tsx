"use client";

import Link from "next/link";
import { MoveLeft } from "lucide-react";

interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export default function BackButton({ href, label = "GERİYƏ", className = "" }: BackButtonProps) {
  return (
    <Link 
      href={href}
      className={`group inline-flex items-center gap-2 text-[10px] font-black tracking-[0.3em] text-black/40 hover:text-black transition-all duration-300 uppercase ${className}`}
    >
      <MoveLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-1" />
      <span>{label}</span>
      <div className="w-0 group-hover:w-8 h-[1px] bg-black transition-all duration-500 ml-2" />
    </Link>
  );
}

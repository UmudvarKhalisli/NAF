"use client";

import React from 'react';

export default function BrandingGradients() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none opacity-0 invisible" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Primary Gold Gradient (Navbar Transparent, Footer, Hero) */}
        {/* Universal Ultra-High-Contrast Gold (Bulletproof for all background states) */}
        <linearGradient id="logo-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5A4312" />  {/* Dark Bronze */}
          <stop offset="40%" stopColor="#AE8625" /> {/* Strategic Rich Gold */}
          <stop offset="60%" stopColor="#7B5C1B" /> {/* Deep Bronze */}
          <stop offset="100%" stopColor="#45340E" /> {/* Ultra Dark Shadow */}
        </linearGradient>

        {/* Global High-Performance Logo Shadow - Strategic for Legibility */}
        <filter id="logo-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="rgba(0,0,0,0.65)" />
        </filter>
      </defs>
    </svg>
  );
}

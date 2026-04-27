"use client";

import React from 'react';

export default function BrandingGradients() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none opacity-0 invisible" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Primary Gold Gradient (Navbar Transparent, Footer, Hero) */}
        {/* Universal Ultra-High-Contrast Gold (Bulletproof for all background states) */}
        <linearGradient id="logo-gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8A6E2F" />  {/* Muted Gold Shadow */}
          <stop offset="25%" stopColor="#C5A059" /> {/* Rich Gold */}
          <stop offset="50%" stopColor="#FFF1BE" /> {/* Bright Highlight */}
          <stop offset="75%" stopColor="#AE8625" /> {/* Strategic Mid Gold */}
          <stop offset="100%" stopColor="#5A4312" /> {/* Deep Bronze Shadow */}
        </linearGradient>

        {/* Global High-Performance Logo Shadow - Strategic for Legibility */}
        <filter id="logo-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.8)" />
        </filter>
      </defs>
    </svg>
  );
}

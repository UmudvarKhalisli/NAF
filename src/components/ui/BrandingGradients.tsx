"use client";

import React from 'react';

export default function BrandingGradients() {
  return (
    <svg width="0" height="0" className="absolute pointer-events-none opacity-0 invisible" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Primary Gold Gradient (Navbar Transparent, Footer, Hero) */}
        {/* Universal Robust Gold Gradient (Works on both white and dark backgrounds) */}
        <linearGradient id="logo-gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8A6E2F" />
          <stop offset="25%" stopColor="#C5A059" />
          <stop offset="50%" stopColor="#8A6E2F" />
          <stop offset="75%" stopColor="#AE8625" />
          <stop offset="100%" stopColor="#8A6E2F" />
        </linearGradient>
      </defs>
    </svg>
  );
}

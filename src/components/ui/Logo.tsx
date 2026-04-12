"use client";

import React from 'react';

interface LogoProps {
  variant?: 'gold' | 'black' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  width?: number;
  height?: number;
}

export default function Logo({ 
  variant = 'gold', 
  className = "", 
  size = 'md',
  width: customWidth,
  height: customHeight
}: LogoProps) {
  
  // Dimensions mapping
  const dimensions = {
    sm: { w: 120, h: 40 },
    md: { w: 180, h: 60 },
    lg: { w: 240, h: 80 },
    xl: { w: 320, h: 100 },
    custom: { w: customWidth || 180, h: customHeight || 60 }
  };

  const { w, h } = dimensions[size];

  // Colors mapping
  const colors = {
    gold: 'url(#logo-gold-gradient)',
    black: '#000000',
    white: '#FFFFFF'
  };

  const fillColor = colors[variant];

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        width={w} 
        height={h} 
        viewBox="0 0 200 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* NAF Header Main Text - Vertically centered more since lines are gone */}
        <text 
          x="50%" 
          y="38" 
          textAnchor="middle" 
          className="font-playfair"
          style={{ 
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 900,
            fontSize: '48px',
            fill: fillColor
          }}
        >
          NAF
        </text>

        {/* Subtitle: TEXNIKA - Moved slightly down */}
        <text 
          x="50%" 
          y="56" 
          textAnchor="middle" 
          style={{ 
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontWeight: 800,
            fontSize: '10px',
            letterSpacing: '0.6em',
            fill: fillColor,
            textTransform: 'uppercase'
          }}
        >
          TEXNIKA
        </text>

        {/* Gold Gradient Definition */}
        <defs>
          <linearGradient id="logo-gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#BF953F" />
            <stop offset="25%" stopColor="#FCF6BA" />
            <stop offset="50%" stopColor="#B38728" />
            <stop offset="75%" stopColor="#FBF5B7" />
            <stop offset="100%" stopColor="#AA771C" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

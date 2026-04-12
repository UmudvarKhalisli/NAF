"use client";

import React from 'react';

interface LogoProps {
  variant?: 'gold' | 'gold-dark' | 'black' | 'white';
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  align?: 'left' | 'center';
  width?: number;
  height?: number;
}

export default function Logo({ 
  variant = 'gold', 
  className = "", 
  size = 'md',
  align = 'center',
  width: customWidth,
  height: customHeight
}: LogoProps) {
  
  // Dimensions mapping
  const dimensions = {
    xs: { w: 100, h: 32, font: 32, sub: 8 },
    sm: { w: 120, h: 40, font: 38, sub: 9 },
    md: { w: 180, h: 60, font: 46, sub: 10 },
    lg: { w: 240, h: 80, font: 56, sub: 12 },
    xl: { w: 320, h: 100, font: 72, sub: 14 },
    custom: { w: customWidth || 180, h: customHeight || 60, font: 46, sub: 10 }
  };

  const { w, h, font, sub } = dimensions[size];

  // Colors mapping (Simplified to use only global gold for metallic variants)
  const colors = {
    gold: 'url(#logo-gold-gradient)',
    'gold-dark': 'url(#logo-gold-gradient)', // Use same robust gold
    black: '#000000',
    white: '#FFFFFF'
  };

  const fillColor = colors[variant];
  const isLeft = align === 'left';
  const xPos = isLeft ? "-4" : "50%";
  const textAnchor = isLeft ? "start" : "middle";

  return (
    <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-center'} ${className}`}>
      <svg 
        width={w} 
        height={h} 
        viewBox={`0 0 ${w} ${h}`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* NAF Header Main Text */}
        <text 
          x={xPos} 
          y={h * 0.65} 
          textAnchor={textAnchor}
          className="font-playfair"
          filter="url(#logo-shadow)"
          style={{ 
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 900,
            fontSize: `${font}px`,
            fill: fillColor
          }}
        >
          NAF
        </text>

        {/* Subtitle: TEXNIKA */}
        <text 
          x={xPos} 
          y={h * 0.95} 
          textAnchor={textAnchor}
          filter="url(#logo-shadow)"
          style={{ 
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontWeight: 800,
            fontSize: `${sub}px`,
            letterSpacing: '0.6em',
            fill: fillColor,
            textTransform: 'uppercase'
          }}
        >
          TEXNIKA
        </text>

      </svg>
    </div>
  );
}

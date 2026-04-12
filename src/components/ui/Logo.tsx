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
  
  // Dimensions mapping - Slightly enlarged for better presence on white backgrounds
  const dimensions = {
    xs: { w: 100, h: 32, font: 32, sub: 9 },
    sm: { w: 140, h: 48, font: 40, sub: 10 },
    md: { w: 200, h: 64, font: 48, sub: 11 },
    lg: { w: 260, h: 84, font: 58, sub: 13 },
    xl: { w: 340, h: 110, font: 74, sub: 15 },
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
            fontWeight: 900, // Boosted to extra black
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

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
  
  // Dimensions mapping - Optimized for the new double-line structure
  const dimensions = {
    xs: { w: 100, h: 32, font: 28, sub: 7, spacing: '0.4em' },
    sm: { w: 160, h: 48, font: 44, sub: 10, spacing: '0.45em' },
    md: { w: 220, h: 74, font: 64, sub: 13, spacing: '0.5em' },
    lg: { w: 320, h: 100, font: 88, sub: 18, spacing: '0.55em' },
    xl: { w: 450, h: 140, font: 120, sub: 24, spacing: '0.6em' },
    custom: { w: customWidth || 180, h: customHeight || 60, font: 46, sub: 10, spacing: '0.5em' }
  };

  const { w, h, font, sub, spacing } = dimensions[size];

  // Colors mapping (Simplified to use only global gold for metallic variants)
  const colors = {
    gold: 'url(#logo-gold-gradient)',
    'gold-dark': 'url(#logo-gold-gradient)', // Use same robust gold
    black: '#000000',
    white: '#FFFFFF'
  };

  const fillColor = colors[variant];
  const isLeft = align === 'left';
  const xPos = isLeft ? "0" : "50%";
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
          y={h * 0.62} 
          textAnchor={textAnchor}
          style={{ 
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 900,
            fontSize: `${font}px`,
            fill: fillColor,
            filter: 'url(#logo-shadow)',
            letterSpacing: '-0.02em'
          }}
        >
          NAF
        </text>

        {/* Subtitle: TEXNİKA *7767 */}
        <text 
          x={xPos} 
          y={h * 0.95} 
          textAnchor={textAnchor}
          style={{ 
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontWeight: 800,
            fontSize: `${sub}px`,
            letterSpacing: spacing,
            fill: fillColor,
            filter: 'url(#logo-shadow)',
            textTransform: 'uppercase'
          }}
        >
          TEXNİKA *7767
        </text>

      </svg>
    </div>
  );
}

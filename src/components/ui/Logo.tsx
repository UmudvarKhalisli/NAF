"use client";

import React from 'react';

interface LogoProps {
  variant?: 'gold' | 'gold-dark' | 'black' | 'white';
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  align?: 'left' | 'center';
  width?: number;
  height?: number;
  isLightBackground?: boolean;
}

export default function Logo({ 
  variant = 'gold', 
  className = "", 
  size = 'md',
  align = 'center',
  width: customWidth,
  height: customHeight,
  isLightBackground = false
}: LogoProps) {
  
  // Dimensions mapping - Optimized for the new double-line structure
  const dimensions = {
    xs: { w: 100, h: 32, font: 28, sub: 7 },
    sm: { w: 160, h: 48, font: 44, sub: 10 },
    md: { w: 220, h: 74, font: 64, sub: 13 },
    lg: { w: 320, h: 100, font: 88, sub: 18 },
    xl: { w: 450, h: 140, font: 120, sub: 24 },
    custom: { w: customWidth || 180, h: customHeight || 60, font: 46, sub: 10 }
  };

  const { w, h, font, sub } = dimensions[size];

  // Colors mapping (Simplified to use only global gold for metallic variants)
  const colors = {
    gold: 'url(#logo-gold-gradient)',
    'gold-dark': 'url(#logo-gold-gradient)', 
    black: '#000000',
    white: '#FFFFFF'
  };

  const fillColor = colors[variant];
  const isLeft = align === 'left';
  const xPos = isLeft ? "0" : "50%";
  const textAnchor = isLeft ? "start" : "middle";

  // Calculate a consistent width for both text elements to ensure they align at start and end
  // We use about 95% of the SVG width to prevent clipping
  const targetWidth = w * 0.95;

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
          textLength={targetWidth}
          lengthAdjust="spacing"
          style={{ 
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 900,
            fontSize: `${font}px`,
            fill: fillColor,
            filter: isLightBackground ? 'drop-shadow(0px 2px 3px rgba(0,0,0,0.4))' : 'url(#logo-shadow)',
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
          textLength={targetWidth}
          lengthAdjust="spacing"
          style={{ 
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontWeight: 800,
            fontSize: `${sub}px`,
            fill: fillColor,
            filter: isLightBackground ? 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))' : 'url(#logo-shadow)',
            textTransform: 'uppercase'
          }}
        >
          TEXNİKA *7767
        </text>

      </svg>
    </div>
  );
}

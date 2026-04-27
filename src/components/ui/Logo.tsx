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
  
  // Dimensions mapping - Optimized for 3-line vertical layout with equal widths
  const dimensions = {
    xs: { w: 100, h: 50, font: 28, sub: 10 },
    sm: { w: 140, h: 65, font: 40, sub: 14 },
    md: { w: 200, h: 90, font: 58, sub: 20 },
    lg: { w: 280, h: 130, font: 82, sub: 28 },
    xl: { w: 400, h: 180, font: 115, sub: 40 },
    custom: { w: customWidth || 180, h: customHeight || 80, font: 40, sub: 14 }
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

  // The width of "NAF" will be our anchor. 
  // At font size 40 (sm), "NAF" is roughly 82px wide in Playfair Black.
  const anchorWidth = size === 'sm' ? 82 : (size === 'xs' ? 58 : w * 0.58);

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
        {/* Line 1: NAF - No spacing as requested */}
        <text 
          x={xPos} 
          y={h * 0.38} 
          textAnchor={textAnchor}
          style={{ 
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 900,
            fontSize: `${font}px`,
            fill: fillColor,
            filter: isLightBackground ? 'drop-shadow(0px 2px 3px rgba(0,0,0,0.4))' : 'url(#logo-shadow)',
            letterSpacing: '-0.02em', // Tightened as requested
            transition: 'fill 0.5s ease, filter 0.5s ease'
          }}
        >
          NAF
        </text>

        {/* Line 2: TEXNİKA - Matches width of NAF */}
        <text 
          x={xPos} 
          y={h * 0.65} 
          textAnchor={textAnchor}
          textLength={anchorWidth} 
          lengthAdjust="spacing"
          style={{ 
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontWeight: 900,
            fontSize: `${sub}px`,
            fill: fillColor,
            filter: isLightBackground ? 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))' : 'url(#logo-shadow)',
            textTransform: 'uppercase',
            transition: 'fill 0.5s ease, filter 0.5s ease'
          }}
        >
          TEXNİKA
        </text>

        {/* Line 3: *7767 - Matches width of NAF */}
        <text 
          x={xPos} 
          y={h * 0.92} 
          textAnchor={textAnchor}
          textLength={anchorWidth}
          lengthAdjust="spacing"
          style={{ 
            fontFamily: 'var(--font-jakarta), sans-serif',
            fontWeight: 900,
            fontSize: `${sub}px`,
            fill: fillColor,
            filter: isLightBackground ? 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))' : 'url(#logo-shadow)',
            transition: 'fill 0.5s ease, filter 0.5s ease'
          }}
        >
          *7767
        </text>

      </svg>
    </div>
  );
}

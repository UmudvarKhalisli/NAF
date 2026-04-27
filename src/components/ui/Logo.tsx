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
  
  // Dimensions mapping - Optimized for 3-line vertical layout
  const dimensions = {
    xs: { w: 100, h: 40, font: 24, sub: 6 },
    sm: { w: 160, h: 64, font: 38, sub: 9 },
    md: { w: 220, h: 90, font: 56, sub: 12 },
    lg: { w: 320, h: 130, font: 80, sub: 16 },
    xl: { w: 450, h: 180, font: 110, sub: 22 },
    custom: { w: customWidth || 180, h: customHeight || 80, font: 40, sub: 10 }
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

  // Calculate a consistent width for all text elements to ensure they align perfectly
  const targetWidth = w * 0.92; // Using 92% to leave a tiny bit of breathing room

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
        {/* Line 1: NAF */}
        <text 
          x={xPos} 
          y={h * 0.45} 
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

        {/* Line 2: TEXNİKA */}
        <text 
          x={xPos} 
          y={h * 0.72} 
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
          TEXNİKA
        </text>

        {/* Line 3: *7767 */}
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
            filter: isLightBackground ? 'drop-shadow(0px 1px 2px rgba(0,0,0,0.3))' : 'url(#logo-shadow)'
          }}
        >
          *7767
        </text>

      </svg>
    </div>
  );
}

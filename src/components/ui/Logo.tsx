"use client";

import React from 'react';

interface LogoProps {
  variant?: 'gold' | 'gold-dark' | 'black' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
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
    'gold-dark': 'url(#logo-gold-dark-gradient)',
    black: '#000000',
    white: '#FFFFFF'
  };

  const fillColor = colors[variant];
  const isLeft = align === 'left';
  const xPos = isLeft ? "0%" : "50%";
  const textAnchor = isLeft ? "start" : "middle";

  return (
    <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-center'} ${className}`}>
      <svg 
        width={w} 
        height={h} 
        viewBox="0 0 200 60" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <filter id="logo-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgba(0,0,0,0.15)" />
        </filter>

        {/* NAF Header Main Text - Vertically centered more since lines are gone */}
        <text 
          x={xPos} 
          y="38" 
          textAnchor={textAnchor}
          className="font-playfair"
          filter={variant === 'gold-dark' ? 'url(#logo-shadow)' : undefined}
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
          x={xPos} 
          y="56" 
          textAnchor={textAnchor}
          filter={variant === 'gold-dark' ? 'url(#logo-shadow)' : undefined}
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

          <linearGradient id="logo-gold-dark-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A6E2F" />
            <stop offset="25%" stopColor="#C5A059" />
            <stop offset="50%" stopColor="#8A6E2F" />
            <stop offset="75%" stopColor="#AE8625" />
            <stop offset="100%" stopColor="#8A6E2F" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

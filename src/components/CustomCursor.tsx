"use client";

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth movement settings
  const springConfig = { damping: 30, stiffness: 350 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(!!isClickable);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Outer ring (expands on hover) */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -12,
          top: -12,
        }}
        animate={{
          scale: isHovering ? 1.5 : 0.3,
          opacity: isHovering ? 0.15 : 0.4,
          backgroundColor: isHovering ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0)',
          border: isHovering ? 'none' : '2px solid rgba(0, 0, 0, 1)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="w-6 h-6 rounded-full hidden lg:block absolute"
      />
      
      {/* Central dot (always solid and small) */}
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
          left: -1.5,
          top: -1.5,
        }}
        className="w-3 h-3 bg-black rounded-full hidden lg:block absolute scale-[0.2]"
      />
    </div>
  );
}

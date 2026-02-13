import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, .cursor-hover')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-blue pointer-events-none z-[9999] flex items-center justify-center backdrop-blur-sm"
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        backgroundColor: isHovering ? 'rgba(0, 85, 150, 0.1)' : 'rgba(0, 0, 0, 0)',
        borderColor: isHovering ? 'rgba(0, 174, 239, 0)' : 'rgba(0, 85, 150, 0.5)'
      }}
    >
      <div className="w-1 h-1 bg-brand-orange rounded-full" />
    </motion.div>
  );
};
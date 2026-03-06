'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { ServiceShowcase } from './components/ServiceShowcase';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundCanvas } from './components/BackgroundCanvas';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lineDone, setLineDone] = useState(false);
  const [lineMetrics, setLineMetrics] = useState({ top: 0, stopWidth: 0, dotX: 0 });
  const loaderTextRef = useRef<HTMLDivElement>(null);
  const lastSRef = useRef<HTMLSpanElement>(null);

  // Scroll-driven background tint: cool neutral → warm amber near bottom
  const { scrollYProgress: pageProgress } = useScroll();
  const bgHue = useTransform(pageProgress, [0, 0.7, 1], [220, 38, 30]);
  const bgSat = useTransform(pageProgress, [0, 0.7, 1], [8, 14, 18]);
  const bgLight = useTransform(pageProgress, [0, 1], [99, 98]);
  const bgColor = useMotionTemplate`hsl(${bgHue} ${bgSat}% ${bgLight}%)`;

  useEffect(() => {
    const updateMetrics = () => {
      const textEl = loaderTextRef.current;
      const sEl = lastSRef.current;
      if (!textEl || !sEl) return;

      const textRect = textEl.getBoundingClientRect();
      const sRect = sEl.getBoundingClientRect();
      setLineMetrics({
        top: textRect.bottom + 12,
        stopWidth: Math.max(180, sRect.right),
        dotX: sRect.left + sRect.width / 2 - 6,
      });
    };

    const frame = requestAnimationFrame(updateMetrics);
    window.addEventListener('resize', updateMetrics);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', updateMetrics);
    };
  }, []);

  useEffect(() => {
    if (!lineDone) return;
    const hold = setTimeout(() => setIsLoaded(true), 120);
    return () => clearTimeout(hold);
  }, [lineDone]);

  useEffect(() => {
    const safety = setTimeout(() => {
      setLineDone(true);
    }, 2500);

    return () => {
      clearTimeout(safety);
    };
  }, []);

  return (
    <motion.div style={{ backgroundColor: bgColor }} className="relative min-h-screen text-brand-dark">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCanvas />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        
        <main id="main-content">
          <Hero />
          <Manifesto />
          <ServiceShowcase />
          <Contact />
        </main>

        <Footer />
      </div>

      <div className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none ${isLoaded ? '-translate-y-full' : 'translate-y-0'}`}>
        <div ref={loaderTextRef} className="relative inline-flex items-baseline">
          <span className="text-5xl sm:text-6xl font-display font-bold text-brand-blue tracking-tighter">
            CJN
          </span>
          <span className="text-5xl sm:text-6xl font-display font-bold mx-3 tracking-tighter" style={{ color: '#F29216' }}>
            |
          </span>
          <span className="text-5xl sm:text-6xl font-display font-bold tracking-tighter" style={{ color: '#445373' }}>
            IT&nbsp;Solution<span ref={lastSRef}>s</span>
          </span>
        </div>

        {lineMetrics.stopWidth > 0 && (
          <div
            className="fixed left-0 h-[4px] rounded-full bg-[#C15F00] will-change-transform"
            style={{
              top: `${lineMetrics.top}px`,
              width: `${lineMetrics.stopWidth}px`,
              transformOrigin: 'left center',
              animation: `loader-grow 0.78s cubic-bezier(0.22,1,0.36,1) forwards,
                         loader-collapse 0.48s cubic-bezier(0.55,0,1,0.45) 0.92s forwards`,
            }}
            onAnimationEnd={(e) => {
              if (e.animationName === 'loader-collapse') setLineDone(true);
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default App;

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--brand-blue) 0%, var(--liquid-blue-core) 50%, var(--brand-orange) 100%)',
      }}
    />
  );
}

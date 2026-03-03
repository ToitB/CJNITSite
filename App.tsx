'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
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

  useEffect(() => {
    const updateMetrics = () => {
      const el = loaderTextRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      setLineMetrics({
        top: rect.bottom + 12,
        stopWidth: Math.max(180, rect.right - 16),
        dotX: rect.right - 2,
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
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-brand-dark">
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

      {/* Loading Overlay */}
      <div className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none ${isLoaded ? '-translate-y-full' : 'translate-y-0'}`}>
        <div ref={loaderTextRef} className="relative inline-flex items-end pr-5">
          <div className="text-6xl font-display font-bold text-brand-blue tracking-tighter">
            CJN IT
          </div>

          <motion.span
            className="absolute right-0 text-6xl font-display font-bold text-[#C15F00] leading-none"
            initial={{ opacity: 0, scale: 0.2, y: 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.26, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            .
          </motion.span>
        </div>

        {lineMetrics.stopWidth > 0 && (
          <motion.div
            className="fixed left-0 h-[4px] rounded-full bg-[#C15F00]"
            style={{ top: `${lineMetrics.top}px` }}
            initial={{ x: 0, width: 0, opacity: 1 }}
            animate={{
              x: [0, 0, 0, lineMetrics.dotX],
              width: [0, lineMetrics.stopWidth, lineMetrics.stopWidth, 12],
              opacity: [1, 1, 1, 0],
            }}
            transition={{
              duration: 1.42,
              times: [0, 0.54, 0.82, 1],
              ease: [0.22, 1, 0.36, 1],
            }}
            onAnimationComplete={() => setLineDone(true)}
          />
        )}
      </div>
    </div>
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

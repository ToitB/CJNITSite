'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { ServiceShowcase } from './components/ServiceShowcase';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundCanvas } from './components/BackgroundCanvas';

const AnimatedGlobe = dynamic(() => import('./components/AnimatedGlobe'), { ssr: false });

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Scroll-driven background tint: cool neutral → warm amber near bottom
  const { scrollYProgress: pageProgress } = useScroll();
  const bgHue = useTransform(pageProgress, [0, 0.7, 1], [220, 38, 30]);
  const bgSat = useTransform(pageProgress, [0, 0.7, 1], [8, 14, 18]);
  const bgLight = useTransform(pageProgress, [0, 1], [99, 98]);
  const bgColor = useMotionTemplate`hsl(${bgHue} ${bgSat}% ${bgLight}%)`;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2200);
    return () => clearTimeout(timer);
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

      <div className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none ${isLoaded ? '-translate-y-full' : 'translate-y-0'}`}>
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatedGlobe size={140} ariaLabel="Loading CJN IT Solutions" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex items-baseline gap-3"
        >
          <span className="text-3xl sm:text-4xl font-display font-bold text-brand-blue tracking-tighter">CJN</span>
          <span className="text-3xl sm:text-4xl font-display font-bold tracking-tighter" style={{ color: '#F29216' }}>|</span>
          <span className="text-3xl sm:text-4xl font-display font-bold tracking-tighter" style={{ color: '#445373' }}>IT Solutions</span>
        </motion.div>
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

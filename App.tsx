'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BackgroundCanvas } from './components/BackgroundCanvas';

const Manifesto = dynamic(() => import('./components/Manifesto').then(m => ({ default: m.Manifesto })), { ssr: false });
const ServiceShowcase = dynamic(() => import('./components/ServiceShowcase').then(m => ({ default: m.ServiceShowcase })), { ssr: false });
const Contact = dynamic(() => import('./components/Contact').then(m => ({ default: m.Contact })), { ssr: false });
const Footer = dynamic(() => import('./components/Footer').then(m => ({ default: m.Footer })), { ssr: false });

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-driven background tint: cool neutral → warm amber near bottom
  const { scrollYProgress: pageProgress } = useScroll({ container: containerRef });
  const bgHue = useTransform(pageProgress, [0, 0.7, 1], [220, 38, 30]);
  const bgSat = useTransform(pageProgress, [0, 0.7, 1], [8, 14, 18]);
  const bgLight = useTransform(pageProgress, [0, 1], [99, 98]);
  const bgColor = useMotionTemplate`hsl(${bgHue} ${bgSat}% ${bgLight}%)`;

  return (
    <motion.div ref={containerRef} style={{ backgroundColor: bgColor }} className="relative h-screen overflow-y-auto text-brand-dark">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCanvas />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        
        <main id="main-content">
          <Hero />
          <Manifesto />
          <ServiceShowcase />
          <Contact />
        </main>

        <Footer />
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

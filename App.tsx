'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Manifesto } from './components/Manifesto';
import { ServiceShowcase } from './components/ServiceShowcase';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackgroundCanvas } from './components/BackgroundCanvas';

const App: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-white text-brand-dark selection:bg-brand-orange selection:text-white">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCanvas />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 transition-opacity duration-1000 ease-out ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        
        <main>
          <Hero />
          <Manifesto />
          <ServiceShowcase />
          <Contact />
        </main>

        <Footer />
      </div>

      {/* Loading Overlay */}
      <div className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] pointer-events-none ${isLoaded ? '-translate-y-full' : 'translate-y-0'}`}>
        <div className="text-6xl font-display font-bold text-brand-blue tracking-tighter">
          CJN IT
        </div>
      </div>
    </div>
  );
};

export default App;

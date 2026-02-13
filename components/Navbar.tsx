import React, { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const AnimatedGlobe = dynamic(() => import('./AnimatedGlobe'), { ssr: false });

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const menuItems = [
    { title: "Home", href: "/" },
    { title: "Philosophy", href: "/#manifesto" },
    { title: "Solutions", href: "/#services" },
    { title: "Resources", href: "/resources" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/#contact" }
  ];

  return (
    <>
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -14, scaleY: 0.72, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, scaleY: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -18, scaleY: 0.5, filter: 'blur(9px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 h-[92px] md:h-[110px] z-30 bg-white/94 backdrop-blur-lg border-b border-slate-300/85 shadow-md shadow-slate-300/55 pointer-events-none origin-top"
          />
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center">

        <a href="/" className="flex items-center gap-3 group cursor-hover">
          <AnimatedGlobe size={40} className="-translate-y-px" ariaLabel="Animated globe symbolizing resilient IT infrastructure" />
          <div className="leading-tight">
            <div className="font-display font-bold text-xl tracking-tight text-brand-dark transition-colors">
              CJN IT <span className="text-slate-400">|</span>{' '}
              <span className="text-[#C15F00]">Solutions</span>
            </div>
            <div className="font-subheading text-xs tracking-wide text-slate-500">
              Structured IT, Seamless Business
            </div>
          </div>
        </a>

        <div className="flex items-center gap-2 md:gap-3">
          <a
            href="/resources"
            className="hidden sm:inline-flex items-center font-subheading text-xs uppercase tracking-widest text-slate-600 px-4 py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm hover:text-brand-blue hover:border-brand-blue/50 transition-colors"
          >
            Resources
          </a>
          <a
            href="/blog"
            className="hidden sm:inline-flex items-center font-subheading text-xs uppercase tracking-widest text-slate-600 px-4 py-2 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm hover:text-brand-blue hover:border-brand-blue/50 transition-colors"
          >
            Blog
          </a>
          <button 
            onClick={() => setIsOpen(true)} 
            className="flex items-center gap-3 group cursor-hover bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 hover:border-brand-blue/50 transition-colors"
          >
            <span className="hidden md:block font-subheading text-xs uppercase tracking-widest text-slate-500 group-hover:text-brand-blue transition-colors">Menu</span>
            <Menu className="w-5 h-5 text-brand-dark group-hover:text-brand-blue transition-colors" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-slate-950 text-slate-100 flex flex-col"
          >
            {/* Header inside Menu */}
            <div className="px-6 py-6 md:px-12 md:py-8 flex justify-between items-center border-b border-slate-700/40 bg-gradient-to-r from-slate-950 to-slate-800">
              <div className="flex items-center gap-3">
                <AnimatedGlobe size={34} ariaLabel="Animated globe symbolizing resilient IT infrastructure" />
                <div className="leading-tight">
                  <div className="font-display font-bold text-xl tracking-tight text-white">
                    CJN IT <span className="text-slate-400">|</span>{' '}
                    <span className="text-[#C15F00]">Solutions</span>
                  </div>
                  <div className="font-subheading text-xs tracking-wide text-slate-400">
                    Structured IT, Seamless Business
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="group p-2 cursor-hover bg-slate-700/60 rounded-full hover:bg-slate-600/80 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Menu Grid */}
            <div className="flex-1 grid md:grid-cols-2 lg:grid-cols-3">
              {/* Navigation Links */}
              <div className="lg:col-span-2 p-6 md:p-12 flex flex-col justify-center gap-4">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.title}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                    className="group flex items-center gap-6 cursor-hover"
                  >
                    <span className="font-display text-4xl md:text-6xl font-bold text-slate-400 group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </span>
                    <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand-orange" />
                  </motion.a>
                ))}
              </div>

              {/* Contact/Info Panel */}
              <div className="bg-slate-300/90 text-slate-900 p-6 md:p-12 flex flex-col justify-between backdrop-blur-sm">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-subheading text-xs text-slate-700 uppercase tracking-widest mb-4">Headquarters</h3>
                    <p className="font-sans text-lg leading-relaxed text-slate-800">
                      Office 3, Building 5<br/>
                      Glen Manor Office Park<br/>
                      Pretoria, 0084
                    </p>
                  </div>
                  <div>
                    <h3 className="font-subheading text-xs text-slate-700 uppercase tracking-widest mb-4">Support</h3>
                    <p className="font-sans text-lg text-slate-800">087 809 3516</p>
                    <p className="font-sans text-lg text-slate-800">sales@cjn.co.za</p>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-brand-orange rounded-xl text-brand-dark">
                   <p className="font-bold mb-2">Need immediate assistance?</p>
                   <p className="text-sm opacity-90">Our team is available for emergency support.</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

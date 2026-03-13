import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight, Headset } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';

const AnimatedGlobe = dynamic(() => import('./AnimatedGlobe'), { ssr: false });

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap for menu overlay
  const handleOverlayKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !overlayRef.current) return;
    const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keydown', handleOverlayKeyDown);

    // Move focus into overlay
    requestAnimationFrame(() => {
      const closeBtn = overlayRef.current?.querySelector<HTMLElement>('button[aria-label="Close site navigation menu"]');
      closeBtn?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keydown', handleOverlayKeyDown);
      // Return focus to menu button
      menuButtonRef.current?.focus();
    };
  }, [isOpen]);

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
            className="fixed top-0 left-0 right-0 h-[92px] md:h-[110px] z-30 bg-[rgba(3,49,140,0.12)] backdrop-blur-2xl border-b border-white/45 shadow-[0_10px_30px_rgba(2,40,115,0.18)] pointer-events-none origin-top"
          />
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center">

        <a href="/" className="flex items-center gap-3 group cursor-hover">
          <AnimatedGlobe size={40} className="-translate-y-px" ariaLabel="Animated globe symbolizing resilient IT infrastructure" />
          <div className="leading-tight">
            <div className="font-display font-bold text-xl tracking-tight transition-colors">
              <span className="text-brand-blue">CJN</span>{' '}
              <span className="text-brand-orange">|</span>{' '}
              <span className="text-[#445373]">IT Solutions</span>
            </div>
            <div className="font-subheading text-xs tracking-wide text-slate-700">
              Structured IT, Seamless Business
            </div>
          </div>
        </a>

        <div className="glass-dock">
          <a
            href="/"
            className="glass-dock-item hidden sm:inline-flex items-center font-subheading text-xs uppercase tracking-widest text-slate-700 px-4 py-2.5 hover:text-brand-blue transition-colors nav-link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            Home
          </a>
          <a
            href="/resources"
            className="glass-dock-item hidden sm:inline-flex items-center font-subheading text-xs uppercase tracking-widest text-slate-700 px-4 py-2.5 hover:text-brand-blue transition-colors nav-link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            Resources
          </a>
          <a
            href="/blog"
            className="glass-dock-item hidden sm:inline-flex items-center font-subheading text-xs uppercase tracking-widest text-slate-700 px-4 py-2.5 hover:text-brand-blue transition-colors nav-link-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            Blog
          </a>
          <a
            href="https://898.tv/cjnit"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-dock-item liquid-surface hidden sm:inline-flex items-center gap-2 font-subheading text-xs uppercase tracking-widest text-brand-blue hover:text-brand-dark px-4 py-2.5 transition-colors cursor-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
          >
            <Headset className="w-4 h-4" />
            Get Support
          </a>
          <button 
            ref={menuButtonRef}
            onClick={() => setIsOpen(true)} 
            aria-label="Open site navigation menu"
            aria-expanded={isOpen}
            aria-controls="site-navigation-overlay"
            className="glass-dock-item flex items-center gap-3 group cursor-hover px-4 py-2.5 text-slate-700 transition-colors"
          >
            <span className="hidden md:block font-subheading text-xs uppercase tracking-widest text-slate-700 group-hover:text-brand-blue transition-colors">Menu</span>
            <Menu className="w-5 h-5 text-brand-dark group-hover:text-brand-blue transition-colors" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, x: 120, scale: 0.985, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: 120, scale: 0.99, filter: 'blur(6px)' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            id="site-navigation-overlay"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-50 text-slate-900 flex flex-col overflow-hidden bg-[rgba(59,141,191,0.16)] backdrop-blur-[28px]"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-[rgba(22,95,242,0.22)] blur-3xl" />
              <div className="absolute bottom-[-20%] right-[-10%] h-[28rem] w-[28rem] rounded-full bg-[rgba(242,146,22,0.12)] blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(242,242,242,0.32)_0%,rgba(59,141,191,0.14)_42%,rgba(3,49,140,0.18)_100%)]" />
            </div>

            {/* Header inside Menu */}
            <div className="relative px-6 py-6 md:px-12 md:py-8 flex justify-between items-center border-b border-white/45 bg-[rgba(242,242,242,0.16)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <AnimatedGlobe size={34} ariaLabel="Animated globe symbolizing resilient IT infrastructure" />
                <div className="leading-tight">
                  <div className="font-display font-bold text-xl tracking-tight">
                    <span className="text-brand-blue">CJN</span>{' '}
                    <span className="text-brand-orange">|</span>{' '}
                    <span className="text-[#445373]">IT Solutions</span>
                  </div>
                  <div className="font-subheading text-xs tracking-wide text-slate-700">
                    Structured IT, Seamless Business
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                aria-label="Close site navigation menu"
                className="glass-dock-item group p-2.5 cursor-hover text-slate-800 transition-colors"
              >
                <X className="w-6 h-6 text-brand-dark" />
              </button>
            </div>

            {/* Menu Grid */}
            <div className="relative flex-1 grid md:grid-cols-2 lg:grid-cols-3">
              {/* Navigation Links */}
              <div className="lg:col-span-2 p-6 md:p-12 flex flex-col justify-center gap-4 border-b md:border-b-0 md:border-r border-white/55">
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
                    <span className="font-display text-4xl md:text-6xl font-bold text-brand-cyan group-hover:text-brand-blue transition-colors duration-300">
                      {item.title}
                    </span>
                    <ArrowUpRight className="w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all text-brand-cyan" />
                  </motion.a>
                ))}
              </div>

              {/* Contact/Info Panel */}
              <div className="glass-card-accent m-4 md:m-6 lg:m-8 rounded-2xl text-slate-900 p-6 md:p-10 flex flex-col justify-start">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-subheading text-xs text-slate-600 uppercase tracking-widest mb-4">Headquarters</h3>
                    <p className="font-sans text-lg leading-relaxed text-slate-800">
                      Office 3, Building 5<br/>
                      Glen Manor Office Park<br/>
                      Pretoria, 0084
                    </p>
                  </div>
                  <div>
                    <h3 className="font-subheading text-xs text-slate-600 uppercase tracking-widest mb-4">Support</h3>
                    <p className="font-sans text-lg text-slate-800">087 809 3516</p>
                    <p className="font-sans text-lg text-slate-800">sales@cjn.co.za</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

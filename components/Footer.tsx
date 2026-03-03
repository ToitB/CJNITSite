import React from 'react';
import dynamic from 'next/dynamic';

const AnimatedGlobe = dynamic(() => import('./AnimatedGlobe'), { ssr: false });

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 glass-card-strong rounded-none border-x-0 border-b-0">
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-12 md:py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <a href="/" className="flex items-center gap-3 group cursor-hover">
          <div className="relative">
            <AnimatedGlobe
              size={34}
              className="relative z-10 -translate-y-px"
              ariaLabel="Animated globe symbolizing resilient IT infrastructure"
            />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-lg tracking-tight text-brand-dark">
              CJN IT <span className="text-slate-400">|</span>{' '}
              <span className="text-brand-orangeHighlight">Solutions</span>
            </div>
            <div className="font-subheading text-xs tracking-wide text-slate-600">
              Structured IT, Seamless Business
            </div>
          </div>
        </a>

        <div className="font-subheading text-[11px] md:text-xs uppercase tracking-[0.14em] text-slate-600">
          © {year} CJN IT Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

import React from 'react';
import GlobeLogo from './GlobeLogo';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 glass-card-strong rounded-none border-x-0 border-b-0">
      <div className="mx-auto max-w-7xl px-6 py-6 md:px-12 md:py-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <a href="/" className="flex items-center gap-3 group cursor-hover">
          <div className="relative">
            <GlobeLogo
              size={34}
              className="relative z-10 -translate-y-px"
              ariaLabel="Animated globe symbolizing resilient IT infrastructure"
            />
          </div>
          <div className="leading-tight">
            <div className="font-display font-bold text-lg tracking-tight">
              <span className="text-brand-blue">CJN</span>{' '}
              <span className="text-brand-orange">|</span>{' '}
              <span className="text-[#445373]">IT Solutions</span>
            </div>
            <div className="font-subheading text-xs tracking-wide text-slate-700">
              Structured IT, Seamless Business
            </div>
          </div>
        </a>

        <div className="flex items-center gap-6">
          <a href="/privacy" className="cursor-hover font-subheading text-[11px] md:text-xs uppercase tracking-widest text-slate-700 hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2">Privacy</a>
          <a href="/terms" className="cursor-hover font-subheading text-[11px] md:text-xs uppercase tracking-widest text-slate-700 hover:text-brand-blue transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2">Terms</a>
        </div>

        <div className="font-subheading text-[11px] md:text-xs uppercase tracking-widest text-slate-700">
          © {year} CJN IT Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

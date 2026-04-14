'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CONSENT_KEY = 'cjn-cookie-consent-v1';

type ConsentChoice = 'accepted' | 'rejected';

function readStoredConsent(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === 'accepted' || value === 'rejected' ? value : null;
  } catch {
    return null;
  }
}

function storeConsent(choice: ConsentChoice) {
  try {
    window.localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // If storage is unavailable, still dismiss the notice for this session.
  }
}

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(readStoredConsent() === null);
  }, []);

  const handleChoice = (choice: ConsentChoice) => {
    storeConsent(choice);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          role="region"
          aria-label="Cookie consent"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 z-[70] mx-auto max-w-xl md:left-auto md:right-6 md:bottom-6 md:mx-0"
        >
          <div className="glass-card-strong morph-card rounded-2xl border border-white/55 p-5 shadow-[0_22px_70px_rgba(2,40,115,0.22)]">
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-subheading text-[0.7rem] uppercase tracking-[0.28em] text-brand-blue">
                  Privacy Preferences
                </p>
                <h2 className="mt-2 font-display text-xl font-bold tracking-tight text-brand-dark">
                  Cookies, kept simple.
                </h2>
                <p className="mt-2 font-sans text-sm leading-relaxed text-slate-700">
                  We use essential cookies for site functionality. Optional cookies may support live chat
                  and service improvements. You can accept or reject optional cookies.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <a
                  href="/privacy"
                  className="font-subheading text-xs uppercase tracking-widest text-slate-600 underline decoration-brand-cyan/40 underline-offset-4 transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                >
                  Read privacy notice
                </a>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={() => handleChoice('rejected')}
                    className="glass-dock-item px-4 py-2.5 font-subheading text-xs uppercase tracking-widest text-slate-700 transition-colors hover:text-brand-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
                  >
                    Reject optional
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChoice('accepted')}
                    className="btn-accent rounded-xl px-4 py-2.5 font-subheading text-xs uppercase tracking-widest"
                  >
                    Accept optional
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

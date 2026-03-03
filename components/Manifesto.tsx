'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSparkHighlights } from './useSparkHighlights';

const tileItems = [
  { label: 'Established', value: '20+ years of local industry experience.' },
  {
    label: 'Presence',
    value: 'Dedicated support across Pretoria, Centurion, and Johannesburg.',
  },
  {
    label: 'Security and Architecture',
    value: 'Multi-layered security and infrastructure solutions for every sector.',
  },
  { label: 'Performance', value: 'Service levels with sub-60-minute average response times.' },
];

export const Manifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useSparkHighlights(sectionRef);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="min-h-[60vh] flex items-center justify-center bg-slate-50/72 px-6 md:px-12 lg:px-24 py-24 border-y border-slate-200"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <span className="section-kicker">
            <mark className="hx hx-spark !mr-0">The CJN IT Solutions Advantage</mark>
          </span>
        </div>

        <p className="mt-4 font-sans text-2xl md:text-3xl leading-relaxed max-w-4xl text-brand-blue italic">
          <mark className="hx hx-spark hx-body-copy !mr-0">
            Technology is your core operational asset. Relying on reactive repairs means accepting downtime and lost
            revenue. Since 2003, we have deployed structured, proactive IT management that neutralizes threats and
            hardware failures before they impact your workday.
          </mark>
        </p>

        <div className="mt-16 grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
          {tileItems.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card rounded-2xl p-6 min-h-[180px] flex flex-col"
            >
              <div className="section-kicker mb-3">
                <mark className="hx hx-spark !mr-0">{stat.label}</mark>
              </div>
              <div className="font-sans text-xl md:text-2xl text-brand-dark font-semibold leading-snug">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

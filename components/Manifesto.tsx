'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useSparkHighlights } from './useSparkHighlights';

const tileItems = [
  { label: 'Established', value: '20+ years of local expertise.' },
  {
    label: 'Presence',
    value: 'On-the-ground support in Pretoria, Centurion, and Johannesburg.',
  },
  {
    label: 'Specialization',
    value: 'Tailored solutions for Legal, Engineering, Finance, and NPPs.',
  },
  { label: 'Performance', value: 'Average response time under 60 minutes.' },
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
            <mark className="hx hx-spark !mr-0">Our Philosophy</mark>
          </span>
        </div>

        <p className="mt-4 font-sans text-2xl md:text-3xl leading-relaxed max-w-4xl text-[#0A4F8A] italic">
          At CJN, we believe technology isn&apos;t just a utility. It is the heartbeat of your enterprise. Since 2003,
          we have moved beyond the break-fix mentality. Our approach favors proactive architecture over reactive
          repairs, ensuring your systems remain invisible in their reliability so you can focus on growth.
        </p>

        <div className="mt-16 grid md:grid-cols-2 gap-8 pt-8 border-t border-slate-200">
          {tileItems.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-slate-200/70 bg-white/65 p-6 shadow-sm shadow-slate-200/40 min-h-[180px] flex flex-col"
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

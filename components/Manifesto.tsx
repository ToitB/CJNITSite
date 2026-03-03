'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useSparkHighlights } from './useSparkHighlights';

/** Animated number counter that counts up when visible. */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasRun.current) return;
        hasRun.current = true;

        const duration = 1200;
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          setCount(Math.round(eased * target));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const tileItems = [
  { label: 'Established', value: <><AnimatedCounter target={20} suffix="+" /> years of local industry experience.</> },
  {
    label: 'Presence',
    value: 'Dedicated support across Pretoria, Centurion, and Johannesburg.',
  },
  {
    label: 'Security and Architecture',
    value: 'Multi-layered security and infrastructure solutions for every sector.',
  },
  { label: 'Performance', value: <>Service levels with sub-<AnimatedCounter target={60} />-minute average response times.</> },
];

export const Manifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  useSparkHighlights(sectionRef);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="min-h-[60vh] flex items-center justify-center bg-white/30 px-6 md:px-12 lg:px-24 py-28 md:py-32"
    >
      {/* Gradient divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
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

        <div className="mt-16 grid md:grid-cols-2 gap-8 pt-8">
          <div className="col-span-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-0" />
          {tileItems.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="glass-card morph-card rounded-2xl p-6 min-h-[180px] flex flex-col"
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

'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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

  useEffect(() => {
    let cleanup = () => {};

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      gsap.registerPlugin(ScrollTrigger);

      const root = sectionRef.current;
      if (!root) return;

      const highlights = Array.from(root.querySelectorAll<HTMLElement>('.hx-tech'));
      const sparkHighlights = Array.from(root.querySelectorAll<HTMLElement>('.hx-spark'));
      const ctx = gsap.context(() => {
        highlights.forEach((el, index) => {
          const isHeading = el.classList.contains('hx-heading');

          gsap.set(el, {
            '--after-width': '0%',
            color: isHeading ? '#94a3b8' : '#f2d3b5',
            filter: 'drop-shadow(0px 0px 0px rgba(255,140,0,0))',
            y: 10,
          });

          gsap.timeline({
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: 'bottom 38%',
              scrub: 0.8,
            },
          })
          .to(
            el,
            {
              duration: 1,
              '--after-width': 'var(--after-width-final)',
              color: isHeading ? '#0f172a' : '#C15F00',
              y: 0,
              filter: 'drop-shadow(0px 0px 11px rgba(255,140,0,0.32))',
              ease: 'none',
            },
            0
          )
          .to(
            el,
            {
              duration: 0.55,
              filter: 'drop-shadow(0px 0px 0px rgba(255,140,0,0))',
              ease: 'none',
            },
            0.45
          )
          .to(
            el,
            {
              duration: 0.85,
              '--after-width': '0%',
              ease: 'none',
            },
            0.15 + (index % 3) * 0.06
          );
        });

        const splitToChars = (el: HTMLElement) => {
          if (el.dataset.splitChars === '1') return;
          const text = (el.textContent || '').trim();
          el.textContent = '';
          for (const ch of text) {
            const span = document.createElement('span');
            span.className = 'char';
            span.textContent = ch === ' ' ? '\u00A0' : ch;
            el.appendChild(span);
          }
          el.dataset.splitChars = '1';
        };

        sparkHighlights.forEach((el) => {
          splitToChars(el);
          const chars = Array.from(el.querySelectorAll<HTMLElement>('.char'));

          const animateChars = () => {
            chars.forEach((char) => {
              gsap
                .timeline({
                  defaults: {
                    duration: 0.2,
                    ease: 'power2.inOut',
                  },
                })
                .fromTo(
                  char,
                  {
                    filter: 'brightness(100%) drop-shadow(0px 0px 0px rgba(62,167,255,0))',
                    willChange: 'filter',
                  },
                  {
                    delay: gsap.utils.random(0, 0.9),
                    repeat: 1,
                    yoyo: true,
                    filter: 'brightness(240%) drop-shadow(0px 0px 16px rgba(62,167,255,0.68))',
                  }
                );
            });
          };

          ScrollTrigger.create({
            trigger: el,
            start: 'top bottom',
            onEnter: animateChars,
            onEnterBack: animateChars,
            onLeave: () => gsap.killTweensOf(chars),
            onLeaveBack: () => gsap.killTweensOf(chars),
          });
        });
      }, root);

      cleanup = () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((t) => {
          if (root.contains(t.trigger as Node)) t.kill();
        });
      };
    };

    init();
    return () => cleanup();
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="min-h-[60vh] flex items-center justify-center bg-slate-50/72 px-6 md:px-12 lg:px-24 py-24 border-y border-slate-200"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 flex items-center gap-4">
          <div className="w-12 h-[2px] bg-brand-orange" />
          <span className="font-subheading text-brand-blue text-xs tracking-widest uppercase font-bold">
            Our Philosophy
          </span>
        </div>

        <p className="mt-4 font-sans text-2xl md:text-3xl leading-relaxed max-w-4xl text-[#D08A4E] italic hx-spark">
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
              <div className="font-subheading text-sm md:text-base text-slate-500 uppercase tracking-widest mb-3">
                <mark className="hx hx-spark">{stat.label}</mark>
              </div>
              <div className="font-sans text-xl md:text-2xl text-brand-dark font-semibold leading-snug">{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

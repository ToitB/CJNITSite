import { RefObject, useEffect } from 'react';

const MAX_SPARK_CHARS_PER_BLOCK = 120;
const MAX_ANIMATED_CHARS = 32;
const LOW_POWER_DEVICE_MEMORY_GB = 4;

const isLowPowerDevice = () => {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return typeof nav.deviceMemory === 'number' && nav.deviceMemory <= LOW_POWER_DEVICE_MEMORY_GB;
};

const sampleChars = (chars: HTMLElement[]) => {
  if (chars.length <= MAX_ANIMATED_CHARS) {
    return chars;
  }

  const stride = Math.ceil(chars.length / MAX_ANIMATED_CHARS);
  return chars.filter((_, index) => index % stride === 0);
};

export const useSparkHighlights = (rootRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    let cleanup = () => {};
    let cancelled = false;

    const init = async () => {
      const root = rootRef.current;
      if (!root) return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const splitToChars = (el: HTMLElement) => {
        if (el.dataset.splitChars === '1') return true;
        if (el.dataset.splitChars === 'skip') return false;

        const text = (el.textContent || '').trim();
        if (!text) return false;

        if (text.length > MAX_SPARK_CHARS_PER_BLOCK) {
          el.dataset.splitChars = 'skip';
          return false;
        }

        const words = text.split(/\s+/).filter(Boolean);
        el.textContent = '';

        words.forEach((word, wordIndex) => {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'spark-word';

          for (const ch of word) {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.textContent = ch;
            wordSpan.appendChild(charSpan);
          }

          el.appendChild(wordSpan);
          if (wordIndex < words.length - 1) {
            el.appendChild(document.createTextNode(' '));
          }
        });

        el.dataset.splitChars = '1';
        return true;
      };

      const sparkHighlights = Array.from(root.querySelectorAll<HTMLElement>('.hx-spark'));
      const ctx = gsap.context(() => {
        sparkHighlights.forEach((el) => {
          if (!splitToChars(el)) return;
          const chars = Array.from(el.querySelectorAll<HTMLElement>('.char'));
          if (!chars.length) return;
          const activeChars = sampleChars(chars);

          const animateChars = () => {
            activeChars.forEach((char) => {
              gsap
                .timeline({
                  defaults: {
                    duration: 0.16,
                    ease: 'power2.inOut',
                  },
                })
                .fromTo(
                  char,
                  {
                    filter: 'brightness(100%) drop-shadow(0px 0px 0px rgba(0,174,239,0))',
                    willChange: 'filter',
                  },
                  {
                    delay: gsap.utils.random(0, 0.9),
                    repeat: 1,
                    yoyo: true,
                    filter: 'brightness(165%) drop-shadow(0px 0px 10px rgba(0,174,239,0.62))',
                  }
                );
            });
          };

          ScrollTrigger.create({
            trigger: el,
            start: 'top 92%',
            onEnter: animateChars,
            onEnterBack: animateChars,
            onLeave: () => gsap.killTweensOf(chars),
            onLeaveBack: () => gsap.killTweensOf(chars),
          });
        });
      }, root);

      cleanup = () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach((trigger) => {
          if (root.contains(trigger.trigger as Node)) trigger.kill();
        });
      };
    };

    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isLowPowerDevice()) return;

    const initTimer = window.setTimeout(() => {
      void init();
    }, 140);

    return () => {
      cancelled = true;
      window.clearTimeout(initTimer);
      cleanup();
    };
  }, [rootRef]);
};

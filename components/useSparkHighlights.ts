import { RefObject, useEffect } from 'react';

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
        if (el.dataset.splitChars === '1') return;

        const text = (el.textContent || '').trim();
        if (!text) return;

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
      };

      const sparkHighlights = Array.from(root.querySelectorAll<HTMLElement>('.hx-spark'));
      const ctx = gsap.context(() => {
        sparkHighlights.forEach((el) => {
          splitToChars(el);
          const chars = Array.from(el.querySelectorAll<HTMLElement>('.char'));
          if (!chars.length) return;

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
                    filter: 'brightness(100%) drop-shadow(0px 0px 0px rgba(0,174,239,0))',
                    willChange: 'filter',
                  },
                  {
                    delay: gsap.utils.random(0, 0.9),
                    repeat: 1,
                    yoyo: true,
                    filter: 'brightness(175%) drop-shadow(0px 0px 14px rgba(0,174,239,0.72))',
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
        ScrollTrigger.getAll().forEach((trigger) => {
          if (root.contains(trigger.trigger as Node)) trigger.kill();
        });
      };
    };

    init();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [rootRef]);
};

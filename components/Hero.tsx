import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { useSparkHighlights } from './useSparkHighlights';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  useSparkHighlights(containerRef);

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const teamsFallbackUrl = process.env.NEXT_PUBLIC_TEAMS_CHAT_FALLBACK_URL?.trim() ?? '';

  const onChatClick = async () => {
    const sdk = (window as Window & {
      Microsoft?: {
        Omnichannel?: {
          LiveChatWidget?: {
            SDK?: {
              startChat?: () => void | Promise<void>;
              openChat?: () => void | Promise<void>;
            };
          };
        };
      };
    }).Microsoft?.Omnichannel?.LiveChatWidget?.SDK;

    if (sdk?.startChat) {
      await sdk.startChat();
      return;
    }

    if (sdk?.openChat) {
      await sdk.openChat();
      return;
    }

    if (teamsFallbackUrl) {
      window.open(teamsFallbackUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  
  return (
    <section ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-24 md:pt-32 md:pb-28 relative overflow-hidden bg-white/34">

      <motion.div 
        style={{ y }}
        className="relative z-10 text-center px-6 max-w-7xl mx-auto"
      >
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
        >
            <span className="section-kicker inline-block py-1.5 px-4 rounded-full bg-slate-100 border border-slate-200 mb-6 shadow-sm">
              <mark className="hx hx-spark !mr-0">Enterprise-Grade IT for Small Businesses</mark>
            </span>
        </motion.div>

        <motion.h1 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.94] font-black tracking-tight text-brand-dark mb-8 max-w-6xl mx-auto"
        >
            Managed IT Services &amp;
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">Cyber Security for South African</span>
            <br />
            Businesses.
        </motion.h1>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col items-center gap-6"
        >
            <p className="font-sans text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Stop losing time to unpredictable tech issues. We engineer, manage, and secure your IT
                infrastructure with fixed-cost support, ensuring your systems stay online, hardened against
                attacks, and fully optimized.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
                <motion.a 
                    href="#services"
                    className="cursor-hover btn-primary"
                >
                    Book an IT Assessment
                </motion.a>

                <motion.a
                    href="http://898.tv/cjnit"
                    target="_blank"
                    rel="noreferrer"
                    className="cursor-hover btn-accent"
                >
                    Get Support Now
                </motion.a>

                <motion.a
                    href="#contact"
                    className="cursor-hover btn-primary"
                >
                    Get In Touch
                </motion.a>

                <motion.button
                    type="button"
                    onClick={onChatClick}
                    className="cursor-hover btn-primary inline-flex items-center gap-2"
                >
                    <MessageCircle className="w-4 h-4" />
                    Chat with us
                </motion.button>
            </div>
        </motion.div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-brand-blue/50"
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

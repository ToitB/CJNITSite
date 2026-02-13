import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  
  return (
    <section ref={containerRef} className="min-h-screen w-full flex flex-col items-center justify-center pt-28 pb-24 md:pt-32 md:pb-28 relative overflow-hidden bg-white/78">
      
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-brand-cyan/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-blue/20 rounded-full blur-[100px]" />
      </div>

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
            <span className="inline-block py-1 px-3 rounded-full bg-slate-100 border border-slate-200 text-brand-blue text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
              Smart IT for South Africa
            </span>
        </motion.div>

        <motion.h1 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.94] font-black tracking-tight text-brand-dark mb-8 max-w-6xl mx-auto"
        >
            Elevating the Pulse of
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-cyan">
              South African Business
            </span>
            <br />
            through Smart IT.
        </motion.h1>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col items-center gap-6"
        >
            <p className="font-sans text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                We engineer resilient IT infrastructures for the nation&apos;s most demanding sectors.
                Experience the power of fixed-cost certainty and systems designed to never skip a beat.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5">
                <motion.a 
                    href="#services"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-hover btn-primary"
                >
                    Explore Capabilities
                </motion.a>

                <motion.a
                    href="http://898.tv/cjnit"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-hover btn-accent"
                >
                    Get Support Now
                </motion.a>

                <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-hover btn-primary"
                >
                    Get In Touch
                </motion.a>
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

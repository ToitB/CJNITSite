import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.5"]
  });

  const text = "More than just an IT company. We are your growth partner.";
  const words = text.split(" ");

  return (
    <div className="py-24 bg-slate-950 relative" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <span className="font-subheading text-cyan-500 font-semibold tracking-wider text-sm uppercase mb-4 block">Who We Are</span>
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight flex flex-wrap gap-x-4 gap-y-2">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = start + (1 / words.length);
              const opacity = useTransform(scrollYProgress, [start, end], [0.1, 1]);
              
              return (
                <motion.span key={i} style={{ opacity }} className="text-white">
                  {word}
                </motion.span>
              );
            })}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 text-slate-400 text-lg leading-relaxed">
            <motion.p
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              CJN IT Solutions is a leading IT company specializing in comprehensive and reliable IT services tailored for SMEs. With expertise in fixed-cost contractual support, same-day resolution, and cloud-based services, we drive business growth through technology.
            </motion.p>
            <motion.p
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Our vision is to empower small and medium businesses by making cutting-edge technology—previously accessible only to corporate entities—affordable and available to you. We pride ourselves on striving for excellence in all aspects of your IT environment.
            </motion.p>
        </div>
      </div>
    </div>
  );
};

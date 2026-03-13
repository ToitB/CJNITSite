import React from 'react';
import { motion } from 'framer-motion';

const partners = [
  "Microsoft", "Trend Micro", "Acronis", "Lenovo", "Check Point", "HP", "Dell", "UniFi"
];

export const Partners: React.FC = () => {
  return (
    <div className="py-20 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="font-subheading text-slate-400 font-medium text-sm tracking-widest uppercase mb-10">Trusted By Technology Leaders</h3>
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70">
           {partners.map((partner, index) => (
             <motion.div
                key={partner}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 + index * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="text-xl md:text-2xl font-bold text-slate-600 hover:text-slate-300 transition-colors cursor-default"
             >
                {partner}
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

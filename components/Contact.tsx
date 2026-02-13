import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';
import AnimatedGlobe from './AnimatedGlobe';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="min-h-screen bg-white/82 relative flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 lg:px-24 border-t border-slate-200">
      
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
            
            {/* Info Column */}
            <div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="font-display text-6xl md:text-7xl font-bold tracking-tighter mb-8 text-brand-dark"
                >
                    Ready to Modernize<br/>
                    <span className="text-brand-blue">Your Infrastructure?</span>
                </motion.h2>
                
                <p className="text-lg text-slate-600 mb-12 max-w-md">
                    Our engineering team is ready to analyze your current environment, plan your evolution,
                    and execute with precision. Let&apos;s build a system that works as hard as you do.
                </p>

                <div className="space-y-10">
                    <div className="flex gap-6 items-start group">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                            <MapPin size={20} />
                        </div>
                        <div>
                            <h4 className="font-subheading font-bold text-brand-dark text-lg mb-1">Visit HQ</h4>
                            <p className="text-slate-500 leading-relaxed">
                                Office 3, Building 5, Glen Manor Office Park<br/>
                                138 Frikkie De Beer St, Pretoria, 0084
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex gap-6 items-start group">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                            <Mail size={20} />
                        </div>
                        <div>
                            <h4 className="font-subheading font-bold text-brand-dark text-lg mb-1">Email Us</h4>
                            <a href="mailto:sales@cjn.co.za" className="text-slate-500 hover:text-brand-orange transition-colors">sales@cjn.co.za</a>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start group">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                            <Phone size={20} />
                        </div>
                        <div>
                            <h4 className="font-subheading font-bold text-brand-dark text-lg mb-1">Call Us</h4>
                            <a href="tel:0878093516" className="text-slate-500 hover:text-brand-orange transition-colors">087 809 3516</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Column */}
            <div className="glass-card-strong rounded-[2rem] p-8 md:p-12">
                <form className="space-y-8">
                    <div className="space-y-2">
                        <label className="font-subheading text-xs uppercase tracking-widest text-slate-400 font-bold">Name</label>
                        <input type="text" className="cursor-hover w-full bg-white border border-slate-200 rounded-lg px-4 py-4 text-brand-dark font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" placeholder="Enter your name" />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="font-subheading text-xs uppercase tracking-widest text-slate-400 font-bold">Email</label>
                        <input type="email" className="cursor-hover w-full bg-white border border-slate-200 rounded-lg px-4 py-4 text-brand-dark font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all" placeholder="your@email.com" />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="font-subheading text-xs uppercase tracking-widest text-slate-400 font-bold">Message</label>
                        <textarea rows={4} className="cursor-hover w-full bg-white border border-slate-200 rounded-lg px-4 py-4 text-brand-dark font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all resize-none" placeholder="Tell us about your IT needs..." />
                    </div>

                    <button className="cursor-hover w-full btn-accent font-display text-lg py-5 rounded-xl">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Start the Conversation <ArrowUpRight className="w-5 h-5" />
                        </span>
                    </button>
                </form>
            </div>
        </div>
      </div>

      <div className="relative z-10 mt-20 flex justify-center">
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[92%] h-7 w-56 -translate-x-1/2 rounded-[999px] bg-slate-700/28 blur-[10px]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[90%] h-5 w-44 -translate-x-1/2 rounded-[999px] bg-sky-500/16 blur-[8px]"
          />
          <AnimatedGlobe size={200} className="relative z-10 scale-90 md:scale-100" />
        </div>
      </div>

      <div className="relative z-10 mt-24 pt-8 border-t border-slate-200 flex justify-center md:justify-end items-center text-slate-400">
        <div className="flex gap-8">
          <a href="/privacy" className="cursor-hover font-subheading text-xs uppercase tracking-widest hover:text-brand-blue">Privacy</a>
          <a href="/terms" className="cursor-hover font-subheading text-xs uppercase tracking-widest hover:text-brand-blue">Terms</a>
        </div>
      </div>

    </section>
  );
};

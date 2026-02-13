import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Mail, Phone, Linkedin, Clock3 } from 'lucide-react';
import AnimatedGlobe from './AnimatedGlobe';

const XLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M18.244 2H21l-6.55 7.49L22.5 22h-6.3l-4.94-6.45L5.6 22H2.84l7-8L1.5 2h6.46l4.47 5.9L18.24 2Zm-1.1 18h1.74L6.4 3.9H4.53L17.14 20Z" />
  </svg>
);

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

                    <div className="flex gap-6 items-start group">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </div>
                        <div>
                            <h4 className="font-subheading font-bold text-brand-dark text-lg mb-1">LinkedIn</h4>
                            <a
                              href="https://www.linkedin.com/company/cjnitsolutions"
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-500 hover:text-brand-orange transition-colors"
                            >
                              linkedin.com/company/cjnitsolutions
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start group">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                            <XLogo className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-subheading font-bold text-brand-dark text-lg mb-1">X.com</h4>
                            <a
                              href="https://x.com/cjnit"
                              target="_blank"
                              rel="noreferrer"
                              className="text-slate-500 hover:text-brand-orange transition-colors"
                            >
                              x.com/cjnit
                            </a>
                        </div>
                    </div>

                    <div className="flex gap-6 items-start group">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-brand-blue shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                            <Clock3 size={20} />
                        </div>
                        <div>
                            <h4 className="font-subheading font-bold text-brand-dark text-lg mb-1">Working hours</h4>
                            <p className="text-slate-500 leading-relaxed">
                              Mondays - Fridays: 08:00 - 17:00
                              <br />
                              Weekends / Public Holidays: Closed
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Column */}
            <div className="glass-card-strong rounded-[2rem] p-7 md:p-9">
                <form className="space-y-6">
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
                        <textarea rows={3} className="cursor-hover w-full bg-white border border-slate-200 rounded-lg px-4 py-4 text-brand-dark font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all resize-none" placeholder="Tell us about your IT needs..." />
                    </div>

                    <button className="cursor-hover w-full btn-accent font-display text-lg py-5 rounded-xl">
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Start the Conversation <ArrowUpRight className="w-5 h-5" />
                        </span>
                    </button>
                </form>

                <div className="mt-10">
                    <div className="mb-3 font-subheading text-xs uppercase tracking-widest text-slate-500 font-bold">Find Us</div>
                    <div className="relative w-full max-w-[430px] aspect-square overflow-hidden rounded-2xl border border-slate-200/75 shadow-sm shadow-slate-300/35 bg-white/40 mx-auto lg:mx-0">
                        <iframe
                          title="CJN IT Solutions Location"
                          src="https://www.google.com/maps?q=Office+3,+Building+5,+Glen+Manor+Office+Park,+Pretoria,+0084&output=embed"
                          className="h-full w-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          style={{ filter: 'saturate(0.42) hue-rotate(168deg) brightness(1.03) contrast(0.92)' }}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-100/16 via-transparent to-blue-100/26" />
                    </div>
                </div>
            </div>
        </div>
      </div>

      <div className="relative z-10 mt-20 flex justify-center">
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[104%] h-5 w-40 -translate-x-1/2 rounded-[999px] bg-slate-700/26 blur-[9px]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[102%] h-3 w-30 -translate-x-1/2 rounded-[999px] bg-sky-500/14 blur-[7px]"
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

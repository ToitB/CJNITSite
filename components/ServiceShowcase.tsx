import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Cloud, Shield, Wrench, Server, HardDrive, ChevronUp, ChevronDown } from 'lucide-react';
import { useSparkHighlights } from './useSparkHighlights';

const services = [
  {
    id: "01",
    title: "Fully Managed IT Support",
    description: "The Backbone of Your Operations. Eliminate unpredictable IT costs. We provide comprehensive, fixed-rate managed services that act as your dedicated off-site IT department. From rapid helpdesk support to routine system patching, we ensure your team stays productive without the overhead of internal IT staff.",
    icon: Server,
    color: "#03318C", 
    image: "https://images.pexels.com/photos/17489163/pexels-photo-17489163.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1400"
  },
  {
    id: "05",
    title: "Business Continuity & Backup",
    description: "Data Resilience You Can Trust. Your data is your most valuable asset. We offer hybrid backup solutions integrating local and cloud-based redundancy using enterprise-grade software like Acronis. Whether you're a boutique firm or a large-scale enterprise, our recovery protocols ensure your business stays online, no matter what.",
    icon: HardDrive,
    color: "#445373",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=1400&q=72"
  },
  {
    id: "02",
    title: "Cyber Security & Defense",
    description: "Hardening Your Digital Perimeter. In an era of evolving threats, we deploy multi-layered defense strategies. Leveraging industry-leading platforms like Trend Micro (Worry-Free & XDR) and Microsoft Defender, we provide centrally managed protection that anticipates and neutralizes vulnerabilities before they impact your business.",
    icon: Shield,
    color: "#165FF2", 
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=72"
  },
  {
    id: "03",
    title: "Cloud Ecosystems",
    description: "Seamless Transitions to a Modern Workspace. Scale with confidence. We specialize in migrating legacy systems to high-performance cloud environments, including Microsoft 365, SharePoint, Teams, and Exchange Online. From initial planning to post-migration support, we help you leverage the world’s most robust cloud infrastructure.",
    icon: Cloud,
    color: "#F29216", 
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=72"
  },
  {
    id: "04",
    title: "Strategic Hardware Procurement",
    description: "Optimized Assets for Peak Performance. Hardware should not be an afterthought. We facilitate the strategic sourcing of high-performance laptops, servers, and networking equipment. By partnering with South Africa's premier importers, we deliver enterprise-grade hardware tailored to your technical requirements and budget.",
    icon: Wrench,
    color: "#022873", 
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=72"
  }
];

const Card: React.FC<{ 
  item: typeof services[0]; 
  index: number; 
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}> = ({ item, index, progress, range, targetScale }) => {
  
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const scale = useTransform(progress, range, [1, targetScale]);
  
  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0 px-6">
      <motion.div 
        style={{ scale, top: `calc(-5% + ${index * 25}px)` }}
        className="relative flex flex-col md:flex-row w-full max-w-6xl h-[65vh] rounded-3xl overflow-hidden glass-card-strong origin-top"
      >
        {/* Content Side */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative z-10 bg-white/42 backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg" style={{ backgroundColor: item.color }}>
                <item.icon className="w-8 h-8" />
            </div>
            
            <div className="font-subheading text-xs uppercase tracking-widest text-slate-600 mb-4">Capability {item.id}</div>
            <h3 className="font-display text-3xl md:text-4xl font-bold mb-6 leading-tight text-brand-dark">
                {item.title}
            </h3>
            <p className="font-sans text-base md:text-lg text-slate-600 leading-relaxed">
                {item.description}
            </p>
        </div>

        {/* Image Side */}
        <div className="flex-1 relative overflow-hidden h-full bg-slate-100">
            <img 
                src={item.image} 
                alt={item.title} 
                loading="lazy"
                decoding="async"
                fetchPriority="low"
                width={700}
                height={500}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/40 to-transparent mix-blend-multiply" />
        </div>
      </motion.div>
    </div>
  );
};

export const ServiceShowcase: React.FC = () => {
  const container = useRef<HTMLElement>(null);
  const [showQuickNav, setShowQuickNav] = useState(false);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });
  useSparkHighlights(container);

  useEffect(() => {
    const section = container.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowQuickNav(entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: 'services' | 'contact') => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="services" ref={container} className="relative bg-white/28 pt-28 md:pt-32 pb-24">
        {/* Gradient divider top */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
        {showQuickNav && (
          <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('services')}
              aria-label="Scroll to start of core capabilities"
              className="glass-dock-item group cursor-hover inline-flex h-11 w-11 items-center justify-center text-slate-700 hover:text-brand-blue transition-colors"
            >
              <ChevronUp className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              aria-label="Skip core capabilities and go to contact section"
              className="glass-dock-item group cursor-hover inline-flex h-11 w-11 items-center justify-center text-slate-700 hover:text-brand-blue transition-colors"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-6 mb-24 text-center md:text-left">
            <span className="section-kicker inline-block mb-4">
                <mark className="hx hx-spark !mr-0">Core Services</mark>
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-brand-dark">
                Tailored for the<br/>
                <span className="text-brand-blue">South African Small Business</span>
            </h2>
        </div>

      {services.map((service, i) => {
        const targetScale = 1 - ( (services.length - i) * 0.05);
        return (
          <Card 
            key={i} 
            item={service} 
            index={i} 
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </section>
  );
};

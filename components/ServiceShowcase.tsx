import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { Cloud, Shield, Wrench, Server, HardDrive } from 'lucide-react';
import { useSparkHighlights } from './useSparkHighlights';

const services = [
  {
    id: "01",
    title: "Managed Infrastructure",
    description: "The Backbone of Your Operations. Eliminate the unpredictability of IT maintenance. We provide structured, Managed IT Services under a fixed-cost contractual framework. By implementing a fast-response resolution environment, we ensure maximum uptime and a stable digital landscape for your team.",
    icon: Server,
    color: "#005596", 
    image: "https://images.pexels.com/photos/17489163/pexels-photo-17489163.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=2000"
  },
  {
    id: "05",
    title: "Business Continuity & Backup",
    description: "Data Resilience You Can Trust. Your data is your most valuable asset. We offer hybrid backup solutions integrating local and cloud-based redundancy using enterprise-grade software like Acronis. Whether you're a boutique firm or a large-scale enterprise, our recovery protocols ensure your business stays online, no matter what.",
    icon: HardDrive,
    color: "#166534",
    image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: "02",
    title: "Cyber Security & Defense",
    description: "Hardening Your Digital Perimeter. In an era of evolving threats, we deploy multi-layered defense strategies. Leveraging industry-leading platforms like Trend Micro (Worry-Free & XDR) and Microsoft Defender, we provide centrally managed protection that anticipates and neutralizes vulnerabilities before they impact your business.",
    icon: Shield,
    color: "#00AEEF", 
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: "03",
    title: "Cloud Ecosystems",
    description: "Seamless Transitions to a Modern Workspace. Scale with confidence. We specialize in migrating legacy systems to high-performance cloud environments, including Microsoft 365, SharePoint, Teams, and Exchange Online. From initial planning to post-migration support, we help you leverage the world’s most robust cloud infrastructure.",
    icon: Cloud,
    color: "#ffaa40", 
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
  },
  {
    id: "04",
    title: "Strategic Hardware Procurement",
    description: "Optimized Assets for Peak Performance. Hardware should not be an afterthought. We facilitate the strategic sourcing of high-performance laptops, servers, and networking equipment. By partnering with South Africa's premier importers, we deliver enterprise-grade hardware tailored to your technical requirements and budget.",
    icon: Wrench,
    color: "#020617", 
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
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
        className="relative flex flex-col md:flex-row w-full max-w-6xl h-[65vh] rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-2xl origin-top"
      >
        {/* Content Side */}
        <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative z-10 bg-white">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 text-white shadow-lg" style={{ backgroundColor: item.color }}>
                <item.icon className="w-8 h-8" />
            </div>
            
            <div className="font-subheading text-xs uppercase tracking-widest text-slate-400 mb-4">Capability {item.id}</div>
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
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  });
  useSparkHighlights(container);

  return (
    <section id="services" ref={container} className="relative bg-slate-50/72 pt-24 pb-24 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 mb-24 text-center md:text-left">
            <span className="section-kicker inline-block mb-4">
                <mark className="hx hx-spark !mr-0">Core Capabilities</mark>
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-brand-dark">
                Engineered for the<br/>
                <span className="text-brand-blue">South African Enterprise</span>
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

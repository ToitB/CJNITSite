import React, { useState, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Shield, Cloud, Server, Headphones, Wrench, HardDrive, ArrowRight, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: Headphones,
    title: "Managed IT Support",
    subtitle: "Your outsourced IT department.",
    description: "Experience peace of mind with our fixed-cost managed support. We handle everything from day-to-day helpdesk tickets to strategic infrastructure planning.",
    benefits: ["Unlimited Remote Support", "On-site Technician Visits", "Proactive Monitoring", "Vendor Management"],
    gradient: "from-blue-500 to-indigo-600"
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    subtitle: "Seamless Microsoft 365 integration.",
    description: "Migrate to the cloud with confidence. We specialize in Microsoft 365 ecosystems, ensuring your data is accessible, secure, and synchronized across all devices.",
    benefits: ["M365 Migration & Setup", "SharePoint Architecture", "Teams Voice Integration", "Cloud Backup"],
    gradient: "from-cyan-400 to-blue-500"
  },
  {
    icon: Shield,
    title: "Cyber Security",
    subtitle: "Enterprise-grade defense.",
    description: "Protect your business from evolving digital threats. We deploy multi-layered security protocols including next-gen firewalls and AI-driven endpoint protection.",
    benefits: ["Ransomware Protection", "Email Security Gateway", "Security Audits", "Employee Training"],
    gradient: "from-violet-500 to-purple-600"
  },
  {
    icon: Server,
    title: "Infrastructure",
    subtitle: "Physical and virtual server management.",
    description: "Whether on-premise or hybrid, we design and maintain robust server environments that ensure maximum uptime and performance for your critical applications.",
    benefits: ["Windows Server Config", "Virtualization (Hyper-V)", "Network Cabling", "WiFi Solutions"],
    gradient: "from-slate-400 to-slate-600"
  },
  {
    icon: Wrench,
    title: "Hardware Sales",
    subtitle: "Procurement made simple.",
    description: "Get the right tools for the job. We supply, install, and configure high-quality hardware from leading vendors like Dell, HP, and Lenovo.",
    benefits: ["Competitive Pricing", "Full Setup & Data Transfer", "Warranty Management", "Asset Tracking"],
    gradient: "from-emerald-400 to-teal-500"
  },
  {
    icon: HardDrive,
    title: "Data Continuity",
    subtitle: "Backup and Disaster Recovery.",
    description: "Data loss is not an option. Our comprehensive backup solutions ensure your business can recover quickly from hardware failure or cyber attacks.",
    benefits: ["Cloud & Local Backups", "Disaster Recovery Planning", "Regular Restore Testing", "Business Continuity"],
    gradient: "from-rose-500 to-red-600"
  }
];

const ServiceCard: React.FC<{ service: typeof services[0], index: number }> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Tilt Effect Variables
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const rotateX = useMotionTemplate`${mouseYSpring.get() * -20}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring.get() * 20}deg`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className="relative group h-[400px] w-full perspective-1000"
    >
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 group-hover:border-slate-600">
        
        {/* Dynamic Gradient Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Content Container */}
        <div className="absolute inset-0 p-8 flex flex-col h-full z-10">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
             <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
               <service.icon className="text-white w-7 h-7" />
             </div>
             <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
               <ArrowRight className="text-slate-400" />
             </div>
          </div>

          <h3 className="font-subheading text-2xl font-bold text-white mb-1 group-hover:translate-x-1 transition-transform duration-300">
            {service.title}
          </h3>
          <p className="font-subheading text-sm font-medium text-cyan-500 mb-4 group-hover:translate-x-1 transition-transform duration-300 delay-75">
            {service.subtitle}
          </p>

          {/* Expanded Content (Visible on Hover/Interaction) */}
          <div className="flex-grow flex flex-col justify-end">
            <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
              {service.description}
            </p>

            <motion.div 
              className="space-y-2 overflow-hidden"
              animate={{ height: isHovered ? "auto" : 0, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="h-px w-full bg-slate-800 mb-4" />
              {service.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                  <CheckCircle2 size={14} className="text-cyan-500" />
                  <span>{benefit}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  return (
    <div className="py-32 bg-slate-950 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-subheading inline-block py-1 px-3 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-4">
              Our Capabilities
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Full-Spectrum <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">IT Mastery</span>
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              We don't just solve problems; we engineer solutions. Interact with our service modules below to discover how we can elevate your business infrastructure.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-2000">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

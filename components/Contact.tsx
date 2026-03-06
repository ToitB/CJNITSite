import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, MapPin, Mail, Phone, Linkedin, Clock3, MessageCircle } from 'lucide-react';
import AnimatedGlobe from './AnimatedGlobe';

const XLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M18.244 2H21l-6.55 7.49L22.5 22h-6.3l-4.94-6.45L5.6 22H2.84l7-8L1.5 2h6.46l4.47 5.9L18.24 2Zm-1.1 18h1.74L6.4 3.9H4.53L17.14 20Z" />
  </svg>
);

type TeamsLiveChatSDK = {
  startChat?: () => void | Promise<void>;
  openChat?: () => void | Promise<void>;
};

declare global {
  interface Window {
    Microsoft?: {
      Omnichannel?: {
        LiveChatWidget?: {
          SDK?: TeamsLiveChatSDK;
        };
      };
    };
  }
}

const CONTACT_API_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim() ?? '';
const TEAMS_SCRIPT_URL = process.env.NEXT_PUBLIC_TEAMS_LIVE_CHAT_SCRIPT_URL?.trim() ?? '';
const TEAMS_APP_ID = process.env.NEXT_PUBLIC_TEAMS_LIVE_CHAT_APP_ID?.trim() ?? '';
const TEAMS_ORG_ID = process.env.NEXT_PUBLIC_TEAMS_LIVE_CHAT_ORG_ID?.trim() ?? '';
const TEAMS_ORG_URL = process.env.NEXT_PUBLIC_TEAMS_LIVE_CHAT_ORG_URL?.trim() ?? '';
const TEAMS_FALLBACK_URL = process.env.NEXT_PUBLIC_TEAMS_CHAT_FALLBACK_URL?.trim() ?? '';

type ContactApiResponse = {
  submissionId?: string;
  queued?: boolean;
  message?: string;
};

const createSubmissionId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return `cjn-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
};

const parseContactApiResponse = (body: string): ContactApiResponse => {
  if (!body) return {};

  try {
    const parsed = JSON.parse(body) as Partial<Record<'submissionId' | 'queued' | 'message', unknown>>;
    const response: ContactApiResponse = {};

    if (typeof parsed.submissionId === 'string' && parsed.submissionId.trim()) {
      response.submissionId = parsed.submissionId.trim();
    }

    if (typeof parsed.queued === 'boolean') {
      response.queued = parsed.queued;
    }

    if (typeof parsed.message === 'string' && parsed.message.trim()) {
      response.message = parsed.message.trim();
    }

    return response;
  } catch {
    return {};
  }
};

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);
  const [submitReference, setSubmitReference] = useState<string | null>(null);
  const [chatFeedback, setChatFeedback] = useState<string | null>(null);

  const canLoadTeamsWidget = Boolean(
    TEAMS_SCRIPT_URL && TEAMS_APP_ID && TEAMS_ORG_ID && TEAMS_ORG_URL
  );

  useEffect(() => {
    if (!canLoadTeamsWidget) return;

    const existingScript = document.getElementById('Microsoft_Omnichannel_LCWidget');
    if (existingScript) return;

    const script = document.createElement('script');
    script.id = 'Microsoft_Omnichannel_LCWidget';
    script.src = TEAMS_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.setAttribute('data-app-id', TEAMS_APP_ID);
    script.setAttribute('data-org-id', TEAMS_ORG_ID);
    script.setAttribute('data-org-url', TEAMS_ORG_URL);
    script.setAttribute('data-hide-chat-button', 'true');
    document.body.appendChild(script);
  }, [canLoadTeamsWidget]);

  const onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitFeedback(null);
    setSubmitReference(null);

    if (!CONTACT_API_URL) {
      setSubmitState('error');
      setSubmitFeedback('Contact service is not configured yet. Please email sales@cjn.co.za.');
      return;
    }

    const clientSubmissionId = createSubmissionId();
    setSubmitState('sending');

    const abortController = new AbortController();
    const requestTimeout = window.setTimeout(() => abortController.abort(), 15000);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
        submissionId: clientSubmissionId,
        source: 'cjn-website-contact-form',
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch(CONTACT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-Submission-Id': clientSubmissionId,
        },
        signal: abortController.signal,
        body: JSON.stringify(payload),
      });
      window.clearTimeout(requestTimeout);

      const responseBody = await response.text();
      const parsedResponse = parseContactApiResponse(responseBody);
      const responseSubmissionId = parsedResponse.submissionId ?? clientSubmissionId;
      setSubmitReference(responseSubmissionId);

      if (!response.ok) {
        throw new Error(parsedResponse.message || 'Failed to send message.');
      }

      const deliveryFeedback = parsedResponse.queued
        ? 'Message received and queued for delivery.'
        : 'Message sent successfully.';

      setSubmitState('success');
      setSubmitFeedback(`${deliveryFeedback} We will contact you shortly.`);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      window.clearTimeout(requestTimeout);
      setSubmitReference(clientSubmissionId);
      setSubmitState('error');
      const isTimeout = error instanceof DOMException && error.name === 'AbortError';
      const failureReason = isTimeout
        ? 'Message timed out before delivery confirmation.'
        : 'Message failed to send.';
      setSubmitFeedback(`${failureReason} Please try again or email sales@cjn.co.za.`);
    }
  };

  const onChatClick = async () => {
    setChatFeedback(null);

    const sdk = window.Microsoft?.Omnichannel?.LiveChatWidget?.SDK;
    if (sdk?.startChat) {
      await sdk.startChat();
      return;
    }

    if (sdk?.openChat) {
      await sdk.openChat();
      return;
    }

    if (TEAMS_FALLBACK_URL) {
      window.open(TEAMS_FALLBACK_URL, '_blank', 'noopener,noreferrer');
      return;
    }

    setChatFeedback('Chat is not configured yet. Please contact us by email in the meantime.');
  };

  return (
    <section id="contact" className="min-h-screen bg-white/36 relative flex flex-col justify-between pt-28 md:pt-32 pb-12 px-6 md:px-12 lg:px-24">
      {/* Gradient divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-300/60 to-transparent" />
      
      <div className="relative z-10 max-w-7xl w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
            
            {/* Info Column */}
            <div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-6xl md:text-7xl font-bold tracking-tighter mb-8 text-brand-dark"
                >
                    Ready to Modernize<br/>
                    <span className="text-brand-blue">Your Infrastructure?</span>
                </motion.h2>
                
                <p className="text-lg text-slate-600 mb-12 max-w-md">
                    Our capable team is ready to analyze your current environment, plan your evolution, and execute a
                    modernisation plan with precision. Let&apos;s build a system that works as hard as you do.
                </p>

                <div className="space-y-10">
                    {[
                      { icon: <MapPin size={20} />, title: 'Visit HQ', content: <p className="text-slate-700 leading-relaxed">Office 3, Building 5, Glen Manor Office Park<br/>138 Frikkie De Beer St, Pretoria, 0084</p> },
                      { icon: <Mail size={20} />, title: 'Email Us', content: <a href="mailto:sales@cjn.co.za" className="text-slate-700 hover:text-brand-orange transition-colors">sales@cjn.co.za</a> },
                      { icon: <Phone size={20} />, title: 'Call Us', content: <a href="tel:0878093516" className="text-slate-700 hover:text-brand-orange transition-colors">087 809 3516</a> },
                      { icon: <Linkedin size={20} />, title: 'LinkedIn', content: <a href="https://www.linkedin.com/company/cjnitsolutions" target="_blank" rel="noreferrer" className="text-slate-700 hover:text-brand-orange transition-colors">linkedin.com/company/cjnitsolutions</a> },
                      { icon: <XLogo className="w-5 h-5" />, title: 'X.com', content: <a href="https://x.com/cjnit" target="_blank" rel="noreferrer" className="text-slate-700 hover:text-brand-orange transition-colors">x.com/cjnit</a> },
                      { icon: <Clock3 size={20} />, title: 'Working hours', content: <p className="text-slate-700 leading-relaxed">Mondays - Fridays: 08:00 - 17:00<br />Weekends / Public Holidays: Closed</p> },
                    ].map((item, i) => (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-6 items-start group"
                      >
                        <div className="liquid-surface liquid-surface-primary w-12 h-12 rounded-full flex items-center justify-center text-brand-blue shrink-0 group-hover:text-white group-hover:scale-105 transition-all duration-300">
                            {item.icon}
                        </div>
                        <div>
                            <h3 className="font-subheading font-bold text-brand-dark text-lg mb-1">{item.title}</h3>
                            {item.content}
                        </div>
                      </motion.div>
                    ))}

                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={onChatClick}
                        className="cursor-hover btn-primary inline-flex items-center gap-2 px-5 py-2.5"
                      >
                        <MessageCircle className="h-4 w-4" />
                        Chat with us
                      </button>
                      {chatFeedback && (
                        <p className="mt-2 text-sm text-slate-600 max-w-sm">
                          {chatFeedback}
                        </p>
                      )}
                    </div>
                </div>
            </div>

            {/* Form Column */}
            <div className="glass-card-strong rounded-[2rem] p-7 md:p-9">
                <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="contact-name" className="font-subheading text-xs uppercase tracking-widest text-slate-700 font-bold">Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={onFieldChange}
                          required
                          className="cursor-hover w-full bg-white border border-slate-200 rounded-lg px-4 py-4 text-brand-dark font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:shadow-[0_0_0_4px_rgba(3,49,140,0.08)] transition-all"
                          placeholder="Enter your name"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="contact-email" className="font-subheading text-xs uppercase tracking-widest text-slate-700 font-bold">Email</label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={onFieldChange}
                          required
                          className="cursor-hover w-full bg-white border border-slate-200 rounded-lg px-4 py-4 text-brand-dark font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:shadow-[0_0_0_4px_rgba(3,49,140,0.08)] transition-all"
                          placeholder="your@email.com"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="contact-message" className="font-subheading text-xs uppercase tracking-widest text-slate-700 font-bold">Message</label>
                        <textarea
                          id="contact-message"
                          rows={3}
                          name="message"
                          value={formData.message}
                          onChange={onFieldChange}
                          required
                          className="cursor-hover w-full bg-white border border-slate-200 rounded-lg px-4 py-4 text-brand-dark font-medium focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue focus:shadow-[0_0_0_4px_rgba(3,49,140,0.08)] transition-all resize-none"
                          placeholder="Tell us about your IT needs..."
                        />
                    </div>

                    <button
                      type="submit"
                      disabled={submitState === 'sending'}
                      className="cursor-hover w-full btn-accent font-display text-lg py-5 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {submitState === 'sending' ? 'Sending...' : 'Start the Conversation'} <ArrowUpRight className="w-5 h-5" />
                        </span>
                    </button>
                    {submitFeedback && (
                      <p className={`text-sm ${submitState === 'success' ? 'text-emerald-700' : 'text-rose-600'}`}>
                        {submitFeedback}
                      </p>
                    )}
                    {submitReference && (
                      <p className="text-xs text-slate-600">
                        Reference ID: <span className="font-semibold">{submitReference}</span>
                      </p>
                    )}
                </form>

                <div className="mt-10">
                    <div className="mb-3 font-subheading text-xs uppercase tracking-widest text-slate-700 font-bold">Find Us</div>
                    <div className="glass-card-strong relative w-full aspect-square rounded-2xl mx-auto lg:mx-0">
                        <iframe
                          title="CJN IT Solutions Location"
                          src="https://www.google.com/maps?q=Office+3,+Building+5,+Glen+Manor+Office+Park,+Pretoria,+0084&output=embed"
                          className="h-full w-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          allow=""
                          sandbox="allow-scripts allow-same-origin"
                          style={{ filter: 'saturate(0.55) hue-rotate(168deg) brightness(1.03) contrast(0.92)' }}
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
            className="pointer-events-none absolute left-1/2 top-[102%] h-3 w-32 -translate-x-1/2 rounded-[999px] bg-sky-500/14 blur-[7px]"
          />
          <AnimatedGlobe size={200} className="relative z-10 scale-90 md:scale-100" />
        </div>
      </div>

    </section>
  );
};

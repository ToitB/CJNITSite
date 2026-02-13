'use client';

import { Navbar } from './Navbar';
import { BackgroundCanvas } from './BackgroundCanvas';

export function ResourcesPageContent() {
  return (
    <div className="relative min-h-screen bg-white text-brand-dark selection:bg-brand-orange selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none opacity-70" style={{ filter: 'blur(1.8px)' }}>
        <BackgroundCanvas />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
          <section className="max-w-6xl mx-auto">
            <div className="mb-12">
              <span className="inline-block font-subheading text-brand-orange text-xs tracking-widest uppercase mb-4 font-bold">
                Client Resources
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-brand-dark mb-4">
                Resources Hub
              </h1>
              <p className="font-sans text-lg text-slate-600 max-w-2xl">
                Download core client documents and access our shared resource repository.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <article className="glass-card rounded-2xl p-7">
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-3">
                  IT Self-Assessment Tool
                </h2>
                <p className="font-sans text-slate-600 mb-6">
                  Download the self-assessment workbook to evaluate your current IT posture.
                </p>
                <a
                  href="#"
                  className="btn-primary-compact w-full rounded-xl"
                >
                  Download Tool
                </a>
              </article>

              <article className="glass-card rounded-2xl p-7">
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-3">
                  Client Referral Form
                </h2>
                <p className="font-sans text-slate-600 mb-6">
                  Submit referral details quickly using our standard client referral form.
                </p>
                <a
                  href="#"
                  className="btn-primary-compact w-full rounded-xl"
                >
                  Download Form
                </a>
              </article>

              <article className="glass-card rounded-2xl p-7">
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-3">
                  General Repository
                </h2>
                <p className="font-sans text-slate-600 mb-6">
                  Open the OneDrive resource repository for templates, guides, and shared files.
                </p>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-accent w-full rounded-xl px-6 py-3"
                >
                  Open Repository
                </a>
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

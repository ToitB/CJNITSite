'use client';

import { Navbar } from './Navbar';
import { BackgroundCanvas } from './BackgroundCanvas';

const posts = [
  {
    title: 'How to Build a Resilient SME IT Stack',
    date: 'January 12, 2026',
    excerpt:
      'A practical blueprint for uptime-focused infrastructure, from endpoint control to backup strategy.',
  },
  {
    title: '5 Security Gaps We See in Growing Businesses',
    date: 'December 9, 2025',
    excerpt:
      'Common vulnerabilities and fast remediation steps that reduce risk without major disruption.',
  },
  {
    title: 'Microsoft 365 Migration: What to Plan First',
    date: 'November 3, 2025',
    excerpt:
      'Key planning checkpoints to keep collaboration, mail, and file migration smooth.',
  },
];

export function BlogPageContent() {
  return (
    <div className="relative min-h-screen bg-white text-brand-dark selection:bg-brand-orange selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCanvas />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
          <section className="max-w-6xl mx-auto">
            <div className="mb-12">
              <span className="inline-block font-subheading text-brand-orange text-xs tracking-widest uppercase mb-4 font-bold">
                Insights
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold tracking-tight text-brand-dark mb-4">
                Blog
              </h1>
              <p className="font-sans text-lg text-slate-600 max-w-2xl">
                Practical guidance, updates, and strategic IT insights for South African business leaders.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article key={post.title} className="glass-card rounded-2xl p-7">
                  <p className="font-subheading text-xs tracking-widest uppercase text-slate-500 mb-3">
                    {post.date}
                  </p>
                  <h2 className="font-display text-2xl font-bold text-brand-dark mb-3">
                    {post.title}
                  </h2>
                  <p className="font-sans text-slate-600 mb-6">{post.excerpt}</p>
                  <button className="btn-primary-compact rounded-xl">
                    Read Article
                  </button>
                </article>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

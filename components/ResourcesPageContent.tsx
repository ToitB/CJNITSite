'use client';

import { useEffect, useMemo, useState } from 'react';
import { Navbar } from './Navbar';
import { BackgroundCanvas } from './BackgroundCanvas';

const STATIC_ONEDRIVE_REPOSITORY_URL = process.env.NEXT_PUBLIC_ONEDRIVE_REPOSITORY_URL?.trim() ?? '';
const ONEDRIVE_REPOSITORY_API_URL = process.env.NEXT_PUBLIC_ONEDRIVE_REPOSITORY_API_URL?.trim() ?? '';

const isTrustedRepositoryUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:') return false;

    const host = parsed.hostname.toLowerCase();
    return (
      host === '1drv.ms' ||
      host.endsWith('.1drv.ms') ||
      host === 'onedrive.live.com' ||
      host.endsWith('.onedrive.live.com') ||
      host.endsWith('.sharepoint.com')
    );
  } catch {
    return false;
  }
};

type RepositoryState = 'ready' | 'loading' | 'unavailable';

export function ResourcesPageContent() {
  const fallbackRepositoryUrl = useMemo(() => {
    return isTrustedRepositoryUrl(STATIC_ONEDRIVE_REPOSITORY_URL)
      ? STATIC_ONEDRIVE_REPOSITORY_URL
      : '';
  }, []);

  const [repositoryUrl, setRepositoryUrl] = useState<string>(fallbackRepositoryUrl);
  const [repositoryState, setRepositoryState] = useState<RepositoryState>(
    fallbackRepositoryUrl ? 'ready' : ONEDRIVE_REPOSITORY_API_URL ? 'loading' : 'unavailable'
  );

  useEffect(() => {
    if (!ONEDRIVE_REPOSITORY_API_URL) return;

    let cancelled = false;
    const resolveRepository = async () => {
      setRepositoryState('loading');
      try {
        const response = await fetch(ONEDRIVE_REPOSITORY_API_URL, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) throw new Error('Repository endpoint unavailable');
        const data = (await response.json()) as { url?: unknown };
        const candidate = typeof data.url === 'string' ? data.url.trim() : '';

        if (!isTrustedRepositoryUrl(candidate)) {
          throw new Error('Repository URL is invalid or untrusted');
        }

        if (cancelled) return;
        setRepositoryUrl(candidate);
        setRepositoryState('ready');
      } catch {
        if (cancelled) return;

        if (fallbackRepositoryUrl) {
          setRepositoryUrl(fallbackRepositoryUrl);
          setRepositoryState('ready');
          return;
        }

        setRepositoryState('unavailable');
      }
    };

    void resolveRepository();
    return () => {
      cancelled = true;
    };
  }, [fallbackRepositoryUrl]);

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

              <article className="glass-card-accent rounded-2xl p-7">
                <h2 className="font-display text-2xl font-bold text-brand-dark mb-3">
                  General Repository
                </h2>
                <p className="font-sans text-slate-600 mb-6">
                  Open the OneDrive resource repository for templates, guides, and shared files.
                </p>
                <a
                  href={repositoryUrl || '#'}
                  target={repositoryState === 'ready' ? '_blank' : undefined}
                  rel={repositoryState === 'ready' ? 'noopener noreferrer' : undefined}
                  aria-disabled={repositoryState !== 'ready'}
                  onClick={(event) => {
                    if (repositoryState !== 'ready') event.preventDefault();
                  }}
                  className={`btn-accent w-full rounded-xl px-6 py-3 ${
                    repositoryState !== 'ready' ? 'opacity-60 pointer-events-none' : ''
                  }`}
                >
                  {repositoryState === 'loading' ? 'Loading Repository...' : 'Open Repository'}
                </a>
                {repositoryState === 'unavailable' && (
                  <p className="mt-3 text-xs text-slate-500">
                    Repository link is not configured yet. Please contact support for access.
                  </p>
                )}
              </article>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

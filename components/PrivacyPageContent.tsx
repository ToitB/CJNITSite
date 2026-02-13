'use client';

import { BackgroundCanvas } from './BackgroundCanvas';
import { Navbar } from './Navbar';

export function PrivacyPageContent() {
  return (
    <div className="relative min-h-screen bg-white text-brand-dark selection:bg-brand-orange selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCanvas />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
          <section className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white/86 backdrop-blur-sm shadow-sm p-8 md:p-12">
            <span className="section-kicker inline-block mb-5">Legal</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-brand-dark mb-6">
              Privacy Policy &amp; POPIA Notice
            </h1>

            <p className="font-sans text-slate-700 leading-relaxed mb-8">
              CJN IT Solutions is committed to protecting your privacy and ensuring that your personal information is
              collected and used properly, lawfully, and transparently in accordance with the Protection of Personal
              Information Act (POPIA).
            </p>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark mb-4">Information We Collect</h2>
            <p className="font-sans text-slate-700 leading-relaxed mb-4">
              We collect and process personal information mainly to contact you for the purposes of understanding your
              requirements and delivering IT services. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-3 font-sans text-slate-700 leading-relaxed mb-8">
              <li>
                Contact Details: Name, email address, and telephone numbers.
              </li>
              <li>
                Business Information: Company name, registration numbers, and VAT details.
              </li>
              <li>
                Technical Data: IP addresses and cookies (when navigating our website) to improve user experience.
              </li>
            </ul>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark mb-4">How We Use Your Information</h2>
            <p className="font-sans text-slate-700 leading-relaxed mb-4">
              Your information is used solely for the purpose for which it was collected, including:
            </p>
            <ul className="list-disc pl-6 space-y-3 font-sans text-slate-700 leading-relaxed mb-8">
              <li>Providing managed IT services and support.</li>
              <li>Processing hardware procurement and service billing.</li>
              <li>Complying with legal and regulatory requirements (SARS/POPIA).</li>
            </ul>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark mb-4">Disclosure of Information</h2>
            <p className="font-sans text-slate-700 leading-relaxed mb-8">
              We do not sell your data. We only disclose your personal information to third-party service providers
              (such as Acronis for backups or Trend Micro for security) where it is essential for the delivery of the
              services you have contracted.
            </p>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark mb-4">Your Rights</h2>
            <p className="font-sans text-slate-700 leading-relaxed mb-8">
              You have the right to request a copy of the personal information we hold about you, to request an update
              or correction, and to object to the processing of your data at any time.
            </p>

            <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark mb-4">
              Contact Our Information Officer
            </h2>
            <p className="font-sans text-slate-700 leading-relaxed">
              For any queries regarding your data, please contact us at:{' '}
              <a href="mailto:helpdesk@cjn.co.za" className="text-brand-blue hover:text-brand-cyan transition-colors">
                helpdesk@cjn.co.za
              </a>
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

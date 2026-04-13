import { BackgroundCanvas } from './BackgroundCanvas';
import { Navbar } from './Navbar';

export function TermsPageContent() {
  return (
    <div className="relative min-h-screen bg-white text-brand-dark selection:bg-brand-orange selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCanvas />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="pt-40 pb-20 px-6 md:px-12 lg:px-24">
          <section className="glass-card-strong max-w-4xl mx-auto rounded-3xl p-8 md:p-12">
            <span className="section-kicker inline-block mb-5">Legal</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-brand-dark mb-6">
              Terms and Conditions of Use
            </h1>

            <p className="font-sans text-slate-700 leading-relaxed mb-8">
              Welcome to the CJN IT Solutions website. By accessing this website, you agree to comply with and be
              bound by the following terms and conditions.
            </p>

            <ol className="list-none pl-0 space-y-8 font-sans text-slate-700 leading-relaxed">
              <li>
                <div className="flex items-baseline gap-2 mb-3">
                  <span aria-hidden="true" className="font-display text-2xl md:text-3xl font-bold text-brand-dark shrink-0">1.</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark">Professional Services</h2>
                </div>
                <p>
                  The content on this website is for general information purposes only. While we strive for
                  &quot;Invisible Reliability,&quot; CJN IT Solutions provides services based on specific Service Level
                  Agreements (SLAs). Website content does not constitute a binding contract until a formal Service
                  Agreement is signed.
                </p>
              </li>
              <li>
                <div className="flex items-baseline gap-2 mb-3">
                  <span aria-hidden="true" className="font-display text-2xl md:text-3xl font-bold text-brand-dark shrink-0">2.</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark">Intellectual Property</h2>
                </div>
                <p>
                  All content, 3D assets, logos, and engineered solutions displayed on this site are the property of
                  CJN IT Solutions or its licensors. Unauthorized reproduction or use of these materials is strictly
                  prohibited.
                </p>
              </li>
              <li>
                <div className="flex items-baseline gap-2 mb-3">
                  <span aria-hidden="true" className="font-display text-2xl md:text-3xl font-bold text-brand-dark shrink-0">3.</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark">Limitation of Liability</h2>
                </div>
                <p>
                  To the extent permitted by the Electronic Communications and Transactions Act (ECT Act), CJN IT
                  Solutions shall not be liable for any damage, loss, or liability of any nature incurred by the use
                  of or inability to use this website or the services linked herein.
                </p>
              </li>
              <li>
                <div className="flex items-baseline gap-2 mb-3">
                  <span aria-hidden="true" className="font-display text-2xl md:text-3xl font-bold text-brand-dark shrink-0">4.</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark">Jurisdiction</h2>
                </div>
                <p>
                  These terms are governed by and interpreted in accordance with the laws of the Republic of South
                  Africa. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the
                  South African courts.
                </p>
              </li>
              <li>
                <div className="flex items-baseline gap-2 mb-3">
                  <span aria-hidden="true" className="font-display text-2xl md:text-3xl font-bold text-brand-dark shrink-0">5.</span>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-brand-dark">Service Availability</h2>
                </div>
                <p>
                  While we aim for maximum uptime, we do not guarantee that the website will be available at all times
                  without interruption. We reserve the right to modify or withdraw services or content without notice.
                </p>
              </li>
            </ol>
          </section>
        </main>
      </div>
    </div>
  );
}

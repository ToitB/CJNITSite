import { BackgroundCanvas } from './BackgroundCanvas';
import { Navbar } from './Navbar';
import type { BlogPost } from '../lib/blog';

type BlogArticleContentProps = {
  post: BlogPost;
};

const assessmentMailto =
  'mailto:info@cjn.co.za?subject=IT%20Assessment%20Request&body=Hi%20CJN%20IT%20Solutions%2C%0A%0AI%20would%20like%20to%20book%20an%20IT%20assessment%20for%20my%20business.%0A%0ACompany%20name%3A%0AContact%20number%3A%0APreferred%20date%2Ftime%3A%0AKey%20IT%20concerns%3A%0A';

export function BlogArticleContent({ post }: BlogArticleContentProps) {
  return (
    <div className="relative min-h-screen bg-white text-brand-dark selection:bg-brand-orange selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <BackgroundCanvas />
      </div>

      <div className="relative z-10">
        <Navbar />

        <main className="pt-36 pb-20 px-6 md:px-12 lg:px-24">
          <article className="mx-auto max-w-4xl">
            <a
              href="/blog"
              className="mb-8 inline-flex font-subheading text-xs font-bold uppercase tracking-widest text-brand-blue transition-colors hover:text-brand-orange"
            >
              Back to blog
            </a>

            <header className="glass-card rounded-[2rem] p-8 md:p-12">
              <p className="mb-5 font-subheading text-xs font-bold uppercase tracking-widest text-brand-orange">
                {post.category} · {post.displayDate} · {post.readTime}
              </p>
              <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-brand-dark md:text-6xl">
                {post.title}
              </h1>
              <p className="mt-6 font-sans text-lg leading-8 text-slate-600 md:text-xl">
                {post.heroSummary}
              </p>
            </header>

            <section className="glass-card-accent mt-8 rounded-[1.75rem] p-7 md:p-8">
              <h2 className="font-display text-2xl font-bold text-brand-dark">
                Key Takeaways
              </h2>
              <ul className="mt-5 space-y-3">
                {post.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-3 font-sans text-slate-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-brand-orange" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-10 space-y-8">
              {post.sections.map((section) => (
                <section key={section.heading} className="glass-card rounded-[1.75rem] p-7 md:p-9">
                  <h2 className="font-display text-3xl font-bold leading-tight text-brand-dark">
                    {section.heading}
                  </h2>
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="font-sans text-lg leading-8 text-slate-700">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets && (
                    <ul className="mt-6 space-y-3">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-3 font-sans text-slate-700">
                          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            <section className="glass-card-accent mt-10 rounded-[1.75rem] p-8 md:p-10">
              <p className="font-subheading text-xs font-bold uppercase tracking-widest text-brand-orange">
                Need a practical next step?
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold text-brand-dark">
                Start with an IT assessment
              </h2>
              <p className="mt-4 font-sans text-lg leading-8 text-slate-700">
                CJN IT Solutions helps South African businesses review infrastructure,
                security, cloud readiness, and continuity risks before they become
                operational problems.
              </p>
              <a href={assessmentMailto} className="btn-accent mt-6 rounded-xl px-6 py-3">
                Book an IT Assessment
              </a>
            </section>
          </article>
        </main>
      </div>
    </div>
  );
}

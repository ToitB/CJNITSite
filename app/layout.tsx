import type { Metadata } from 'next';
import { DM_Sans, Sora } from 'next/font/google';
import { LiquidEffects } from '../components/LiquidEffects';
import './globals.css';

const SITE_URL = 'https://cjn.co.za';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Managed IT Services & Cyber Security | CJN IT Solutions',
    template: '%s | CJN IT Solutions',
  },
  description:
    'Managed IT services, cyber security, cloud support, and business continuity for South African small businesses.',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: SITE_URL,
    siteName: 'CJN IT Solutions',
    title: 'Managed IT Services & Cyber Security | CJN IT Solutions',
    description:
      'Fixed-cost managed IT, cyber security, Microsoft 365 cloud ecosystems, and backup solutions for South African businesses.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CJN IT Solutions – Managed IT Services & Cyber Security',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cjnit',
    title: 'Managed IT Services & Cyber Security | CJN IT Solutions',
    description:
      'Fixed-cost managed IT, cyber security, Microsoft 365 cloud ecosystems, and backup solutions for South African businesses.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-white">
      <head>
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://images.pexels.com https://images.unsplash.com; frame-src https://www.google.com; connect-src 'self' https://*.cjn.co.za; object-src 'none'; base-uri 'self'; form-action 'self' https://*.cjn.co.za; frame-ancestors 'none';"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'CJN IT Solutions',
              url: 'https://cjn.co.za',
              logo: 'https://cjn.co.za/favicon.svg',
              description:
                'Managed IT services, cyber security, cloud support, and business continuity for South African businesses.',
              telephone: '+27878093516',
              email: 'sales@cjn.co.za',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Office 3, Building 5, Glen Manor Office Park, 138 Frikkie De Beer St',
                addressLocality: 'Pretoria',
                postalCode: '0084',
                addressCountry: 'ZA',
              },
              openingHours: 'Mo-Fr 08:00-17:00',
              sameAs: [
                'https://www.linkedin.com/company/cjnitsolutions',
                'https://x.com/cjnit',
              ],
            }),
          }}
        />
      </head>
      <body className={`${dmSans.variable} ${sora.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-blue focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
        >
          Skip to main content
        </a>
        <LiquidEffects />
        {children}
      </body>
    </html>
  );
}

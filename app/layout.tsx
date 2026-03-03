import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { LiquidEffects } from '../components/LiquidEffects';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Managed IT Services & Cyber Security | CJN IT Solutions',
  description:
    "Managed IT services, cyber security, cloud support, and business continuity for South African small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-white">
      <body className={`${inter.variable} ${montserrat.variable} antialiased`}>
        <LiquidEffects />
        {children}
      </body>
    </html>
  );
}

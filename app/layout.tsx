import type { Metadata } from 'next';
import { Lato, Montserrat, Open_Sans } from 'next/font/google';
import './globals.css';

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-lato',
});

export const metadata: Metadata = {
  title: 'CJN IT Solutions | The Digital Backbone',
  description:
    "We engineer the digital backbone of South Africa's most resilient businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth bg-white">
      <body className={`${openSans.variable} ${montserrat.variable} ${lato.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

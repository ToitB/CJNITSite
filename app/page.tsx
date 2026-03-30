import type { Metadata } from 'next';
import App from '../App';

export const metadata: Metadata = {
  title: {
    absolute: 'Managed IT Services & Cyber Security | CJN IT Solutions',
  },
  description:
    'Fixed-cost managed IT services, cyber security, cloud ecosystems, and backup solutions for South African businesses.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <App />;
}

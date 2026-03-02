import type { Metadata } from 'next';
import App from '../App';

export const metadata: Metadata = {
  title: 'Managed IT Services & Security for South African Businesses | CJN IT Solutions',
  description:
    'Fixed-cost managed IT services, cyber security, cloud ecosystems, and backup solutions for South African businesses.',
};

export default function HomePage() {
  return <App />;
}

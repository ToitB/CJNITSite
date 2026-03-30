import type { Metadata } from 'next';
import { PrivacyPageContent } from '../../components/PrivacyPageContent';

export const metadata: Metadata = {
  title: 'Privacy Policy & POPIA Notice',
  description:
    'Read the CJN IT Solutions privacy policy and POPIA notice covering personal information use, disclosure, and your rights.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}

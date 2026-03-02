import type { Metadata } from 'next';
import { TermsPageContent } from '../../components/TermsPageContent';

export const metadata: Metadata = {
  title: 'Terms and Conditions | CJN IT Solutions',
  description:
    'Review the CJN IT Solutions website terms and conditions covering services, intellectual property, liability, and jurisdiction.',
};

export default function TermsPage() {
  return <TermsPageContent />;
}

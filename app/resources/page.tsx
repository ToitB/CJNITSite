import type { Metadata } from 'next';
import { ResourcesPageContent } from '../../components/ResourcesPageContent';

export const metadata: Metadata = {
  title: 'Client Resources Hub',
  description:
    'Access CJN IT Solutions client resources, self-assessment tools, referral forms, and the shared OneDrive repository.',
  alternates: { canonical: '/resources' },
};

export default function ResourcesPage() {
  return <ResourcesPageContent />;
}

import type { Metadata } from 'next';
import { ResourcesPageContent } from '../../components/ResourcesPageContent';

export const metadata: Metadata = {
  title: 'Client Resources Hub | CJN IT Solutions',
  description:
    'Access CJN IT Solutions client resources, self-assessment tools, referral forms, and the shared OneDrive repository.',
};

export default function ResourcesPage() {
  return <ResourcesPageContent />;
}

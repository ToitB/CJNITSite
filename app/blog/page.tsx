import type { Metadata } from 'next';
import { BlogPageContent } from '../../components/BlogPageContent';

export const metadata: Metadata = {
  title: 'IT Insights Blog',
  description:
    'Practical IT guidance, security insights, and Microsoft 365 planning advice for South African business leaders.',
  alternates: { canonical: '/blog' },
};

export default function BlogPage() {
  return <BlogPageContent />;
}

import type { Metadata } from 'next';
import { BlogPageContent } from '../../components/BlogPageContent';

export const metadata: Metadata = {
  title: 'IT Insights Blog | CJN IT Solutions',
  description:
    'Practical IT guidance, security insights, and Microsoft 365 planning advice for South African business leaders.',
};

export default function BlogPage() {
  return <BlogPageContent />;
}

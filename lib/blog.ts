export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  category: string;
  readTime: string;
  excerpt: string;
  metaDescription: string;
  heroSummary: string;
  keyTakeaways: string[];
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'resilient-sme-it-stack',
    title: 'How to Build a Resilient SME IT Stack',
    date: '2026-01-12',
    displayDate: 'January 12, 2026',
    category: 'Business Continuity',
    readTime: '6 min read',
    excerpt:
      'A practical blueprint for uptime-focused infrastructure, from endpoint control to backup strategy.',
    metaDescription:
      'A practical IT resilience blueprint for South African SMEs covering connectivity, endpoints, backups, Microsoft 365, security, and support.',
    heroSummary:
      'Resilience is not one product. It is the combination of reliable connectivity, protected devices, tested backups, secure cloud services, and a support model that resolves problems before they become downtime.',
    keyTakeaways: [
      'Treat connectivity, power, devices, identity, backup, and support as one operating system.',
      'Prioritise controls that reduce downtime first: endpoint health, patching, MFA, and tested recovery.',
      'Document ownership so every recurring IT task has a responsible person or service provider.',
    ],
    sections: [
      {
        heading: 'Start with the business impact, not the hardware list',
        paragraphs: [
          'Small businesses often build IT reactively: a laptop here, a router there, a backup drive when someone remembers. That approach works until one failed device, one fibre outage, or one compromised mailbox stops invoicing, sales, payroll, or customer service.',
          'A resilient IT stack starts by identifying the systems that must stay available. For most South African SMEs, that means email, Microsoft 365 files, accounting software, point-of-sale or operations platforms, internet access, and the laptops used by key staff.',
        ],
        bullets: [
          'List the systems that stop revenue if unavailable for a day.',
          'Identify who owns each system and who can approve emergency changes.',
          'Record vendor contacts, renewal dates, admin accounts, and support escalation paths.',
        ],
      },
      {
        heading: 'Protect the endpoints your team actually uses',
        paragraphs: [
          'Most incidents start at the edge: a laptop without updates, a weak password, an unprotected mailbox, or a user clicking a convincing invoice link. Endpoint management is therefore not optional. It is the foundation of predictable operations.',
          'For a practical SME environment, every device should have managed antivirus or endpoint detection, automatic updates, disk encryption where possible, and a standard setup process. The goal is not complexity. The goal is consistency.',
        ],
        bullets: [
          'Standardise laptop builds so new users receive the same baseline security.',
          'Patch operating systems, browsers, Microsoft 365 apps, and line-of-business tools.',
          'Remove local admin rights unless there is a documented operational reason.',
        ],
      },
      {
        heading: 'Design for South African connectivity realities',
        paragraphs: [
          'Connectivity and power interruptions remain practical risks for many local businesses. A resilient stack should assume that the primary internet line or office power can fail at an inconvenient time.',
          'The right answer depends on the business. Some offices need LTE or 5G failover. Others need staff who can work securely from home. The important point is that the failover path must be tested before it is needed.',
        ],
        bullets: [
          'Use business-grade connectivity where uptime matters.',
          'Keep a documented mobile failover plan for critical users.',
          'Make sure remote access does not bypass security controls.',
        ],
      },
      {
        heading: 'Backups must be tested, not assumed',
        paragraphs: [
          'A backup that has never been restored is only a hope. SMEs should separate backup success from recovery confidence. The system may report green ticks every day, but the business still needs proof that email, files, accounting data, and server workloads can be restored within an acceptable timeframe.',
          'A sensible approach is hybrid: local recovery for fast restoration where appropriate, plus cloud redundancy for site-level incidents. Recovery objectives should be written in plain language so owners can make budget decisions with eyes open.',
        ],
        bullets: [
          'Define how much data the business can afford to lose.',
          'Define how long each critical system can be down.',
          'Run scheduled restore tests and keep evidence of the result.',
        ],
      },
      {
        heading: 'Use Microsoft 365 as a managed platform, not just email',
        paragraphs: [
          'Microsoft 365 can be the operational core for a small business, but only if it is configured intentionally. Mailboxes, Teams, SharePoint, OneDrive, device access, MFA, retention, and permissions should be planned as one environment.',
          'For business owners, the key question is simple: can the right people access the right information securely from the right devices? If the answer is uncertain, the environment needs review.',
        ],
        bullets: [
          'Enable MFA for every account, especially administrators.',
          'Use groups and role-based permissions instead of ad hoc sharing.',
          'Review inactive users, guest access, and mailbox forwarding rules regularly.',
        ],
      },
      {
        heading: 'Build a support rhythm',
        paragraphs: [
          'Resilience depends on routine. The strongest SME IT environments are not the ones with the most expensive equipment. They are the ones where maintenance, monitoring, renewals, backup checks, and security reviews happen on schedule.',
          'A managed IT partner should help translate technical risk into operational language: what can fail, what the impact is, what it costs to reduce the risk, and what response time the business can expect.',
        ],
      },
    ],
  },
  {
    slug: 'security-gaps-growing-businesses',
    title: '5 Security Gaps We See in Growing Businesses',
    date: '2025-12-09',
    displayDate: 'December 9, 2025',
    category: 'Cyber Security',
    readTime: '5 min read',
    excerpt:
      'Common vulnerabilities and fast remediation steps that reduce risk without major disruption.',
    metaDescription:
      'Five common cyber security gaps in growing South African businesses and practical remediation steps for owners and managers.',
    heroSummary:
      'Security failures in growing companies are rarely caused by one dramatic mistake. They usually come from small gaps that were acceptable at ten users but become dangerous at thirty, fifty, or a hundred.',
    keyTakeaways: [
      'The highest-return fixes are often MFA, patching, backups, and access review.',
      'Mailbox compromise is a business risk, not only a technical event.',
      'Security should become a monthly management habit, not an annual panic.',
    ],
    sections: [
      {
        heading: '1. Weak sign-in protection',
        paragraphs: [
          'The first gap is still the most common: accounts protected only by passwords. If one mailbox is compromised, attackers can read invoices, reset passwords, impersonate staff, and target customers or suppliers.',
          'Multi-factor authentication should be enabled for every user, with stricter rules for administrators and finance staff. Shared accounts should be phased out because they make accountability and recovery difficult.',
        ],
        bullets: [
          'Enable MFA across Microsoft 365 and other cloud platforms.',
          'Block legacy authentication where possible.',
          'Use named accounts instead of shared logins.',
        ],
      },
      {
        heading: '2. Unmanaged devices',
        paragraphs: [
          'A business can have good cloud security and still be exposed through unmanaged laptops. Devices that miss updates, run unsupported software, or allow uncontrolled administrator access create avoidable risk.',
          'This does not require enterprise complexity. A growing SME needs a standard device baseline, managed endpoint protection, update visibility, and a documented process for onboarding and offboarding staff devices.',
        ],
        bullets: [
          'Track every business device and assigned user.',
          'Use managed endpoint protection rather than unmanaged consumer antivirus.',
          'Remove access from old devices when employees leave.',
        ],
      },
      {
        heading: '3. Backups without recovery proof',
        paragraphs: [
          'Many companies only discover backup problems during a ransomware incident, theft, server failure, or accidental deletion. The issue is not only whether backups exist. The issue is whether they can restore the business fast enough.',
          'Backup testing should be part of normal operations. Owners do not need every technical detail, but they should know what is backed up, where it is stored, how long it is retained, and when the last restore test succeeded.',
        ],
        bullets: [
          'Keep backups separate from normal user access.',
          'Test restores for critical files and systems.',
          'Document recovery time expectations for each core platform.',
        ],
      },
      {
        heading: '4. Over-permissioned users',
        paragraphs: [
          'As businesses grow, permissions often accumulate. Staff move roles, temporary access becomes permanent, and external guests remain in shared folders long after a project ends.',
          'Access control should be reviewed regularly. The principle is simple: people should have the access they need to do their work, not access that was convenient three years ago.',
        ],
        bullets: [
          'Review administrator roles monthly.',
          'Audit SharePoint, Teams, and OneDrive external sharing.',
          'Remove dormant user accounts and unused guest access.',
        ],
      },
      {
        heading: '5. No incident decision plan',
        paragraphs: [
          'When a security incident happens, minutes matter. A small business does not need a hundred-page incident response manual, but it does need a clear first-hour plan.',
          'The plan should answer who can disconnect devices, who contacts IT support, who informs management, who approves supplier communication, and how the business will continue operating while systems are checked.',
        ],
        bullets: [
          'Write down the first five actions for suspected compromise.',
          'Keep emergency contacts outside the affected mailbox system.',
          'Run a short tabletop exercise with management and finance.',
        ],
      },
      {
        heading: 'Make security manageable',
        paragraphs: [
          'Cyber security becomes sustainable when it is handled as a monthly operating discipline. For most SMEs, the best starting point is a baseline review covering identity, endpoint health, backup recoverability, user permissions, and incident readiness.',
          'The objective is not fear. The objective is to reduce the easy paths attackers use and give the business a clear response plan when something looks wrong.',
        ],
      },
    ],
  },
  {
    slug: 'microsoft-365-migration-planning',
    title: 'Microsoft 365 Migration: What to Plan First',
    date: '2025-11-03',
    displayDate: 'November 3, 2025',
    category: 'Cloud Ecosystems',
    readTime: '6 min read',
    excerpt:
      'Key planning checkpoints to keep collaboration, mail, and file migration smooth.',
    metaDescription:
      'A Microsoft 365 migration planning guide for South African SMEs covering identity, mail, files, Teams, security, and user readiness.',
    heroSummary:
      'A Microsoft 365 migration is not only a technical move from one platform to another. It changes how staff access mail, share files, collaborate, secure devices, and recover information.',
    keyTakeaways: [
      'Plan identity and access before moving mail or files.',
      'Clean up old data and permissions before migration day.',
      'Treat user communication and support as part of the migration, not an afterthought.',
    ],
    sections: [
      {
        heading: 'Define what is moving and why',
        paragraphs: [
          'The first planning mistake is treating Microsoft 365 as an email-only project. For most SMEs, the real value is a managed workspace that combines Exchange Online, Teams, SharePoint, OneDrive, security policies, and device access.',
          'Before migration, define the business outcome. Is the goal better remote work, reduced server dependency, improved collaboration, better security, or a simpler support model? The answer changes the technical plan.',
        ],
        bullets: [
          'List current email, file, calendar, and collaboration systems.',
          'Identify data that should not be migrated.',
          'Decide which users, departments, and shared mailboxes move first.',
        ],
      },
      {
        heading: 'Get identity right before migration day',
        paragraphs: [
          'Identity is the control plane for Microsoft 365. If user accounts, aliases, admin roles, and password policies are messy before migration, the migration will carry that mess into the new environment.',
          'Every user should have a clear account owner, licensing requirement, MFA expectation, and recovery path. Administrator accounts should be separate from normal daily-use accounts where possible.',
        ],
        bullets: [
          'Confirm all active users and remove dormant accounts.',
          'Prepare MFA rollout and user communication.',
          'Review admin roles and emergency access procedures.',
        ],
      },
      {
        heading: 'Clean up file shares before moving them',
        paragraphs: [
          'Moving a chaotic file server into SharePoint or OneDrive does not make it organised. It makes the chaos easier to share. A good migration includes a data cleanup phase before files are moved.',
          'Decide what belongs in SharePoint team sites, what belongs in OneDrive, and what should be archived. Permissions should be group-based where possible so access remains manageable after go-live.',
        ],
        bullets: [
          'Remove duplicates, obsolete folders, and personal data that no longer has a business purpose.',
          'Map old folder permissions to Microsoft 365 groups.',
          'Avoid recreating one giant shared drive in SharePoint.',
        ],
      },
      {
        heading: 'Plan Teams and SharePoint together',
        paragraphs: [
          'Teams is not separate from SharePoint. Every Team creates or uses file storage behind the scenes. If Teams channels are created casually, file structure and permissions can quickly become confusing.',
          'Create a simple naming convention and decide who can create Teams. Small businesses do not need bureaucracy, but they do need enough structure to prevent sprawl.',
        ],
        bullets: [
          'Use clear names for departments, projects, and client workspaces.',
          'Define owners for each Team or SharePoint site.',
          'Set expectations for guest access and external sharing.',
        ],
      },
      {
        heading: 'Prepare users for the first week',
        paragraphs: [
          'The success of a migration is judged by the first working week. If staff cannot find files, sign in, use Outlook, or understand Teams, the project will feel like a failure even if the technical migration succeeded.',
          'Prepare simple user guides, communicate cutover dates, and schedule support capacity for the first few days. Finance, management, and customer-facing teams should receive extra attention because disruption there affects revenue and service.',
        ],
        bullets: [
          'Send staff a short pre-migration checklist.',
          'Confirm Outlook, mobile mail, and Teams access after cutover.',
          'Keep support channels visible during the first week.',
        ],
      },
      {
        heading: 'Secure the environment immediately after cutover',
        paragraphs: [
          'Once the migration is complete, review security settings before the environment becomes business-as-usual. Confirm MFA, mailbox forwarding rules, conditional access where applicable, external sharing, retention, and backup coverage.',
          'Microsoft 365 is a strong platform, but it still needs active management. The best migration outcome is not just that mail works. It is that the business now has a cleaner, more secure, easier-to-support operating environment.',
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

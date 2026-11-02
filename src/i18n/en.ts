// Copyright (c) Tunlabs Corp. All rights reserved.

export const en = {
  nav: {
    services: 'Services',
    demo: 'Demo',
    process: 'Process',
    about: 'About',
    contact: 'Contact',
    cta: 'Start a project',
  },
  hero: {
    badge: 'Software Development Studio',
    title: 'We build software that moves your business forward',
    subtitle:
      'Tunlabs is a senior engineering team that designs, builds, and scales digital products for companies that demand excellence.',
    ctaPrimary: 'Start a project',
    ctaSecondary: 'Explore services',
  },
  services: {
    heading: 'What we do',
    subheading: 'End-to-end product engineering, from first sketch to production at scale.',
    items: {
      custom: {
        title: 'Custom Software',
        description:
          'Tailored platforms and internal tools engineered around your workflows, not the other way around.',
      },
      web: {
        title: 'Web Applications',
        description:
          'Fast, accessible, SEO-ready web apps built with modern stacks and obsessive attention to detail.',
      },
      mobile: {
        title: 'Mobile Apps',
        description:
          'Native-quality iOS and Android experiences from a single codebase, shipped faster.',
      },
      cloud: {
        title: 'Cloud & DevOps',
        description:
          'Infrastructure as code, CI/CD pipelines, and observability so your team ships with confidence.',
      },
      ai: {
        title: 'AI & Data',
        description:
          'LLM integrations, intelligent automation, and data pipelines that turn information into decisions.',
      },
      design: {
        title: 'UX/UI Design',
        description:
          'Research-driven interfaces that feel effortless and convert visitors into customers.',
      },
    },
  },
  process: {
    heading: 'How we work',
    subheading: 'A proven process that de-risks delivery and keeps you in control.',
    steps: {
      discovery: {
        title: 'Discovery',
        description:
          'We dig into your goals, users, and constraints to define the right scope and roadmap.',
      },
      design: {
        title: 'Design & Architecture',
        description:
          'UX flows, interface design, and a technical blueprint your team can trust.',
      },
      build: {
        title: 'Build & Iterate',
        description:
          'Weekly demos, transparent progress, and production-quality code from day one.',
      },
      scale: {
        title: 'Launch & Scale',
        description:
          'Zero-drama deployment, monitoring, and a partner that stays as you grow.',
      },
    },
  },
  showcase: {
    heading: 'Your product, live in your hands',
    subheading: 'Scroll to see how we build — then try the phone.',
    hint: 'Interact with the phone — it’s a live demo',
    features: {
      fast: {
        title: 'Ship fast, iterate faster',
        description: 'Weekly demos and continuous delivery from sprint one.',
      },
      quality: {
        title: 'Production-grade by default',
        description: 'Testing, code review, and CI/CD baked into every build.',
      },
      impact: {
        title: 'Built to convert',
        description: 'Every screen designed around your business goals.',
      },
    },
    tabs: {
      overview: 'Overview',
      analytics: 'Analytics',
      team: 'Team',
    },
    stats: {
      revenue: 'Revenue',
      users: 'Active users',
      uptime: 'Uptime',
    },
    projects: {
      phoenix: 'Project Phoenix',
      atlas: 'Atlas Platform',
      nova: 'Nova App',
    },
    shipped: 'Shipped',
    weeklyDeploys: 'Weekly deploys',
    members: [
      { name: 'Ana Martínez', role: 'Lead Engineer' },
      { name: 'Juan Ríos', role: 'Product Designer' },
      { name: 'Sara Kim', role: 'Full-Stack Dev' },
      { name: 'Luis Pérez', role: 'DevOps' },
    ],
  },
  about: {
    heading: 'Why Tunlabs',
    subheading:
      'A compact senior team with the discipline of a consultancy and the heart of a product company.',
    points: {
      senior: {
        title: 'Senior-only team',
        description: 'Every engineer on your project ships production code at a senior level.',
      },
      comms: {
        title: 'Radical transparency',
        description: 'Real-time visibility into progress, budgets, and decisions. No surprises.',
      },
      timezone: {
        title: 'Timezone-aligned',
        description: 'Working hours that overlap with your team for real collaboration.',
      },
      quality: {
        title: 'Quality by default',
        description: 'Automated testing, code review, and CI/CD on every engagement.',
      },
    },
  },
  contact: {
    heading: 'Let’s build something great together',
    subheading: 'Tell us about your project. We usually reply within one business day.',
    cta: 'Get in touch',
    email: 'hello@tunlabs.com',
  },
  footer: {
    tagline: 'Software development studio.',
    rights: 'All rights reserved.',
  },
} as const

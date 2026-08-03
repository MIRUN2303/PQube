import {
  Cloud, Globe, Code2, Server, Workflow, BarChart3,
  LayoutDashboard, Sparkles, Smartphone, ShoppingCart,
  Megaphone, Database, Heart
} from 'lucide-react';

export const services = [
  {
    id: 1, title: 'Cloud Solutions',
    icon: Cloud, category: 'Build & Modernize',
    image: '/images/services/cloud-solutions.jpg',
    description: 'Scalable cloud infrastructure, migration, and managed services across AWS, Azure, and GCP to modernize your IT operations and reduce costs.',
    link: '/services/cloud-solutions',
    overview: 'We architect, migrate and operate workloads on AWS, Azure and GCP — from landing-zone design and legacy-to-cloud migration to fully-managed, cost-governed operations with 24/7 monitoring, resilience hardening and disaster recovery.',
    features: [
      'Cloud strategy, landing zones and migration roadmaps',
      'Infrastructure as code and CI/CD pipeline setup',
      'Cost governance, FinOps and resource right-sizing',
      'Security hardening, patching and 24/7 monitoring',
      'Disaster recovery design and failover drills',
    ],
  },
  {
    id: 2, title: 'Custom Web Solutions',
    icon: Globe, category: 'Build & Modernize',
    image: '/images/services/web-solutions.jpg',
    description: 'High-performance websites, portals, and SaaS platforms built with modern frameworks — responsive, secure, and conversion-optimized.',
    link: '/services/custom-web-solutions',
    overview:
      'From corporate sites and client portals to full SaaS products, we build responsive, accessible web experiences on modern frameworks — designed around conversion, secured at every layer, and deployable with a repeatable release pipeline.',
    features: [
      'Responsive marketing sites and corporate portals',
      'SaaS platforms and multi-tenant web products',
      'CMS build-out and content migration',
      'Performance, SEO and conversion-rate optimization',
      'CI/CD, monitoring and long-term maintenance',
    ],
  },
  {
    id: 3, title: 'Custom Development',
    icon: Code2, category: 'Build & Modernize',
    image: '/images/services/custom-development.jpg',
    description: 'End-to-end custom software engineering — from requirements to deployment — tailored to your unique business logic and workflows.',
    link: '/services/custom-development',
    overview:
      'We engineer bespoke software around your exact business logic — requirements, architecture, build and deployment — with documented hand-off and robust, secure code tailored to how your teams actually work.',
    features: [
      'Requirements analysis and technical blueprinting',
      'Full-stack development across web, API and integration',
      'Legacy system modernization and re-engineering',
      'Automated testing and security review',
      'Deployment, training and ongoing support',
    ],
  },
  {
    id: 4, title: 'IT Infrastructure Services',
    icon: Server, category: 'Build & Modernize',
    image: '/images/services/it-infrastructure.jpg',
    description: 'Design, deployment, and management of robust IT infrastructure — networks, servers, storage, and security — ensuring business continuity.',
    link: '/services/it-infrastructure',
    overview:
      'We design, deploy and manage the backbone — networks, servers, storage, firewall and security — built for high availability so your applications stay online and your data stays protected.',
    features: [
      'Network, server and storage architecture design',
      'Virtualization and datacenter builds',
      'Endpoint, perimeter and security hardening',
      'Backup, monitoring and proactive maintenance',
      'Business continuity and incident response',
    ],
  },
  {
    id: 5, title: 'Business Process Automation',
    icon: Workflow, category: 'Automate & Analyze',
    image: '/images/services/business-automation.jpg',
    description: 'Automate repetitive tasks, streamline approvals, and integrate disparate systems with intelligent BPA that drives operational efficiency.',
    link: '/services/business-process-automation',
    overview:
      'We automate the work that slows you down — repetitive entry, document flows and multi-step approvals — linking your disconnected systems into workflow platforms and safe custom integrations that reduce manual effort and errors.',
    features: [
      'Value-stream and automation opportunity mapping',
      'Workflow automation and approval orchestration',
      'System integration between CRM, ERP and apps',
      'Robotic process automation where it fits',
      'Exception handling, dashboards and process governance',
    ],
  },
  {
    id: 6, title: 'Data Analytics',
    icon: BarChart3, category: 'Automate & Analyze',
    image: '/images/services/data-analytics.jpg',
    description: 'Transform raw data into actionable insights with dashboards, BI tools, predictive analytics, and data engineering pipelines.',
    link: '/services/data-analytics',
    overview:
      'We turn raw, scattered data into one source of truth — building warehouses and pipelines, modeling metrics, and shipping interactive dashboards leadership opens daily, plus predictive analytics and ML forecasts.',
    features: [
      'Data warehouse and lake architecture',
      'ETL/ELT pipeline engineering',
      'BI dashboards with Power BI and Tableau',
      'Predictive analytics and ML forecasting',
      'Data governance, quality and cataloging',
    ],
  },
  {
    id: 7, title: 'Dynamics 365 Solutions',
    icon: LayoutDashboard, category: 'Automate & Analyze',
    image: '/images/services/dynamics-365.jpg',
    description: 'Microsoft Dynamics 365 implementation and integration to unify your CRM, ERP, and business operations on one intelligent platform.',
    link: '/services/dynamics-365',
    overview:
      'We implement and integrate Microsoft Dynamics 365 (CE + F&O) as a single intelligent foundation, covering process mapping, custom modules, data migration and adoption programs so the system is used to run the business end-to-end.',
    features: [
      'Dynamics 365 Sales, Customer Service and F&O deployments',
      'Process mapping and configuration packages',
      'Data migration and custom module development',
      'Power Platform extensions and integrations',
      'End-user adoption and go-live support',
    ],
  },
  {
    id: 8, title: 'Digital Transformation',
    icon: Sparkles, category: 'Automate & Analyze',
    image: '/images/services/digital-transformation.png',
    description: 'Strategic consulting to digitize processes, modernize legacy systems, and unlock new revenue streams — including ePharmacy solutions.',
    link: '/services/digital-transformation', tag: 'ePharmacy Solutions',
    overview:
      'We partner with leadership on discovery sprints, blueprints and phased delivery to digitize processes, modernize legacy systems and unlock new revenue models — including specialty engines such as ePharmacy — until the transformation is embedded in daily operations.',
    features: [
      'Discovery sprints and current-state mapping',
      'Digital roadmap and business-case blueprint',
      'Legacy modernization with phased delivery',
      'Industry solutions — including ePharmacy builds',
      'Change management and adoption programs',
    ],
  },
  {
    id: 9, title: 'Mobile Development',
    icon: Smartphone, category: 'Grow & Support',
    image: '/images/services/mobile-development.webp',
    description: 'Native and cross-platform mobile apps for iOS and Android — built for performance, usability, and seamless backend integration.',
    link: '/services/mobile-development',
    overview:
      'We ship consumer-grade mobile experiences across iOS, Android and cross-platform stacks — owning the full lifecycle from requirements and UX to App Store deployment, offline-first, push, analytics and secure API integration.',
    features: [
      'iOS, Android and cross-platform (React Native/Flutter)',
      'UX and product design for mobile',
      'Offline-first, push and analytics integration',
      'Secure API and backend integration',
      'TestFlight/Play release pipelines and crash monitoring',
    ],
  },
  {
    id: 10, title: 'Ecommerce Business Solutions',
    icon: ShoppingCart, category: 'Grow & Support',
    image: '/images/services/ecommerce.jpg',
    description: 'Full-stack eCommerce platforms — storefront, inventory, payments, and logistics — engineered for scale and exceptional CX.',
    link: '/services/ecommerce-solutions',
    overview:
      'We build full-stack eCommerce that scales from first order to millions of SKUs — storefront, catalog and search, inventory and order orchestration, payments, logistics and last-mile — with headless and ERP connectors that let you change any layer without rebuilding.',
    features: [
      'Storefront and headless commerce architecture',
      'Catalog, search and digital-download flows',
      'Inventory, payment and order orchestration',
      'Logistics and last-mile integrations',
      'ERP connectors (Dynamics 365, SAP, nopCommerce)',
    ],
  },
  {
    id: 11, title: 'Digital Marketing',
    icon: Megaphone, category: 'Grow & Support',
    image: '/images/services/digital-marketing.jpg',
    description: 'Results-driven SEO, SEM, social media, and content strategies to amplify your brand and generate qualified leads.',
    link: '/services/digital-marketing',
    overview:
      'We run full-funnel digital marketing — technical SEO and content, paid search and social, and continuous CRO — instrumented end-to-end so every rupee is traceable to qualified leads and revenue.',
    features: [
      'Technical SEO and content strategy',
      'Paid search and social advertising',
      'Social media and brand amplification',
      'Conversion-rate optimization and landing pages',
      'Analytics, attribution and monthly reporting',
    ],
  },
  {
    id: 12, title: 'Data Center & Hosting',
    icon: Database, category: 'Grow & Support',
    image: '/images/services/data-center.jpg',
    description: 'Reliable colocation, managed hosting, and data center services with high-availability architecture and 24/7 monitoring.',
    link: '/services/data-center-hosting',
    overview:
      'Our managed data center (and 24/7 NOC) keeps mission-critical systems available around the clock — high-availability architectures with load balancing and failover, colocation and managed hosting, proactive patching, backup verification and monitoring that catches issues first.',
    features: [
      'Colocation and managed hosting services',
      'HA architecture with load balancing and failover',
      '24/7 NOC monitoring and alerting',
      'Proactive patching and backup verification',
      'Security, compliance and run-ahead scrutiny',
    ],
  },
];

export const serviceCategories = [
  { name: 'Build & Modernize', slug: 'build-modernize' },
  { name: 'Automate & Analyze', slug: 'automate-analyze' },
  { name: 'Grow & Support', slug: 'grow-support' },
];

export const outcomes = [
  {
    title: '20+ Years of Delivery Experience',
    icon: Cloud,
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=85',
    eyebrow: 'Experience',
    badge: '2 Decades Strong',
    chips: ['Proven Playbooks', 'Industry-Tested', 'Right the First Time'],
    description: 'Over two decades of successfully delivering IT solutions across industries — we know what works, what doesn\'t, and how to get it right the first time.',
  },
  {
    title: 'Global Reach, India-Native Collaboration',
    icon: Globe,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=85',
    eyebrow: 'Global Presence',
    badge: 'India + USA',
    chips: ['Bengaluru Delivery', 'Delaware, USA', 'Follow-the-Sun Support'],
    description: 'Headquartered in Bengaluru with a presence in Delaware, USA. We combine global delivery standards with the cost-efficiency of an India-native team across all time zones.',
  },
  {
    title: 'Quality, Passion & Ownership',
    icon: Heart,
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=85',
    eyebrow: 'Our Commitment',
    badge: 'Client-First',
    chips: ['End-to-End Ownership', 'Quality Assured', 'Long-Term Partners'],
    description: 'Every engagement is driven by quality, a passion for solving real business problems, and a culture of ownership — our clients\' outcomes are our outcomes.',
  },
];
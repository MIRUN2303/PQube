import {
  Cloud, Globe, Code2, Server, Workflow, BarChart3,
  LayoutDashboard, Sparkles, Smartphone, ShoppingCart,
  Megaphone, Database, Heart, Search, ClipboardCheck,
  Hammer, TrendingUp
} from 'lucide-react';

export const services = [
  {
    id: 1, title: 'Cloud Solutions',
    icon: Cloud, category: 'Build & Modernize',
    image: '/images/services/cloud-solutions.jpg',
    description: 'Scalable cloud infrastructure, migration, and managed services across AWS, Azure, and GCP to modernize your IT operations and reduce costs.',
    link: '/services/cloud-solutions',
  },
  {
    id: 2, title: 'Custom Web Solutions',
    icon: Globe, category: 'Build & Modernize',
    image: '/images/services/web-solutions.jpg',
    description: 'High-performance websites, portals, and SaaS platforms built with modern frameworks — responsive, secure, and conversion-optimized.',
    link: '/services/custom-web-solutions',
  },
  {
    id: 3, title: 'Custom Development',
    icon: Code2, category: 'Build & Modernize',
    image: '/images/services/custom-development.jpg',
    description: 'End-to-end custom software engineering — from requirements to deployment — tailored to your unique business logic and workflows.',
    link: '/services/custom-development',
  },
  {
    id: 4, title: 'IT Infrastructure Services',
    icon: Server, category: 'Build & Modernize',
    image: '/images/services/it-infrastructure.jpg',
    description: 'Design, deployment, and management of robust IT infrastructure — networks, servers, storage, and security — ensuring business continuity.',
    link: '/services/it-infrastructure',
  },
  {
    id: 5, title: 'Business Process Automation',
    icon: Workflow, category: 'Automate & Analyze',
    image: '/images/services/business-automation.jpg',
    description: 'Automate repetitive tasks, streamline approvals, and integrate disparate systems with intelligent BPA that drives operational efficiency.',
    link: '/services/business-process-automation',
  },
  {
    id: 6, title: 'Data Analytics',
    icon: BarChart3, category: 'Automate & Analyze',
    image: '/images/services/data-analytics.jpg',
    description: 'Transform raw data into actionable insights with dashboards, BI tools, predictive analytics, and data engineering pipelines.',
    link: '/services/data-analytics',
  },
  {
    id: 7, title: 'Dynamics 365 Solutions',
    icon: LayoutDashboard, category: 'Automate & Analyze',
    image: '/images/services/dynamics-365.jpg',
    description: 'Microsoft Dynamics 365 implementation and integration to unify your CRM, ERP, and business operations on one intelligent platform.',
    link: '/services/dynamics-365',
  },
  {
    id: 8, title: 'Digital Transformation',
    icon: Sparkles, category: 'Automate & Analyze',
    image: '/images/services/digital-transformation.png',
    description: 'Strategic consulting to digitize processes, modernize legacy systems, and unlock new revenue streams — including ePharmacy solutions.',
    link: '/services/digital-transformation', tag: 'ePharmacy Solutions',
  },
  {
    id: 9, title: 'Mobile Development',
    icon: Smartphone, category: 'Grow & Support',
    image: '/images/services/mobile-development.webp',
    description: 'Native and cross-platform mobile apps for iOS and Android — built for performance, usability, and seamless backend integration.',
    link: '/services/mobile-development',
  },
  {
    id: 10, title: 'Ecommerce Business Solutions',
    icon: ShoppingCart, category: 'Grow & Support',
    image: '/images/services/ecommerce.jpg',
    description: 'Full-stack eCommerce platforms — storefront, inventory, payments, and logistics — engineered for scale and exceptional CX.',
    link: '/services/ecommerce-solutions',
  },
  {
    id: 11, title: 'Digital Marketing',
    icon: Megaphone, category: 'Grow & Support',
    image: '/images/services/digital-marketing.jpg',
    description: 'Results-driven SEO, SEM, social media, and content strategies to amplify your brand presence and generate qualified leads.',
    link: '/services/digital-marketing',
  },
  {
    id: 12, title: 'Data Center & Hosting',
    icon: Database, category: 'Grow & Support',
    image: '/images/services/data-center.jpg',
    description: 'Reliable colocation, managed hosting, and data center services with high-availability architecture and 24/7 monitoring.',
    link: '/services/data-center-hosting',
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

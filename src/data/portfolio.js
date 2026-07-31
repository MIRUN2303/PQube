import {
  Smartphone, BarChart3, Cloud, LayoutDashboard, Server,
  Megaphone, ShoppingCart, Sparkles, Workflow,
} from 'lucide-react';

export const pqubeFormula = {
  quality: {
    label: 'Quality',
    tagline: 'Quality is measured as degree of excellence.',
    terms: [
      { letter: 'P', word: 'Patience' },
      { letter: 'P', word: 'Perseverance' },
      { letter: 'P', word: 'Perfection' },
    ],
    result: 'Q',
  },
  quantum: {
    label: 'Quantum',
    tagline: 'Built on honesty, integrity, loyalty, trust & transparency.',
    terms: [
      { letter: 'P', word: 'People' },
      { letter: 'P', word: 'Principles' },
      { letter: 'P', word: 'Prosperity' },
    ],
    result: 'Q',
  },
};

export const portfolioStats = [
  { value: '3+', label: 'Decades of hands-on experience' },
  { value: '360°', label: 'Technology Advisor & Implementation Partner' },
  { value: '$8M', label: 'Build, Operate & Transfer programs' },
  { value: '4.9/5', label: 'Average rating across 22 reviews' },
];

export const portfolioServices = [
  {
    id: 1,
    title: 'Mobile Development',
    icon: Smartphone,
    description: 'Native and cross-platform apps for iOS and Android — engineered for performance and seamless backend integration.',
    detail: 'We design and ship consumer-grade mobile experiences across iOS, Android and cross-platform stacks. From requirements and UX to App Store deployment, our engineers own the full lifecycle — offline-first architecture, push and analytics, secure API integration and a release pipeline that keeps your app current and crash-free in production.',
  },
  {
    id: 2,
    title: 'Data Analytics',
    icon: BarChart3,
    description: 'Dashboards, BI, predictive analytics and data engineering that turn raw data into decisions.',
    detail: 'We turn scattered raw data into a single source of truth. Our teams build data warehouses and pipelines, model business metrics and deliver interactive dashboards that leadership actually opens daily — with predictive analytics and ML forecasts layered on top to surface what is coming next, not just what already happened.',
  },
  {
    id: 3,
    title: 'Cloud Solutions',
    icon: Cloud,
    description: 'Cloud migration, infrastructure and managed services built for scale, security and uptime.',
    detail: 'From legacy on-premise estates to fully managed cloud, we architect, migrate and operate workloads across AWS, Azure and GCP. Every solution is built around cost governance, resilience and security hardening — with 24/7 monitoring, disaster recovery drills and an optimization cycle that keeps both your uptime and your cloud bill healthy.',
  },
  {
    id: 4,
    title: 'ERP & CRM',
    icon: LayoutDashboard,
    description: 'Enterprise resource planning and customer relationship platforms that unify business operations.',
    detail: 'We implement and integrate enterprise platforms — including Microsoft Dynamics 365 — to unify CRM, ERP and operations on one intelligent foundation. Process mapping, data migration, custom modules and end-user adoption programs ensure the system is not just deployed, but actually used to run the business end-to-end.',
  },
  {
    id: 5,
    title: 'Infrastructure & Hosting',
    icon: Server,
    description: 'Data center, hosting and infrastructure management with high-availability architecture.',
    detail: 'Our managed data center and hosting services keep mission-critical systems available around the clock. We design high-availability architectures with load balancing and failover, run colocation and managed hosting, and pair it with proactive patching, backup verification and 24/7 NOC monitoring that catches issues before your users ever feel them.',
  },
  {
    id: 6,
    title: 'Digital Marketing',
    icon: Megaphone,
    description: 'SEO, search engine marketing, social media and conversion optimization that grow revenue.',
    detail: 'We run full-funnel digital marketing — technical SEO and content, paid search and social, and continuous conversion-rate optimization. Campaigns are instrumented end-to-end, so every rupee and dollar is traceable to qualified leads and revenue, with creative testing and monthly reporting keeping growth compounding instead of plateauing.',
  },
  {
    id: 7,
    title: 'eCommerce Solutions',
    icon: ShoppingCart,
    description: 'Full-stack commerce platforms — storefront, inventory, payments and logistics — at scale.',
    detail: 'We build full-stack eCommerce platforms that scale from first order to millions of SKUs — storefront, catalog and search, inventory and order orchestration, payments and refunds, logistics and last-mile integration. Headless architecture and deep ERP connectors give you the freedom to change any layer without rebuilding the stack.',
  },
  {
    id: 8,
    title: 'Digital Transformations',
    icon: Sparkles,
    description: 'Strategic digitization, legacy modernization and new revenue models — from idea to adoption.',
    detail: 'We partner with leadership to digitize processes, modernize legacy systems and unlock new revenue models. The engagement starts with a discovery sprint that maps your current state, then moves through blueprint, phased delivery and change management — including specialty solutions such as ePharmacy — until the transformation is embedded in daily operations.',
  },
  {
    id: 9,
    title: 'Business Process Automation',
    icon: Workflow,
    description: 'Automation of repetitive work, approvals and integrations that drive operational efficiency.',
    detail: 'We automate the work that slows your teams down — repetitive data entry, document workflows, multi-step approvals and the glue between disconnected systems. Our BPA practice combines workflow platforms and custom integration with careful exception handling, so automation reduces manual effort and error rates without introducing fragile black boxes.',
  },
];

export const portfolioIndustries = [
  'Engineering / Manufacturing',
  'HealthCare / Pharma',
  'Infrastructure Management',
  'BFSI',
  'EduTech / AgriTech',
  'Hospitality',
];

export const journey = [
  { year: 'Jun 2013', title: 'LTS Formed in Bengaluru', detail: 'Founded in the Silicon Valley of India.' },
  { year: 'Mar 2019', title: 'Re-Branding LTS to PQube', detail: 'A fresh identity built on people, principles and prosperity.' },
  { year: 'Aug 2020', title: 'Marketplace Launch in India', detail: 'Entered the Indian eCommerce marketplace.' },
  { year: 'Oct 2020', title: 'Multi-Year Partner — Greenheck, USA', detail: 'Long-term engineering partnership with a global HVAC leader.' },
  { year: 'Feb 2022', title: 'Exclusive Tech Partner — MessageMyCustomer, Ireland', detail: 'Multi-tenant SaaS and conversational commerce expertise.' },
  { year: 'Oct 2023', title: 'PQube LLC in USA', detail: 'Expanded into Delaware, United States.' },
  { year: 'Dec 2023', title: 'Digital Transformation — ISSI Inc, USA', detail: 'Enterprise digital transformation solution delivery.' },
  { year: 'Oct 2024', title: 'Enterprise ERP Solution, USA', detail: 'Build, Operate & Transfer engagement valued at $8M.' },
];

export const team = [
  {
    name: 'Supreeth Bhat', role: 'Founder & CxO',
    email: 'SBhat@pqube.in', phone: '+91-97400-71565', photo: '/images/members/jpg/supreeth.jpg',
  },
  {
    name: 'Prasanth Rana', role: 'Executive Director',
    email: 'PRana@pqube.in', phone: '+91-98453-13662', photo: '/images/portfolio/team/prasanth.png',
  },
  {
    name: 'Puspa Latha', role: 'BDM & Operations',
    email: 'PLatha@pqube.in', phone: '+91-99721-94267', photo: '/images/members/jpg/pushpa.jpg',
  },
  {
    name: 'Supriya Innas', role: 'BDM & HR',
    email: 'SInnas@pqube.in', phone: '+91-74113-34721', photo: '/images/members/jpg/supriya.jpg',
  },
  {
    name: 'Madhav GK', role: 'Customer Success',
    email: 'Madhav.gk@pqube.in', phone: '+91-98865-41381', photo: '/images/members/jpg/madhav.jpg',
  },
];

export const accreditations = [
  { image: '/images/portfolio/accreditations/microsoft-gold.png', label: 'Microsoft Gold Partner — Application Development' },
  { image: '/images/portfolio/accreditations/iso-9001.png', label: 'ISO 9001:2015 Certified' },
  { image: '/images/portfolio/accreditations/silver-partner.png', label: 'Microsoft Silver Partner' },
  { image: '/images/portfolio/accreditations/duns.png', label: 'D-U-N-S Registered' },
  { image: '/images/portfolio/accreditations/clutch-awards.png', label: 'Clutch Top Company — Bengaluru, 2023' },
  { image: '/images/portfolio/accreditations/glassdoor.png', label: 'Glassdoor — 4.7 Rating' },
  { image: '/images/portfolio/accreditations/recommend.png', label: '100% Recommend · 100% Approve of CEO' },
];

export const mediaMentions = [
  { date: 'Oct 2023', title: '"The Most Trusted IT Managed Service Providers in India 2023"' },
  { date: 'May 2021', title: '"Your Swiftest Quality × Tech × Growth = Success Augmenters"' },
  { date: '2022', title: 'India 5000 — MSME' },
];

export const portfolioClients = [
  { name: 'Greenheck', file: 'greenheck.png' },
  { name: 'Novo Nordisk', file: 'novo-nordisk.png' },
  { name: 'MERSOL', file: 'mersol.png' },
  { name: 'Potential', file: 'potential.png' },
  { name: 'Helen O\'Grady International', file: 'helen-ogrady.png' },
  { name: 'Acropolo', file: 'acropolo.png' },
  { name: 'Burnishine Products', file: 'burnishine.png' },
  { name: 'ISSI', file: 'issi.png' },
  { name: 'Payemoji', file: 'payemoji.png' },
  { name: 'eBonoCom', file: 'ebonom.png' },
  { name: 'Good Feet', file: 'good-feet.png' },
  { name: 'PurSelect', file: 'purselect.png' },
  { name: 'WCO Mart', file: 'wcomart.png' },
  { name: 'Grand Slam Designs', file: 'grand-slam.png' },
  { name: 'ARA', file: 'ara.png' },
  { name: 'Brets', file: 'bret-solutions.png' },
  { name: 'TAG Heuer', file: 'tag-heuer.png' },
  { name: 'Jason Stone Injury Lawyers', file: 'jason-stone.png' },
  { name: 'Poly', file: 'poly.png' },
  { name: 'Acclaro', file: 'acclaro.png' },
  { name: 'GoldBuyers', file: 'goldbuyers.png' },
  { name: 'Great Notions', file: 'great-notions.png' },
  { name: 'Allstate', file: 'allstate.png' },
  { name: 'Fishman PR', file: 'fishman-pr.png' },
  { name: 'Liventus Inc.', file: 'liventus.png' },
  { name: 'ECS Financial', file: 'ecs-financial.png' },
  { name: 'Anngrant.com', file: 'anngrant.png' },
  { name: 'Freeganitha', file: 'freeganita.png' },
  { name: 'Designs.com', file: 'designs-com.png' },
  { name: 'Swift Prepaid Solutions', file: 'swift-prepaid.png' },
  { name: 'Hirsch', file: 'hirsch.png' },
  { name: 'Beacon Funding', file: 'beacon-funding.png' },
  { name: 'Basement Watchdog', file: 'basement-watchdog.png' },
  { name: 'Covenant Health', file: 'covenant-health.png' },
  { name: 'US Cellular', file: 'us-cellular.png' },
];

export const caseStudies = [
  {
    title: 'Embroidery eCommerce', industry: 'Retail', period: '2005 – 2019', team: '45+',
    description: 'B2B & B2C eCommerce platform handling 1.4 million SKUs, with deep integrations into Microsoft Dynamics 365 CE and SAP.',
  },
  {
    title: 'Manufacturing Cloud Migration', industry: 'Manufacturing', period: '2021 – ongoing', team: '29+',
    description: 'On-premise to cloud migration, leasing automation and data analytics for a global product manufacturer.',
  },
  {
    title: 'Leasing Automation & Analytics', industry: 'Leasing', period: '2013 – 2019', team: '47+',
    description: 'Leasing automation and data analytics platform modernizing asset financing operations end-to-end.',
  },
  {
    title: 'Health Care Mobile Apps', industry: 'Health Care', period: '2021 – ongoing', team: '21+',
    description: 'Mobile applications and a Power Apps-based Field Maintenance System for healthcare operations.',
  },
  {
    title: 'Online Coaching eLearning LMS', industry: 'BFSI', period: '2016 – AMC', team: '11',
    description: 'Learning management solution for online banking exam coaching, delivered as a managed service.',
  },
  {
    title: 'Digital Marketing Packages', industry: 'Marketing', period: '2019 – ongoing', team: '—',
    description: 'Custom tailored SEO, search engine marketing, social media and conversion optimization across Dubai, USA and India.',
  },
  {
    title: 'Multi-Tenant SaaS Conversational Commerce', industry: 'Retail Cloud', period: '2022 – ongoing', team: '23+',
    description: 'Exclusive technology partnership building a multi-tenant SaaS platform for conversational eCommerce.',
  },
  {
    title: 'Prepaid Visa / MasterCard Platform', industry: 'FinTech', period: '2005 – 2011', team: '79+',
    description: 'Legacy prepaid card platform — acquired by daVinci in 2014.',
  },
];

export const testimonials = [
  {
    quote: 'An extra bonus I\'m not expecting is that they even help with our UI/UX and make sure things are user-friendly!',
    rating: 5.0, date: 'Aug 17, 2022',
    case: 'eCommerce dev for pressroom product manufacturer',
  },
  {
    quote: 'I was most impressed with the drive and dedication their team had with regard to working to complete this project.',
    rating: 5.0, date: 'Aug 17, 2022',
    case: 'Web dev for eCommerce business',
  },
  {
    quote: 'They were easy to communicate with and very responsive to our needs.',
    rating: 5.0, date: 'Aug 16, 2022',
    case: 'eCommerce platform dev for embroidery supplies & design co',
  },
  {
    quote: 'PQube has the length and breadth of knowledge in almost all areas of IT solutions.',
    rating: 4.5, date: 'Sep 28, 2022',
    case: 'Learning management solution for training company',
  },
  {
    quote: 'The quality of the work they deliver for the money we\'re investing is top-notch.',
    rating: 5.0, date: 'Sep 13, 2022',
    case: 'Mobile app dev & maintenance for pharmaceutical company',
  },
  {
    quote: 'Their honesty was one of the first things that made us shortlist them.',
    rating: 5.0, date: 'Aug 16, 2022',
    case: 'Dev support for conversational commerce startup',
  },
];

export const reviewSummary = {
  total: 22, average: '4.9', ratingLabel: 'Average Review Rating', referralLabel: 'Average Referral Rating',
};

export const stackLogos = [
  { file: 'azure.png', name: 'Microsoft Azure' },
  { file: 'sap.png', name: 'SAP' },
  { file: 'dynamics-365.png', name: 'Dynamics 365' },
  { file: 'tableau.png', name: 'Tableau' },
  { file: 'power-bi.png', name: 'Power BI' },
  { file: 'power-apps.png', name: 'Power Apps' },
  { file: 'dataverse.png', name: 'Dataverse' },
  { file: 'power-automate.png', name: 'Power Automate' },
  { file: 'postgresql.png', name: 'PostgreSQL' },
  { file: 'nopcommerce.png', name: 'nopCommerce' },
  { file: 'html5.png', name: 'HTML5' },
  { file: 'asp-net.png', name: 'ASP.NET' },
  { file: 'commerce-server.png', name: 'Commerce Server' },
  { file: 'dynamics-crm.png', name: 'Dynamics CRM' },
  { file: 'silverlight.png', name: 'Silverlight' },
  { file: 'ios.png', name: 'iOS' },
  { file: 'ionic.png', name: 'Ionic' },
];

export const deckSlides = [
  { file: 'slide-01.jpg', label: 'Cover — Build People to Build Business' },
  { file: 'slide-02.jpg', label: 'What is PQube?' },
  { file: 'slide-03.jpg', label: 'Why PQube?' },
  { file: 'slide-04.jpg', label: 'Our Services' },
  { file: 'slide-05.jpg', label: 'PQube Journey' },
  { file: 'slide-06.jpg', label: 'Media' },
  { file: 'slide-07.jpg', label: 'Accreditations' },
  { file: 'slide-08.jpg', label: 'Our Team' },
  { file: 'slide-09.jpg', label: 'Our Clients' },
  { file: 'slide-10.jpg', label: 'Our Clients' },
  { file: 'slide-11.jpg', label: 'Testimonials' },
  { file: 'slide-12.jpg', label: 'Case Studies' },
  { file: 'slide-13.jpg', label: 'Case Studies' },
  { file: 'slide-14.jpg', label: 'Contact Us' },
];

export const contactInfo = {
  phone: '+91 97312 49009', phoneHref: 'tel:+919731249009',
  email: 'info@pqube.in', web: 'www.pqube.in',
  address: 'BTM Layout 2nd Stage, Bengaluru 560076',
};

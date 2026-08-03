import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSlideshow from './components/HeroSlideshow';
import TrustStrip from './components/TrustStrip';
import StatsStrip from './components/StatsStrip';
import WhyPQubeTabs from './components/WhyPQubeTabs';
import ServicesGrid from './components/ServicesGrid';
import ProcessTimeline from './components/ProcessTimeline';
import OutcomesTiles from './components/OutcomesTiles';
import ClientsMarquee from './components/ClientsMarquee';
import TestimonialsPlaceholder from './components/TestimonialsPlaceholder';
import InsightsGrid from './components/InsightsGrid';
import FAQAccordion from './components/FAQAccordion';
import ContactSection from './components/ContactSection';
import CertificationsStrip from './components/CertificationsStrip';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import CookieBanner from './components/CookieBanner';
import CursorFollower from './components/CursorFollower';
import RouteScrollTop from './components/RouteScrollTop';
import PlaceholderPage from './pages/PlaceholderPage';
import PressReleases from './pages/PressReleases';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import Clients from './pages/Clients';
import ClientStory from './pages/ClientStory';
import Insights from './pages/Insights';
import InsightArticle from './pages/InsightArticle';
import Contact from './pages/Contact';
import ServiceDetail from './pages/ServiceDetail';
import Services from './pages/Services';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <RouteScrollTop />
      <Header />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={
            <main>
              <HeroSlideshow />
              <TrustStrip />
              <StatsStrip />
              <WhyPQubeTabs />
              <ServicesGrid />
              <ProcessTimeline />
              <OutcomesTiles />
              <ClientsMarquee />
              <TestimonialsPlaceholder />
              <InsightsGrid />
              <FAQAccordion />
              <ContactSection />
            </main>
          } />
          <Route path="/about" element={<About />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/press-releases" element={<PressReleases />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/:slug" element={<ClientStory />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightArticle />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
        </Routes>
      </div>

      <CertificationsStrip />
      <Footer />

      <CursorFollower />
      <WhatsAppButton />
      <ScrollToTopButton />
      <CookieBanner />
    </div>
  );
}

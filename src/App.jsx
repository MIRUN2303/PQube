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
import PlaceholderPage from './pages/PlaceholderPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
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
          <Route path="/about" element={<PlaceholderPage title="About Us" />} />
          <Route path="/portfolio" element={<PlaceholderPage title="Portfolio" />} />
          <Route path="/press-releases" element={<PlaceholderPage title="Press Releases" />} />
          <Route path="/clients" element={<PlaceholderPage title="Our Clients" />} />
          <Route path="/clients/:slug" element={<PlaceholderPage title="Client" />} />
          <Route path="/insights" element={<PlaceholderPage title="Insights" />} />
          <Route path="/insights/:slug" element={<PlaceholderPage title="Article" />} />
          <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
          <Route path="/services/:slug" element={<PlaceholderPage title="Service" />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
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

import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import StatsStrip from '../components/StatsStrip';
import WhyPQubeTabs from '../components/WhyPQubeTabs';
import ServicesGrid from '../components/ServicesGrid';
import ProcessSteps from '../components/ProcessSteps';
import OutcomesTiles from '../components/OutcomesTiles';
import ClientsMarquee from '../components/ClientsMarquee';
import TestimonialsPlaceholder from '../components/TestimonialsPlaceholder';
import InsightsGrid from '../components/InsightsGrid';
import FAQAccordion from '../components/FAQAccordion';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <StatsStrip />
      <WhyPQubeTabs />
      <ServicesGrid />
      <ProcessSteps />
      <OutcomesTiles />
      <ClientsMarquee />
      <TestimonialsPlaceholder />
      <InsightsGrid />
      <FAQAccordion />
      <ContactSection />
    </main>
  );
}

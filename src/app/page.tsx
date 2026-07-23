import HeroSection from "@/components/sections/HeroSection";
import CoreValuesModule from "@/components/sections/CoreValuesModule";
import ServicesSection from "@/components/sections/ServicesSection";
import { ClientsLogoSection, WhyPqubeSection, TestimonialsSection } from "@/components/sections/ClientsSection";
import BlogContactSection from "@/components/sections/BlogContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CoreValuesModule />
      <ServicesSection />
      <ClientsLogoSection />
      <WhyPqubeSection />
      <TestimonialsSection />
      <BlogContactSection />
    </>
  );
}

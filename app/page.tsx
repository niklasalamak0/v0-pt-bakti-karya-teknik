import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { WorkflowSection } from "@/components/workflow-section"
import { PricingSection } from "@/components/pricing-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { BrandPartnersSection } from "@/components/brand-partners-section"
import { ContactSection } from "@/components/contact-form"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <WorkflowSection />
      <PricingSection />
      <TestimonialsSection />
      <BrandPartnersSection />
      <ContactSection />
      <Footer />
    </main>
  )
}

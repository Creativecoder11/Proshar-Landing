import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Header';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import { Hero } from '@/components/sections/HeroSection';
import { MarqueeLogo } from '@/components/sections/MarqueeLogo';

const AboutSection = dynamic(
  () => import('@/components/sections/AboutSection'),
  { ssr: true }
);

const BenefitsSection = dynamic(
  () => import('@/components/sections/Benefits'),
  { ssr: true }
);

const DesignShowcase = dynamic(
  () => import('@/components/sections/Design'),
  { ssr: true }
);

const InterfaceFeatures = dynamic(
  () => import('@/components/sections/Works'),
  { ssr: true }
);

const SocialProofSection = dynamic(
  () => import('@/components/sections/Testimonials'),
  { ssr: true }
);

const FAQSection = dynamic(
  () => import('@/components/sections/FAQSection'),
  { ssr: true }
);

const CTASection = dynamic(
  () => import('@/components/sections/CTASection'),
  { ssr: true }
);

const Footer = dynamic(
  () => import('@/components/sections/Footer'),
  { ssr: true }
);

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeLogo />
      <FeaturesGrid />
      <AboutSection />
      <BenefitsSection />
      <DesignShowcase />
      <InterfaceFeatures />
      <SocialProofSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}

import dynamic from 'next/dynamic';
import { Navbar } from '@/components/Header';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import { Hero } from '@/components/sections/HeroSection';
import { CompanyLogos } from '@/components/sections/CompanyLogo';

const StatsSection = dynamic(
  () => import('@/components/sections/StatsSection'),
  { ssr: true }
);

const FeatureDetailsSection = dynamic(
  () => import('@/components/sections/FeatureDetailsSection'),
  { ssr: true }
);

const DesignShowcase = dynamic(
  () => import('@/components/sections/DesignShowcase'),
  { ssr: true }
);

const InterfaceFeatures = dynamic(
  () => import('@/components/sections/InterfaceFeatures'),
  { ssr: true }
);

const SocialProofSection = dynamic(
  () => import('@/components/sections/SocialProofSection'),
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
      <CompanyLogos/>
      <FeaturesGrid />
      <StatsSection />
      <FeatureDetailsSection />
      <DesignShowcase />
      <InterfaceFeatures />
      <SocialProofSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  );
}

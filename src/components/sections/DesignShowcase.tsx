'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Monitor, Palette } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { GradientText } from '@/components/ui/GradientText';
import Image from 'next/image';

const HIGHLIGHTS = [
  {
    icon: LayoutDashboard,
    title: 'Intuitive Dashboard',
    description: 'Clean, organized interface that gets you to insights faster.',
    features: ['Automated calculations', 'Quick data entry', 'Instant report generation'],
  },
  {
    icon: Monitor,
    title: 'Responsive Layout',
    description: 'Works seamlessly on desktop, tablet, and mobile.',
    features: ['Automated calculations', 'Quick data entry', 'Instant report generation'],
  },
  {
    icon: Palette,
    title: 'Customizable Themes',
    description: 'Adapt the interface to match your pharmacy branding.',
    features: ['Automated calculations', 'Quick data entry', 'Instant report generation'],
  },
  {
    icon: Palette,
    title: 'Customizable Themes',
    description: 'Adapt the interface to match your pharmacy branding.',
    features: ['Automated calculations', 'Quick data entry', 'Instant report generation'],
  },
];

export default function DesignShowcase() {
  return (
    <section id="blog" className="py-24">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="">
            <div className="flex justify-start mb-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                <span className="text-lg">🍵</span>
                <span className="text-white text-sm font-medium tracking-wide">
                  About Proshar
                </span>
              </div>
            </div>

            <h1 className="text-white mb-6 leading-tight">
              <div className="text-3xl md:text-6xl font-bold mb-2">Smarter B2B </div>
              <div className="text-3xl md:text-6xl font-semibold">
                Medicine{' '}
                <span className="text-orange-600 italic font-playfair">Platform</span>
              </div>
            </h1>

            <p className="text-white text-base md:text-xl max-w-4xl mx-auto">
              Proshar simplifies B2B medicine distribution, connecting retailers with
              wholesalers, streamlining orders, inventory management, and financial
              tracking through a unified platform.
            </p>
            {/* Features List */}
            <ul className="space-y-3 mt-6">
              {HIGHLIGHTS[0].features.map((feature, featureIndex) => (
                <motion.li
                  key={feature}
                  className="grid grid-cols-1 md:grid-cols-2 text-white group/item"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: featureIndex * 0.05,
                    duration: 0.5,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div className=" text-orange-500 group-hover/item:text-orange-400 transition-colors duration-200">
                      <Image
                        src="/assets/icon/righticon.svg"
                        alt="Check Icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <span className="text-sm md:text-base">{feature}</span>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="relative w-full mx-auto ">
            {/* Glow behind image */}
            <div className="absolute -inset-1 bg-gradient-to-t from-indigo-500/10 to-transparent rounded-[20px] blur-xl -z-10" />

            {/* Main Glass Container */}
            <div className="interactive-card relative rounded-[20px] border border-white/10 shadow-2xl bg-white/10 backdrop-blur-sm p-5">
              {/* Inner Image */}
              <div className="relative rounded-xl overflow-hidden bg-[#0B0B0F]">
                <Image
                  src="/assets/impact-image.svg"
                  alt="Dashboard Interface"
                  width={1160}
                  height={925}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { FEATURES } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

/**
 * Icon key → SVG path
 * (FEATURES.icon must match these keys)
 */
const ICON_MAP: Record<string, string> = {
  analytics: '/assets/icon/features1.svg',
  orderprocessing: '/assets/icon/features2.svg',
  inventory: '/assets/icon/features3.svg',
  monthlyreports: '/assets/icon/features4.svg',
  wholesaler: '/assets/icon/features5.svg',
  ledger: '/assets/icon/features6.svg',
};

export default function FeaturesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, cardsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-24">
      <Container>
        {/* Header */}
        <div className="max-w-7xl w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
              <span className="text-lg">🍵</span>
              <span className="text-white text-sm font-medium tracking-wide">
                Practical Tools
              </span>
            </div>
          </div>

          <h1 className="text-white mb-6 leading-tight">
            <div className="text-3xl md:text-6xl font-bold mb-2">
              The Backbone of
            </div>
            <div className="text-3xl md:text-6xl font-semibold">
              <span className="text-orange-600 italic font-playfair">
                Your Business
              </span>
            </div>
          </h1>

          <p className="text-white/80 text-base md:text-xl max-w-4xl mx-auto">
            Practical tools designed for retailers who keep products accessible in every lane.
          </p>
        </div>

        {/* Grid */}
        <div
          ref={cardsRef}
          className="mx-auto mt-16 grid  grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feature) => {
            const iconSrc = ICON_MAP[feature.icon];

            return (
              <motion.div
                key={feature.title}
                className="feature-card group"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {/* Card with Navbar Glass Effect */}
                <div 
                  className="glass-card h-full p-6 rounded-2xl relative overflow-hidden"
                  style={{
                    background: 'rgba(26, 26, 26, 0.5)',
                    backdropFilter: 'blur(24px) saturate(150%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(150%)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    boxShadow: `
                      inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
                      inset 1px 2px 0px -1px rgba(255, 255, 255, 0.15),
                      inset -1px -1px 0px -0.5px rgba(255, 255, 255, 0.1),
                      0px 4px 20px 0px rgba(0, 0, 0, 0.15),
                      0px 1px 3px 0px rgba(0, 0, 0, 0.1)
                    `,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >

                  {/* Icon */}
                  <div className="relative mb-12 inline-flex rounded-xl z-10">
                    <Image
                      src={iconSrc}
                      alt={feature.title}
                      width={68}
                      height={68}
                      className="h-16 w-16 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-semibold text-white mb-4">
                      {feature.title}
                    </h3>

                    <div className="h-[2px] w-25 bg-[#808080] rounded-full mb-4" />

                    <p className="text-white leading-relaxed text-[16px]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
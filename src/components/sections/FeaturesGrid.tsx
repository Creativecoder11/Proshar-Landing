'use client';

import { useEffect, useRef } from 'react';
import { easeInOut, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { FEATURES } from '@/lib/constants';
import TextAnimation from '../ui/TextAnimation';

gsap.registerPlugin(ScrollTrigger);

const ICON_MAP: Record<string, string> = {
  analytics: '/assets/icon/features1.svg',
  orderprocessing: '/assets/icon/features2.svg',
  inventory: '/assets/icon/features3.svg',
  monthlyreports: '/assets/icon/features4.svg',
  wholesaler: '/assets/icon/features5.svg',
  ledger: '/assets/icon/features6.svg',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: easeInOut,
    },
  },
};

const buttonGroup = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1.2,
    },
  },
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
    <section ref={sectionRef} id="features" className="bg-[#070808] py-16 md:py-25">
      <Container>
        {/* Header */}
        <div className="max-w-7xl w-full text-center">
          <div className="flex justify-center mb-4">
            <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.6 }}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                <span className="text-lg">
                  <Image
                    src="/assets/icon/badgeicon1.svg"
                    alt="Star Icon"
                    width={20}
                    height={20}
                  />
                </span>
                <span className="text-white text-sm font-medium tracking-wide">
                  Powerful Features
                </span>
              </div>
            </motion.div>
          </div>

          <TextAnimation type="words" delay={1} duration={1.5}>
            <div className="text-white mb-3 leading-tight">
              <h1 className="text-4xl md:text-6xl font-semibold md:leading-17 ">Everything You <br />
                Need to Run {' '}
                <span className="text-orange-600 italic font-playfair">
                  Your Pharmacy
                </span>
              </h1>
            </div>
          </TextAnimation>

          <TextAnimation type='lines' delay={1} duration={1.5}>
            <p className="text-white/80 text-base md:text-xl max-w-4xl mx-auto">
              Comprehensive tools designed specifically for pharmacy management in Bangladesh.
            </p>
          </TextAnimation>
        </div>

        {/* Grid */}
        <div
          ref={cardsRef}
          className="mx-auto mt-8 md:mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
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
                  className="glass-card h-full p-4 md:p-6 rounded-2xl relative overflow-hidden"
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
                  <div className="relative mb-8 md:mb-12 inline-flex rounded-xl z-10">
                    <Image
                      src={iconSrc}
                      alt={feature.title}
                      width={68}
                      height={68}
                      className="w-12 md:w-16 h-12 md:h-16 transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 md:mb-4">
                      {feature.title}
                    </h3>

                    <div className="h-0.5 w-25 bg-[#808080] rounded-full mb-3 md:mb-4" />

                    <p className="text-white leading-relaxed text-sm md:text-base">
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

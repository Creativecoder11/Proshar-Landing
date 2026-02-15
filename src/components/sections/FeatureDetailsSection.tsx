'use client';

import { useEffect, useRef } from 'react';
import { easeInOut, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, TrendingUp, Shield, Wallet } from 'lucide-react';
import Image from 'next/image';
import TextAnimation from '../ui/TextAnimation';

gsap.registerPlugin(ScrollTrigger);

const BENEFITS = [
  {
    icon: '/assets/icon/benefits4.svg',
    title: 'Simplified Sourcing',
    metric: 'Save Time Every Week',
    description:
      "Sourcing shouldn't be time-consuming. From discovery to delivery, handle everything in one intuitive dashboard.",
    features: ['Easy reordering', 'Quick entry', 'Instant updates'],
  },
  {
    icon: '/assets/icon/benefits3.svg',
    title: 'Fair Margins',
    metric: 'Grow Your Business',
    description:
      'Stop overpaying for stock. Access competitive rates that let you earn a fair profit on every product you sell.',
    features: ['Competitive pricing', 'Reduced costs', 'Better buying'],
  },
  {
    icon: '/assets/icon/benefits2.svg',
    title: 'Reliable Delivery',
    metric: 'On-Time Arrival',
    description:
      'We deliver products directly to you. Track every shipment from the warehouse to your shelf with precision.',
    features: ['Real-time tracking', 'Secure handling', 'Full visibility'],
  },
  {
    icon: '/assets/icon/benefits1.svg',
    title: 'Total Control',
    metric: 'Manage It All',
    description:
      'Manage all your supplier invoices, payments, and orders in one place. Simplify your back-office and focus on selling.',
    features: ['Order dashboard', 'Unified payments', 'Smart reminders'],
  },
];

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

export default function BenefitsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.benefit-card');

      gsap.from(cards, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-7xl w-full text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                <span className="text-lg">
                  <Image
                    src="/assets/icon/badgeicon3.svg"
                    alt="Star Icon"
                    width={20}
                    height={20}
                  />
                </span>
                <span className="text-white text-sm font-medium tracking-wide">
                  Powerful Features
                </span>
              </div>
            </div>
          </motion.div>
          <TextAnimation type="words" delay={1} duration={1}>
            <h1 className="text-white mb-6 leading-tight">
              <div className="text-3xl md:text-6xl font-bold mb-2">Everything You</div>
              <div className="text-3xl md:text-6xl font-semibold">
                Need to Run{' '}
                <span className="text-orange-600 italic font-playfair">
                  Your Pharmacy
                </span>
              </div>
            </h1>
          </TextAnimation>
          <TextAnimation type="lines" delay={1} duration={1}>
            <p className="text-white/80 text-base md:text-xl max-w-4xl mx-auto">
              Comprehensive tools designed specifically for pharmacy management in
              Bangladesh
            </p>
          </TextAnimation>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 max-w-7xl mt-12 mx-auto">
          {BENEFITS.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="benefit-card group">
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
                  <div className="relative z-10">
                    <div className="flex">
                      <div>
                        {/* Icon */}
                        <div className="inline-flex items-center justify-center rounded-xl">
                          <Image
                            src={benefit.icon}
                            alt={benefit.title}
                            width={68}
                            height={24}
                          />
                        </div>
                      </div>

                      <div className="ml-4">
                        {/* Title */}
                        <h3 className="text-xl md:text-2xl font-semibold text-white mb-2 tracking-tight">
                          {benefit.title}
                        </h3>

                        {/* Metric */}
                        <div className="text-base md:text-lg font-semibold text-orange-500">
                          {benefit.metric}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white text-sm md:text-base leading-relaxed mb-6">
                      {benefit.description}
                    </p>

                    {/* Features List */}
                    <ul className="space-y-3">
                      {benefit.features.map((feature, featureIndex) => (
                        <motion.li
                          key={feature}
                          className="flex items-start gap-3 text-white group/item"
                          initial={{ opacity: 0, x: -10 }}
                          animate={
                            isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                          }
                          transition={{
                            delay: index * 0.1 + featureIndex * 0.05,
                            duration: 0.5,
                          }}
                        >
                          <div className="flex-shrink-0 mt-1 text-orange-500 group-hover/item:text-orange-400 transition-colors duration-200">
                            <Image
                              src="/assets/icon/righticon.svg"
                              alt="Check Icon"
                              width={16}
                              height={16}
                            />
                          </div>
                          <span className="text-sm md:text-base">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

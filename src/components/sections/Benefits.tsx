'use client';

import { easeInOut, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useCallback, useEffect } from 'react';
import TextAnimation from '../ui/TextAnimation';

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

// ---------------------------------------------------------------------------
// SpotlightCard — jump-free version
//
// The jump happened because:
//   1. The gradient background defaulted to position (0,0) — top-left corner.
//   2. The CSS `transition: opacity` started animating BEFORE the gradient was
//      repainted at the real cursor position, so for ~1 frame the glow flashed
//      from the wrong place.
//
// Fix:
//   • On enter  → write the gradient first (no transition), then on the very
//     next rAF restore the opacity transition and set opacity to 1.
//   • On move   → use rAF so gradient updates are always in sync with the
//     browser paint cycle — no mid-frame jumps.
//   • `inside` ref guards against race conditions when the cursor leaves
//     before the rAF fires.
// ---------------------------------------------------------------------------
interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  hotspotColor?: string;
  haloColor?: string;
}

function SpotlightCard({
  children,
  className = '',
  hotspotColor = 'rgba(234,88,12,0.24)',
  haloColor = 'rgba(251,146,60,0.08)',
}: SpotlightCardProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const inside = useRef(false);

  const writeGradient = useCallback((x: number, y: number) => {
    if (!overlayRef.current) return;
    overlayRef.current.style.background = [
      `radial-gradient(220px circle at ${x}px ${y}px, ${hotspotColor}, transparent 70%)`,
      `radial-gradient(600px circle at ${x}px ${y}px, ${haloColor}, transparent 70%)`,
    ].join(', ');
  }, [hotspotColor, haloColor]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    pos.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (inside.current) writeGradient(pos.current.x, pos.current.y);
    });
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    inside.current = true;
    const el = overlayRef.current;
    if (!el) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pos.current = { x, y };

    // 1. Snap gradient to real cursor position — no transition yet
    el.style.transition = 'none';
    writeGradient(x, y);

    // 2. Next paint: re-enable fade and reveal
    requestAnimationFrame(() => {
      if (!inside.current) return;
      el.style.transition = 'opacity 0.35s ease';
      el.style.opacity = '1';
    });
  };

  const handleMouseLeave = () => {
    inside.current = false;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const el = overlayRef.current;
    if (!el) return;
    el.style.transition = 'opacity 0.4s ease';
    el.style.opacity = '0';
  };

  useEffect(() => () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl ${className}`}
    >
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl"
        style={{ opacity: 0 }}
      />
      {children}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Animations
// ---------------------------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 1.5, ease: easeInOut } },
};

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.05 } },
};

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const featureListVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const featureItemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: easeInOut } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function Benefits() {
  return (
    <section id="benefits" className="relative py-16 md:py-25 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-0">

        <motion.div
          className="w-full"
          variants={sectionVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Badge */}
          <motion.div variants={fadeUp} className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
              <Image src="/assets/icon/badgeicon3.svg" alt="Star Icon" width={20} height={20} />
              <span className="text-white text-sm font-medium tracking-wide">Benefits</span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp} className="text-center">
            <TextAnimation type="words" delay={0.1} duration={1}>
              <div className="text-white mb-3 md:mb-6 leading-tight">
                <h1 className="text-4xl md:text-6xl font-bold">
                  Transform How You <br />
                  Manage Your{' '}
                  <span className="text-orange-600 italic font-playfair">Pharmacy</span>
                </h1>
              </div>
            </TextAnimation>
          </motion.div>

          {/* Paragraph */}
          <motion.div variants={fadeUp} className="text-center">
            <TextAnimation type="lines" delay={0.1} duration={1}>
              <p className="text-white/80 text-base md:text-xl max-w-4xl mx-auto">
                Comprehensive tools designed specifically for pharmacy management in Bangladesh.
              </p>
            </TextAnimation>
          </motion.div>

          {/* Grid */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 max-w-7xl mt-8 md:mt-12 mx-auto"
            variants={gridVariants}
          >
            {BENEFITS.map((benefit) => (
              <motion.div
                key={benefit.title}
                className="benefit-card group"
                variants={cardVariants}
              >
                <SpotlightCard className="h-full">
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
                    <div className="relative z-10">
                      <div className="flex mb-2 md:mb-3">
                        <div className="inline-flex items-center justify-center rounded-xl">
                          <Image
                            src={benefit.icon}
                            alt={benefit.title}
                            width={24}
                            height={24}
                            className="object-contain w-13 h-13 md:w-17 md:h-17"
                          />
                        </div>
                        <div className="ml-4">
                          <h3 className="text-xl md:text-2xl font-semibold text-white mb-1 md:mb-2 tracking-tight">
                            {benefit.title}
                          </h3>
                          <div className="text-base md:text-lg font-semibold text-orange-500">
                            {benefit.metric}
                          </div>
                        </div>
                      </div>

                      <p className="text-white text-sm md:text-base leading-relaxed mb-3 md:mb-6">
                        {benefit.description}
                      </p>

                      <motion.ul className="space-y-1.5 md:space-y-3" variants={featureListVariants}>
                        {benefit.features.map((feature) => (
                          <motion.li
                            key={feature}
                            className="flex items-start gap-3 text-white group/item"
                            variants={featureItemVariants}
                          >
                            <div className="shrink-0 mt-1 text-orange-500 group-hover/item:text-orange-400 transition-colors duration-200">
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
                      </motion.ul>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
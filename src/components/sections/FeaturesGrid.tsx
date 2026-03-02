'use client';

import { easeInOut, motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useCallback, useRef } from 'react';

import { Container } from '@/components/ui/Container';
import { FEATURES } from '@/lib/constants';
import TextAnimation from '../ui/TextAnimation';

const ICON_MAP: Record<string, string> = {
  analytics: '/assets/icon/features1.svg',
  orderprocessing: '/assets/icon/features2.svg',
  inventory: '/assets/icon/features3.svg',
  monthlyreports: '/assets/icon/features4.svg',
  wholesaler: '/assets/icon/features5.svg',
  ledger: '/assets/icon/features6.svg',
};

// ---------------------------------------------------------------------------
// SpotlightCard — jump-free version (same as Benefits)
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

    // 1. Snap gradient to cursor — no transition yet
    el.style.transition = 'none';
    writeGradient(x, y);

    // 2. Next paint: restore fade and reveal
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
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.5, ease: easeInOut },
  },
};

const sectionVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.05 } },
};

const gridContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// ---------------------------------------------------------------------------
// FeatureCard
// ---------------------------------------------------------------------------
function FeatureCard({ feature }: { feature: typeof FEATURES[0] }) {
  const iconSrc = ICON_MAP[feature.icon];

  return (
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
      <div className="relative mb-8 md:mb-12 inline-flex rounded-xl z-10">
        <Image
          src={iconSrc}
          alt={feature.title}
          width={68}
          height={68}
          className="w-12 md:w-16 h-12 md:h-16 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

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
  );
}

// ---------------------------------------------------------------------------
// Mobile Carousel
// ---------------------------------------------------------------------------
function MobileCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0, scale: 0.95 }),
    center: () => ({ x: 0, opacity: 1, scale: 1 }),
    exit: (dir: number) => ({ x: dir < 0 ? 200 : -200, opacity: 0, scale: 0.95 }),
  };

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return FEATURES.length - 1;
      if (next >= FEATURES.length) return 0;
      return next;
    });
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => paginate(1), 4000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, paginate]);

  return (
    <div className="md:hidden mt-6">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="relative h-[280px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: 'spring', stiffness: 200, damping: 25 },
                opacity: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
                scale: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
              }}
              className="absolute w-full px-1"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) paginate(1);
                else if (info.offset.x > 80) paginate(-1);
              }}
            >
              <SpotlightCard className="feature-card group h-full">
                <FeatureCard feature={FEATURES[currentIndex]} />
              </SpotlightCard>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center gap-1.5 mt-3">
          {FEATURES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ease-out ${index === currentIndex
                  ? 'bg-orange-600 w-5'
                  : 'bg-white/25 w-1.5 hover:bg-white/45'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <p className="text-center text-white/35 text-[10px] mt-2 tracking-wide">
          Swipe to explore
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Desktop Grid
// ---------------------------------------------------------------------------
function DesktopGrid() {
  return (
    <motion.div
      className="hidden md:grid mx-auto mt-8 md:mt-12 grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      variants={gridContainerVariants}
    >
      {FEATURES.map((feature) => (
        <motion.div
          key={feature.title}
          variants={cardVariants}
          whileHover={{ y: -6, transition: { duration: 0.2 } }}
        >
          <SpotlightCard className="feature-card group h-full">
            <FeatureCard feature={feature} />
          </SpotlightCard>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
export default function FeaturesGrid() {
  return (
    <section id="features" className="bg-[#070808] py-16 md:py-25">
      <Container>
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
              <Image
                src="/assets/icon/badgeicon1.svg"
                alt="Star Icon"
                width={20}
                height={20}
              />
              <span className="text-white text-sm font-medium tracking-wide">
                Powerful Features
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div variants={fadeUp} className="text-center">
            <TextAnimation type="words" delay={0.1} duration={1.5}>
              <div className="text-white mb-3 leading-tight">
                <h1 className="text-4xl md:text-6xl font-semibold md:leading-17">
                  Everything You <br />
                  Need to Run{' '}
                  <span className="text-orange-600 italic font-playfair">
                    Your Pharmacy
                  </span>
                </h1>
              </div>
            </TextAnimation>
          </motion.div>

          {/* Paragraph */}
          <motion.div variants={fadeUp} className="text-center">
            <TextAnimation type="lines" delay={0.1} duration={1.5}>
              <p className="text-white/80 text-base md:text-xl max-w-4xl mx-auto">
                Comprehensive tools designed specifically for pharmacy management in Bangladesh.
              </p>
            </TextAnimation>
          </motion.div>

          {/* Cards */}
          <MobileCarousel />
          <DesktopGrid />
        </motion.div>
      </Container>
    </section>
  );
}
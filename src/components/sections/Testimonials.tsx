'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { TESTIMONIALS } from '@/lib/constants';
import Image from 'next/image';
import { fadeInUp } from '@/lib/utils';

interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
}

const StatCard = ({ value, label, suffix = '' }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const targetValue = parseInt(value, 10);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const steps = 100;
    const increment = Math.max(1, Math.floor(targetValue / steps));
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, targetValue]);

  return (
    <div ref={ref}>
      <div className="text-2xl md:text-5xl font-semibold text-white mb-1 md:mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm md:text-lg text-white">{label}</div>
    </div>
  );
};

const glassStyle: React.CSSProperties = {
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
};

export default function Testimonials() {
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-150px' });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const visibleCount = isMobile ? 1 : 3;
  const total = TESTIMONIALS.length;

  // Clone array: [last N] + [originals] + [first N]
  const cloned = [
    ...TESTIMONIALS.slice(-visibleCount),
    ...TESTIMONIALS,
    ...TESTIMONIALS.slice(0, visibleCount),
  ];

  // rawIndex starts at visibleCount = pointing at first real slide
  const [rawIndex, setRawIndex] = useState(visibleCount);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Reset position on resize
  useEffect(() => {
    setShouldAnimate(false);
    setRawIndex(visibleCount);
  }, [visibleCount]);

  // Calculate px offset: (containerWidth / visibleCount) * rawIndex
  const getOffset = () => {
    const container = trackRef.current;
    if (!container) return 0;
    const cardWidth = container.offsetWidth / visibleCount;
    return -(rawIndex * cardWidth);
  };

  const [offsetPx, setOffsetPx] = useState(0);

  // Recalculate offset whenever rawIndex or visibleCount changes
  useEffect(() => {
    const container = trackRef.current;
    if (!container) return;
    const cardWidth = container.offsetWidth / visibleCount;
    setOffsetPx(-(rawIndex * cardWidth));
  }, [rawIndex, visibleCount]);

  // Also recalculate on window resize
  useEffect(() => {
    const recalc = () => {
      const container = trackRef.current;
      if (!container) return;
      const cardWidth = container.offsetWidth / visibleCount;
      setOffsetPx(-(rawIndex * cardWidth));
    };
    window.addEventListener('resize', recalc);
    return () => window.removeEventListener('resize', recalc);
  }, [rawIndex, visibleCount]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShouldAnimate(true);
    setRawIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setShouldAnimate(true);
    setRawIndex((prev) => prev - 1);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
    // Slid into right clones → jump back to first real
    if (rawIndex >= total + visibleCount) {
      setShouldAnimate(false);
      setRawIndex(visibleCount);
    }
    // Slid into left clones → jump back to last real
    if (rawIndex < visibleCount) {
      setShouldAnimate(false);
      setRawIndex(total + visibleCount - 1);
    }
  };

  return (
    <section
      id="testimonials"
      className="py-16 md:py-25 relative"
      style={{
        background: `linear-gradient(270deg, rgba(255, 255, 255, 0) -20%, rgba(19, 19, 19, 0.04) 75.76%, rgba(255, 255, 255, 0) 123.64%)`,
        backdropFilter: 'blur(11.52px)',
        WebkitBackdropFilter: 'blur(11.52px)',
      }}
    >
      <Container>
        {/* Heading */}
        <div className="max-w-7xl w-full text-center">
          <div className="flex justify-center mb-2 md:mb-4">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                <Image src="/assets/icon/badgeicon6.svg" alt="Check Icon" width={16} height={16} />
                <span className="text-white text-sm font-medium tracking-wide">Testimonials</span>
              </div>
            </motion.div>
          </div>

          <h1 className="text-white mb-6 leading-tight">
            <div className="text-4xl md:text-6xl font-bold mb-2">Trusted by Growing</div>
            <div className="text-4xl md:text-6xl font-bold">
              Healthcare
              <span className="text-orange-600 italic font-playfair"> Partners</span>
            </div>
          </h1>
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="mx-auto mt-4 md:mt-16 max-w-5xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { value: '1000', label: 'Active Pharmacies', suffix: '+' },
              { value: '50', label: 'Transactions/Day', suffix: 'K+' },
              { value: '4', label: 'Customer Rating', suffix: '.9/5' },
              { value: '2', label: 'Support Available', suffix: '4/7' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                }}
              >
                <StatCard {...stat} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Infinite slider */}
        <div className="mx-auto mt-20 max-w-7xl">
          {/* overflow-hidden clips the cloned slides outside the viewport */}
          <div ref={trackRef} className="relative overflow-hidden w-full">
            <motion.div
              className="flex"
              animate={{ x: offsetPx }}
              transition={
                shouldAnimate
                  ? { duration: 0.5, ease: 'easeInOut' }
                  : { duration: 0 }
              }
              onAnimationComplete={handleAnimationComplete}
              style={{ willChange: 'transform' }}
            >
              {cloned.map((testimonial, index) => (
                <div
                  key={index}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / visibleCount}%` }}
                >
                  <Card
                    variant="glow"
                    className="glass-card h-full p-5 rounded-2xl relative overflow-hidden"
                    style={{ ...glassStyle, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
                  >
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    <p className="mb-6 text-zinc-300 text-sm md:text-base">{testimonial.quote}</p>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/30 text-sm font-semibold">
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <span>{testimonial.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium text-white">{testimonial.name}</div>
                        <div className="text-sm text-zinc-400">{testimonial.role}</div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Controls — always active, no disabled */}
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={handlePrev}
              className="rounded-full p-3 text-zinc-400 hover:bg-orange-600 hover:text-white cursor-pointer transition-all duration-300"
              style={{ ...glassStyle, transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" className="h-6 w-6">
                <path d="M17.5 21L10.5 14L17.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="rounded-full p-3 bg-orange-600 text-white hover:bg-orange-600/90 cursor-pointer transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none" className="h-6 w-6">
                <path d="M10.5 7L17.5 14L10.5 21" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { TESTIMONIALS } from '@/lib/constants';

interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatCard = ({ value, label, suffix = '', delay = 0 }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const targetValue = parseInt(value, 10);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 10;
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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className="stat-card"
    >
      <div className="text-2xl md:text-5xl font-semibold text-white mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm md:text-lg text-white">{label}</div>
    </motion.div>
  );
};

export default function SocialProofSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-150px' });

  return (
    <section className="py-24" id='testimonials'>
      <Container>
        {/* Heading */}
        <div className="max-w-7xl w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
              <span className="text-lg">🍵</span>
              <span className="text-white text-sm font-medium tracking-wide">
                Testimonials
              </span>
            </div>
          </div>

          <h1 className="text-white mb-6 leading-tight">
            <div className="text-3xl md:text-6xl font-bold mb-2">Stories from our</div>
            <div className="text-3xl md:text-6xl font-semibold">
              <span className="text-orange-600 italic font-playfair">Partners</span>
            </div>
          </h1>

          <p className="text-white/80 text-base md:text-xl max-w-4xl mx-auto">
            Comprehensive tools designed specifically for pharmacy management in
            Bangladesh
          </p>
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <div className="grid grid-cols-4 gap-8 text-center">
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            >
              <StatCard value="1000" label="Transparency" suffix="+" />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            >
              <StatCard value="50" label="Transactions/Day" suffix="K+" />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            >
              <StatCard value="4" label="Customer Rating" suffix=".9/5" />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            >
              <StatCard value="2" label="Support Available" suffix="4/7" />
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="mx-auto mt-20 max-w-6xl">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {[0, 1, 2].map((offset) => {
                  const testimonial =
                    TESTIMONIALS[(activeIndex + offset) % TESTIMONIALS.length];

                  return (
                    <Card
                      key={testimonial.name + offset}
                      variant="glow"
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
                      <div className="mb-4 flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>

                      <p className="mb-6 text-zinc-300">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>

                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/30 text-sm font-semibold">
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <span>{testimonial.name.charAt(0)}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{testimonial.name}</div>
                          <div className="text-sm text-zinc-400">{testimonial.role}</div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                  )
                }
                className="rounded-full p-2 bg-white/10 text-zinc-400 hover:bg-orange-600 hover:text-white"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>
              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
                className="rounded-full p-2 bg-white/10 text-zinc-400 hover:bg-orange-600 hover:text-white"
              >
                <ChevronRight className="h-7 w-7" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

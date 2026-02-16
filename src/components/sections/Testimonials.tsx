'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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
      <div className="text-2xl md:text-5xl font-semibold text-white mb-1 md:mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-sm md:text-lg text-white">{label}</div>
    </motion.div>
  );
};

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-150px' });

  // Detect screen size
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="testimonials"
      className="py-16 md:py-25 relative"
      style={{
        background: `url('/path-to-image.jpg') lightgray 0px -393.536px / 107.416% 177.672% no-repeat, linear-gradient(270deg, rgba(255, 255, 255, 0) -20%, rgba(19, 19, 19, 0.04) 75.76%, rgba(255, 255, 255, 0) 123.64%)`,
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
              <div className="flex justify-start mb-2 md:mb-4">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                  <Image
                    src="/assets/icon/badgeicon6.svg"
                    alt="Check Icon"
                    width={16}
                    height={16}
                  />
                  <span className="text-white text-sm font-medium tracking-wide">
                    Testimonials
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <h1 className="text-white mb-6 leading-tight">
            <div className="text-4xl md:text-6xl font-bold mb-2">Trusted by Growing</div>
            <div className="text-4xl md:text-6xl font-bold"> Healthcare
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
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="mx-auto mt-4 md:mt-16 max-w-5xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            >
              <StatCard value="1000" label="Active Pharmacies" suffix="+" />
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
        <div className="mx-auto mt-20 max-w-7xl">
          <div className="relative overflow-hidden">
            <motion.div
              animate={{
                x: isMobile
                  ? `-${activeIndex * 100}%`
                  : `-${activeIndex * (100 / 3)}%`
              }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex"
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-full md:min-w-[33.3333%] px-3"
                >
                  <Card
                    variant="glow"
                    className="glass-card h-full p-5 rounded-2xl relative overflow-hidden"
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
                      {testimonial.quote}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/30 text-sm font-semibold">
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
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-zinc-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </motion.div>

            {/* Controls */}
            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={() =>
                  setActiveIndex((prev) =>
                    (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                  )
                }
                className="rounded-full p-3 bg-white/10 text-zinc-400 hover:bg-orange-600 hover:text-white cursor-pointer transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d="M17.5 21L10.5 14L17.5 7"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
                }
                className="rounded-full p-3 bg-orange-600 text-white hover:bg-orange-600/90 cursor-pointer transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d="M10.5 7L17.5 14L10.5 21"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

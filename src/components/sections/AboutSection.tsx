'use client';

import { useEffect, useRef, useState } from 'react';
import { easeInOut, motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';
import TextAnimation from '../ui/TextAnimation';

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
}

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

const StatCard = ({ value, label, suffix = '', delay = 0 }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const targetValue = parseInt(value);

  useEffect(() => {
    if (isInView) {
      const duration = 1000; // 2 seconds
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          setCount(targetValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, targetValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, delay }}
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

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.order-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        x: 60,
        opacity: 0,
        duration: 2,
        ease: 'power3.out',
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-25 bg-black">
      <Container>
        <div className="grid items-center max-w-7xl w-full gap-6 md:gap-12 lg:grid-cols-2">
          {/* Left Section */}
          <div className="">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="flex justify-start mb-4">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                  <span className="text-lg">
                    <Image
                      src="/assets/icon/badgeicon2.svg"
                      alt="Interface Icon"
                      width={20}
                      height={20}
                    />
                  </span>
                  <span className="text-white text-sm font-medium tracking-wide">
                    About Proshar
                  </span>
                </div>
              </div>
            </motion.div>

            <TextAnimation type="words" delay={1} duration={1}>
              <div className="text-white mb-4 md:mb-6 leading-tight">
                <h1 className="text-4xl md:text-6xl font-bold">
                  Smarter B2B Medicine{' '}
                  <span className="text-orange-600 italic font-playfair">
                    Platform
                  </span>
                </h1>
              </div>
            </TextAnimation>

            <TextAnimation type="lines" delay={1} duration={1}>
              <p className="text-white text-base md:text-xl max-w-4xl mx-auto">
                Proshar simplifies B2B medicine distribution, connecting retailers with wholesalers, streamlining orders, inventory management, and financial tracking through a unified platform.
              </p>
            </TextAnimation>

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-3 md:gap-8 my-6 md:my-8">
              <div className="relative">
                <StatCard value="100" label="Transparency" suffix="%" delay={1} />
                <div className="absolute -right-4 top-0 bottom-0 w-px bg-white/20 hidden md:block" />
              </div>

              <div className="relative">
                <StatCard value="5" label="Fasting Delivery" suffix="x" delay={1} />
                <div className="absolute -right-4 top-0 bottom-0 w-px bg-white/20 hidden md:block" />
              </div>

              <div>
                <StatCard value="20" label="Saving in Order" suffix="%" delay={1} />
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Button
                size="lg"
                className="bg-[#3a21c0] hover:bg-[#3a21c0]/90 text-white rounded-xl text-base font-semibold px-8 cursor-pointer"
              >
                Start Free Trial
              </Button>
            </motion.div>
          </div>

          {/* Right Section - Dashboard Image with Glass Border */}
          <div className="relative w-full mx-auto">
            {/* Main Glass Container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
            >

              <div className="interactive-card relative rounded-[20px] border border-white/10 shadow-2xl bg-white/10 backdrop-blur-sm p-2 md:p-5">
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
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}

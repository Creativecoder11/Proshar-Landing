'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatCard = ({ value, label, suffix = '', delay = 0 }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const targetValue = parseInt(value);

  useEffect(() => {
    if (isInView) {
      const duration = 2000; // 2 seconds
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
      transition={{ duration: 0.6, delay }}
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

export default function StatsSection() {
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
        duration: 0.8,
        ease: 'power3.out',
      });
    }, statsRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="interface" className="py-24 bg-black">
      <Container>
        <div className="grid items-center max-w-7xl w-full gap-12 lg:grid-cols-2">
          {/* Left Section */}
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

            {/* Stats Grid */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8 my-8">
              <div className="relative">
                <StatCard value="100" label="Transparency" suffix="%" delay={0.1} />
                <div className="absolute -right-4 top-0 bottom-0 w-px bg-white/20 hidden md:block" />
              </div>

              <div className="relative">
                <StatCard value="5" label="Fasting Delivery" suffix="x" delay={0.2} />
                <div className="absolute -right-4 top-0 bottom-0 w-px bg-white/20 hidden md:block" />
              </div>

              <div>
                <StatCard value="20" label="Saving in Order" suffix="%" delay={0.3} />
              </div>
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-[#3a21c0] hover:bg-[#3a21c0]/90 text-white rounded-[12px] text-base font-semibold h-[56px] px-8 w-full sm:w-[172px]"
              >
                Join Proshar
              </Button>
            </motion.div>
          </div>

          {/* Right Section - Dashboard Image with Glass Border */}
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

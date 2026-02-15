'use client';

import { easeInOut, motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import { Timeline } from '../ui/Timeline';
import TextAnimation from '../ui/TextAnimation';

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

const STEPS = [
  {
    number: '01',
    title: 'Join Proshar',
    description:
      "Create your account and verify your shop. It's simple and fast. Join a network of smart retailers sourcing better.",
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-500',
    dotColor: 'bg-orange-500',
  },
  {
    number: '02',
    title: 'Compare & Pick',
    description:
      'Browse products from top wholesalers. Compare pricing and pick the best deals instantly. No more calling around.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500',
    dotColor: 'bg-gray-400',
  },
  {
    number: '03',
    title: 'Direct Delivery',
    description:
      'Order with a click. Proshar delivers products directly to your store, so you can focus on selling to your customers.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500',
    dotColor: 'bg-gray-400',
  },
];

export default function HowProsharWorks() {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left side - Dashboard Image */}

          {/* Main Glass Container */}
          <div className="interactive-card relative rounded-[20px] border border-white/10 shadow-2xl bg-white/10 backdrop-blur-sm p-5">
            {/* Inner Image */}
            <div className="relative rounded-xl overflow-hidden bg-[#0B0B0F]">
              <Image
                src="/assets/WorkImage.svg"
                alt="Dashboard Interface"
                width={1160}
                height={1020}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-3 order-1 lg:order-2">
            {/* Heading */}
            <div className="">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="flex justify-start mb-4">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                    <Image
                      src="/assets/icon/badgeicon4.svg"
                      alt="Check Icon"
                      width={16}
                      height={16}
                    />
                    <span className="text-white text-sm font-medium tracking-wide">
                      Built for Business
                    </span>
                  </div>
                </div>
              </motion.div>

              <TextAnimation type="words" delay={1} duration={1}>
                <h1 className="text-white mb-6 leading-tight">
                  <div className="text-3xl md:text-6xl font-bold">
                    Simplifying Your
                  </div>
                  <div className="text-3xl md:text-6xl font-semibold">
                    <span className="text-orange-600 italic font-playfair">Sourcing Process</span>
                  </div>
                </h1>
              </TextAnimation>
            </div>

            {/* Steps */}
            <div className="space-y-6 mt-8 relative">
              {/* Connecting line */}

              <Timeline
                data={STEPS.map((step) => ({
                  title: step.title,
                  content: step.description,
                  bgColor: step.bgColor,
                }))}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

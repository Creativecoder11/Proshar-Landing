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
    title: 'Join as a Retailer',
    description:
      "Create your retailer account on Proshar to start managing medicine sourcing, orders, and finances from one platform.",
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-500',
    dotColor: 'bg-orange-500',
  },
  {
    number: '02',
    title: 'Add Wholesaler',
    description:
      'Connect with approved wholesalers to view their live inventories, product availability, pricing, and updated stock details instantly.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500',
    dotColor: 'bg-gray-400',
  },
  {
    number: '03',
    title: 'Order & Track',
    description:
      'Place medicine orders, monitor delivery status, track invoices, payments, and gain complete financial visibility in real time.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-500',
    dotColor: 'bg-gray-400',
  },
];

export default function HowWorks() {
  return (
    <section className="py-16 md:py-25 bg-black relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-linear-to-br from-orange-500/5 via-transparent to-purple-500/5 pointer-events-none" />

      <Container>
        <div className="grid items-center gap-6 md:gap-16 md:grid-cols-2">
          {/* Left side - Dashboard Image */}

          {/* Main Glass Container */}
          <div className="interactive-card relative rounded-[20px] border border-white/10 shadow-2xl bg-white/10 backdrop-blur-sm p-2 md:p-5
                  order-2 md:order-1">
            {/* Inner Image */}
            <div className="relative rounded-xl overflow-hidden bg-[#0B0B0F]">
              <Image
                src="/assets/WorkImage.svg"
                alt="Dashboard Interface"
                width={1160}
                height={1040}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-3 order-1 md:order-2">
            {/* Heading */}
            <div>
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
              >
                <div className="flex justify-start mb-2 md:mb-4">
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                    <Image
                      src="/assets/icon/badgeicon5.svg"
                      alt="Check Icon"
                      width={16}
                      height={16}
                    />
                    <span className="text-white text-sm font-medium tracking-wide">
                      How Proshar Works
                    </span>
                  </div>
                </div>
              </motion.div>

              <TextAnimation type="words" delay={1} duration={1}>
                <h1 className="text-white mb-3 md:mb-6 leading-tight">
                  <div className="text-4xl md:text-6xl font-bold">
                    Beautiful Interface,
                  </div>
                  <div className="text-4xl md:text-6xl font-bold">
                    <span className="text-orange-600 italic font-playfair">Powerful Features</span>
                  </div>
                </h1>
              </TextAnimation>
            </div>

            {/* Steps */}
            <div className="space-y-6 mt-4 md:mt-8 relative">
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

'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import { Timeline } from '../ui/Timeline';

const STEPS = [
  {
    number: '01',
    title: 'Join as a Retailer',
    description:
      'Create your retailer account on Proshar to start managing medicine sourcing, orders, and finances from one platform.',
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
                src="/assets/impact-image.svg"
                alt="Dashboard Interface"
                width={1160}
                height={925}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-3 order-1 lg:order-2">
            {/* Heading */}
            <div className="">
              <div className="flex justify-start mb-4">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                  <span className="text-lg">🍵</span>
                  <span className="text-white text-sm font-medium tracking-wide">
                    How Proshar Works
                  </span>
                </div>
              </div>

              <h1 className="text-white leading-tight">
                <div className="text-3xl md:text-6xl font-bold mb-2">Beautiful Interface, </div>
                <div className="text-3xl md:text-6xl font-semibold">
                  <span className="text-orange-600 italic font-playfair">Powerful Features</span>
                </div>
              </h1>
            </div>

            {/* Steps */}
            <div className="space-y-6 mt-8 relative">
              {/* Connecting line */}
              
              <Timeline data={STEPS.map(step => ({
                title: step.title,
                content: step.description,
                bgColor: step.bgColor,
              }))} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

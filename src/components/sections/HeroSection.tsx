'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { motion, easeOut } from 'framer-motion';
import { HeroChip } from '@/components/ui/HeroSectionChip';
import TextAnimation from '../ui/TextAnimation';

// ✅ Lazy load StarBackground (better performance)
const StarBackground = dynamic(() => import('@/components/ui/StarBackground'), {
  ssr: false,
});

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

const buttonGroup = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.8,
    },
  },
};

export function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-0 md:pt-48 md:pb-0 overflow-hidden bg-[#050505] w-full"
    >
      {/* Background Gradients */}

      <div
        className="absolute top-[-15%] right-[-15%] w-[1000px] h-[1000px] rounded-full pointer-events-none z-0 opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(255, 94, 50, 0.6), transparent 70%)',
        }}
      />

      
      <div
        className="absolute top-[10%] left-[-20%] w-[1000px] h-[1000px] rounded-full pointer-events-none z-0 opacity-30 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at center, rgba(58, 33, 192, 0.6), transparent 70%)',
        }}
      />


      {/* Stars (Lazy loaded) */}
      <StarBackground />

      <div className="container max-w-360 mx-auto px-4 flex flex-col items-center text-center relative z-10">
        {/* Badge */}
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <HeroChip />
        </motion.div>
        {/* Headline + Subheadline wrapper fades in after 1s */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 1 }}
        >
          {/* Headline */}
          <TextAnimation type="words" delay={0.3} duration={1}>
            <h1 className="text-4xl md:text-7xl font-semibold tracking-tight mb-6 max-w-5xl text-white leading-none md:leading-[1.1]">
              Modern Pharmacy Management{' '}
              <span className="text-[#FF5E32] ml-2 font-playfair italic font-semibold">
                Made Simple
              </span>
            </h1>
          </TextAnimation>

          {/* Subheadline */}
          <TextAnimation delay={1} duration={1}>
            <p className="text-white text-base md:text-lg max-w-3xl mx-auto text-center mb-6 md:mb-10 leading-normal tracking-[-0.4px]">
              All-in-one platform to manage your pharmacy&apos;s ledger, suppliers,
              inventory, and reports.
            </p>
          </TextAnimation>
        </motion.div>
        {/* Buttons */}
        <motion.div
          variants={buttonGroup}
          initial="hidden"
          animate="show"
          className="flex flex-row gap-5 mb-12 md:mb-20"
        >
          <motion.div variants={fadeUp} whileHover={{ y: -2 }}>
            <Button
              size="lg"
              className="bg-[#3a21c0] hover:bg-[#3a21c0]/90 text-white rounded-xl text-sm md:text-base font-semibold py-3 md:py-4 px-6 md:px-8"
            >
              Start Free Trial
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -2 }}>
            <Button
              size="lg"
              className="rounded-xl text-sm md:text-base font-semibold p-3 md:p-4 bg-white text-[#808080] border border-[#e8e8e8] hover:bg-gray-50 gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="w-4 h-4 md:w-5 md:h-5"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M11.5267 13.8047C11.6988 13.8838 11.8927 13.9018 12.0764 13.8559C12.2602 13.81 12.4228 13.7029 12.5375 13.5522L12.8334 13.1647C12.9886 12.9577 13.1899 12.7897 13.4213 12.674C13.6528 12.5583 13.9079 12.4981 14.1667 12.4981H16.6667C17.1087 12.4981 17.5326 12.6737 17.8452 12.9862C18.1578 13.2988 18.3334 13.7227 18.3334 14.1647V16.6647C18.3334 17.1068 18.1578 17.5307 17.8452 17.8432C17.5326 18.1558 17.1087 18.3314 16.6667 18.3314C12.6884 18.3314 8.87313 16.751 6.06009 13.938C3.24704 11.125 1.66669 7.30965 1.66669 3.3314C1.66669 2.88937 1.84228 2.46545 2.15484 2.15289C2.4674 1.84033 2.89133 1.66473 3.33335 1.66473H5.83335C6.27538 1.66473 6.6993 1.84033 7.01186 2.15289C7.32443 2.46545 7.50002 2.88937 7.50002 3.3314V5.8314C7.50002 6.09014 7.43978 6.34533 7.32407 6.57676C7.20835 6.80818 7.04035 7.00949 6.83335 7.16473L6.44335 7.45723C6.29037 7.57405 6.18254 7.74022 6.13818 7.92753C6.09382 8.11483 6.11567 8.31171 6.20002 8.48473C7.33892 10.798 9.21204 12.6687 11.5267 13.8047Z"
                    stroke="#808080"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="20" height="20" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Schedule Demo
            </Button>
          </motion.div>
        </motion.div>
        {/* Hero Image */}
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <div className="relative w-full max-w-6xl mx-auto group perspective-1000 md:mt-12 -mb-20 md:-mb-32">
            <div className="relative rounded-[20px] border border-white/10 shadow-2xl bg-white/5 p-2 md:p-5">
              <div className="relative rounded-xl overflow-hidden bg-[#0B0B0F]">
                <Image
                  src="/assets/headerbanner.svg"
                  alt="Dashboard Interface"
                  width={1160}
                  height={825}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-20 pointer-events-none" />
    </section>
  );
}

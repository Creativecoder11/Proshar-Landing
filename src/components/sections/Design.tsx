'use client';

import { easeInOut, motion } from 'framer-motion';
import Image from 'next/image';
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

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easeInOut,
    },
  },
};

const BusinessPoint = [
  {
    features: [
      'Bengali language support for local users',
      'Responsive design works on any device',
      'Intuitive navigation requires no training',
      'Dark mode for comfortable viewing',
    ],
  },
];

export default function Design() {
  return (
    <section id="benefits" className="w-full py-16 md:py-25">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="grid items-center gap-6 md:gap-12 lg:grid-cols-[1.5fr_auto]">
          {/* LEFT CONTENT */}
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
                    src="/assets/icon/badgeicon4.svg"
                    alt="Check Icon"
                    width={16}
                    height={16}
                  />
                  <span className="text-white text-sm font-medium tracking-wide">
                    Intuitive Design
                  </span>
                </div>
              </div>
            </motion.div>

            <TextAnimation type="words" delay={1} duration={1}>
              <h1 className="text-white mb-2 md:mb-6 leading-tight">
                <div className="text-[34px] md:text-6xl font-bold">
                  Elegant Design. <br /> Powerful{' '}
                  <span className="text-orange-600 italic font-playfair">
                    Capabilities.
                  </span>
                </div>
              </h1>
            </TextAnimation>

            <TextAnimation type="lines" delay={1} duration={1}>
              <p className="text-[#F7F7F7] text-sm md:text-base md:max-w-4xl">
                Our clean, modern interface makes complex tasks simple. Manage your entire pharmacy operation with just a few clicks.
              </p>
            </TextAnimation>

            {/* FEATURES LIST */}
            <motion.ul
              className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-4 md:mt-10"
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              {BusinessPoint[0].features.map((feature) => (
                <motion.li
                  key={feature}
                  variants={listItemVariants}
                  className="flex items-center gap-2 text-white group/item"
                >
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="text-orange-500 group-hover/item:text-orange-400 transition-colors duration-200">
                      <Image
                        src="/assets/icon/righticon.svg"
                        alt="Check Icon"
                        width={16}
                        height={16}
                      />
                    </div>
                    <span className="text-sm md:text-base">{feature}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative w-fit lg:ml-auto">
            <div className="absolute -inset-1 bg-linear-to-t from-indigo-500/10 to-transparent rounded-[20px] blur-xl -z-10" />

            <div className="interactive-card relative rounded-[20px] border border-white/10 shadow-2xl bg-white/10 backdrop-blur-sm p-2 md:p-5 w-fit">
              <div className="relative w-86 h-80 md:w-115 md:h-115 rounded-xl overflow-hidden bg-[#0B0B0F]">
                <Image
                  src="/assets/BuiltImage.svg"
                  alt="Dashboard Interface"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

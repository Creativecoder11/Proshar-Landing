'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FAQ_ITEMS } from '@/lib/constants';
import { Button } from '../ui/Button';
import Image from 'next/image';
import { fadeInUp } from '@/lib/utils';

const faqContainerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const faqItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
  },
};

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#070808] py-16 md:py-25">
      <Container>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="">
              <div className="flex justify-start mb-2 md:mb-4">
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="flex justify-start mb-2 md:mb-4">
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                      <Image
                        src="/assets/icon/badgeicon7.svg"
                        alt="Check Icon"
                        width={16}
                        height={16}
                      />
                      <span className="text-white text-sm font-medium tracking-wide">
                        Need Help?
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              <h1 className="text-white mb-6 leading-tight">
                <div className="text-4xl md:text-6xl font-bold mb-2">Frequently</div>
                <div className="text-4xl md:text-6xl font-bold">Asked
                  <span className="text-orange-600 italic font-playfair"> Questions</span>
                </div>
              </h1>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div
                  className="bg-white/10 mt-7 md:mt-15 rounded-xl p-4 md:p-6 md:mr-20 glass-card h-full relative overflow-hidden"
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
                  <h3 className="text-lg md:text-2xl font-semibold mb-1 md:mb-2 leading-8 tracking-[-0.48px]">Still Have Questions?</h3>
                  <p className="text-base md:text-lg mb-4 md:mb-8 text-[#E8E8E8]">
                    Our support team is here to help you 24/7
                  </p>
                  <Button
                    size="lg"
                    className="bg-[#FF5E32] hover:bg-[#FF5E31]/90  text-white rounded-lg md:rounded-xl text-sm md:text-base font-medium px-3.5 w-full cursor-pointer transition-colors duration-200"
                  >
                    Contact Support
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* FAQ items — single parent triggers stagger, no individual whileInView */}
          <motion.div
            className="space-y-4"
            variants={faqContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={item.question}
                variants={faqItemVariants}
                className="glass-card rounded-xl md:rounded-2xl relative overflow-hidden"
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
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-4 md:p-6 text-left transition-colors hover:bg-white/5"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="font-semibold text-white text-base md:text-xl">{item.question}</span>
                  <motion.span
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0"
                  >
                    <ChevronDown className="h-5 w-5 text-zinc-400" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      role="region"
                      aria-labelledby={`faq-question-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/10 px-4 md:px-6 py-3 md:py-4 text-white text-sm md:text-base">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { FAQ_ITEMS } from '@/lib/constants';
import { Button } from '../ui/Button';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-[#070808] py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="">
              <div className="flex justify-start mb-4">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                  <span className="text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                      <path d="M17.9994 12.8275C17.9994 10.8422 16.8604 9.07036 15.1546 8.2085C15.1017 12.015 12.0155 15.1012 8.20898 15.1541C9.07085 16.8599 10.8427 17.9989 12.828 17.9989C13.7588 17.9989 14.664 17.751 15.4593 17.2799L17.9768 17.9763L17.2804 15.4588C17.7515 14.6635 17.9994 13.7583 17.9994 12.8275Z" fill="#FF5E32" />
                      <path d="M14.2177 8.10933C14.2177 4.74087 11.4773 2.00049 8.10884 2.00049C4.74038 2.00049 2 4.74087 2 8.10933C2 9.20714 2.29222 10.276 2.84711 11.2144L2.02244 14.1956L5.00374 13.3711C5.94215 13.9259 7.01103 14.2182 8.10884 14.2182C11.4773 14.2182 14.2177 11.4778 14.2177 8.10933ZM7.17142 6.68758H6.234C6.234 5.65373 7.07499 4.81274 8.10884 4.81274C9.14268 4.81274 9.98367 5.65373 9.98367 6.68758C9.98367 7.21231 9.7615 7.71667 9.37398 8.07111L8.57755 8.80005V9.53108H7.64013V8.38727L8.74109 7.37955C8.93786 7.1995 9.04626 6.9538 9.04626 6.68758C9.04626 6.17065 8.62576 5.75016 8.10884 5.75016C7.59191 5.75016 7.17142 6.17065 7.17142 6.68758ZM7.64013 10.4685H8.57755V11.4059H7.64013V10.4685Z" fill="#FF5E32" />
                    </svg>
                  </span>
                  <span className="text-white text-sm font-medium tracking-wide">
                    Need Help?
                  </span>
                </div>
              </div>

              <h1 className="text-white mb-6 leading-tight">
                <div className="text-3xl md:text-6xl font-bold mb-2">Frequently</div>
                <div className="text-3xl md:text-6xl font-bold">Asked
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
                  className="bg-white/10 mt-15 rounded-xl p-6 mr-20 glass-card h-full relative overflow-hidden"
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
                  <h3 className="text-2xl font-semibold mb-2 leading-8 tracking-[-0.48px]">Still Have Questions?</h3>
                  <p className="text-lg mb-8 text-[#E8E8E8]">
                    Our support team is here to help you 24/7
                  </p>
                  <Button
                    size="lg"
                    className="bg-[#FF5E32] hover:bg-[#FF5E31]/90  text-white rounded-xl text-base font-medium px-3.5 w-full cursor-pointer transition-colors duration-200"
                  >
                    Contact Support
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="space-y-4">
            {FAQ_ITEMS.map((item, index) => (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-2xl relative overflow-hidden"
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
                  className="flex w-full items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-white/5"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="font-semibold text-white text-xl">{item.question}</span>
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
                        height: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
                        opacity: { duration: 0.2 },
                      }}
                      className="overflow-hidden"
                    >
                      <p className="border-t border-white/10 px-6 py-4 text-white">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

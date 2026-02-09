'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { GradientText } from '@/components/ui/GradientText';

export default function CTASection() {
  return (
    <section id="contact" className="relative py-24 overflow-hidden">
      <Container
        className="relative z-10 p-15 rounded-2xl bg-[url('/CTA.svg')] bg-center bg-cover bg-no-repeat glass-card overflow-hidden"
        style={{
          // background: 'rgba(26, 26, 26, 0.5)',
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
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
              <span className="text-lg">🍵</span>
              <span className="text-white text-sm font-medium tracking-wide">
                Limited Time Offer
              </span>
            </div>
          </div>
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl lg:text-6xl">
            Ready to Transform <br /> Your Pharmacy?
          </h2>
          <p className="mt-6 text-lg text-zinc-400 sm:text-xl">
            Join 1000+ pharmacies already using Proshar. Start your free 30-day trial
            today—no credit card required.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="bg-[#FF5E32] hover:bg-[#FF5E31]/90  text-white rounded-[12px] text-lg font-semibold h-[56px] px-8 w-full sm:w-full"
              >
                Start Free Trial Now
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="bg-white hover:bg-[#3A21C0]  text-black hover:text-white rounded-[12px] text-lg font-semibold h-[56px] px-8 w-full sm:w-full"
              >
                Talk to Sales
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

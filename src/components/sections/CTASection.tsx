'use client';

import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { fadeInUp } from '@/lib/utils';
import Image from 'next/image';

export default function CTASection() {
  return (
    <section id="contact" className="bg-[#070808] relative py-16 md:py-25 overflow-hidden">
      <Container
        className="relative z-10 p-7 md:p-15 rounded-2xl bg-[url('/CTA.svg')] bg-center bg-cover bg-no-repeat glass-card overflow-hidden"
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
          className="mx-auto max-w-5xl text-center"
        >
          <div className="flex justify-center mb-2 md:mb-4">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="flex justify-start mb-2 md:mb-4">
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
                  <Image
                    src="/assets/icon/badgeicon8.svg"
                    alt="Check Icon"
                    width={16}
                    height={16}
                  />
                  <span className="text-white text-sm font-medium tracking-wide">
                    Limited Time Offer
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold leading-9 md:leading-14">
            Ready to Transform <br />
            Your Pharmacy?
          </h2>

          <p className="text-[#CFCFCF] mt-4 text-lg md:text-xl leading-7 tracking-[-0.4px]">
            Join 1000+ pharmacies already using Proshar. Start your free 30-day trial today—no credit card required.
          </p>
          <div className="mt-8 flex md:flex-col items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="flex gap-1.5 md:gap-3 items-center bg-[#FF5E32] hover:bg-[#FF5E31]/90 text-white rounded-lg text-sm md:text-base font-medium px-2.5 md:px-3.5 py-3 cursor-pointer transition-colors duration-200"
              >
                Start Free Trial Now
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none" className="w-3.5 h-3.5">
                  <path d="M0.75 9.08333L9.08333 0.75M9.08333 0.75H0.75M9.08333 0.75V9.08333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="flex gap-1.5 md:gap-3 items-center bg-white hover:bg-[#3A21C0] text-[#3A21C0] hover:text-white rounded-lg text-sm md:text-base font-semibold px-2.5 md:px-3.5 py-3 cursor-pointer transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                  <path d="M11.5267 13.805C11.6988 13.8841 11.8927 13.9021 12.0764 13.8562C12.2602 13.8103 12.4228 13.7032 12.5375 13.5525L12.8334 13.165C12.9886 12.958 13.1899 12.79 13.4213 12.6743C13.6528 12.5586 13.9079 12.4984 14.1667 12.4984H16.6667C17.1087 12.4984 17.5326 12.674 17.8452 12.9865C18.1578 13.2991 18.3334 13.723 18.3334 14.165V16.665C18.3334 17.1071 18.1578 17.531 17.8452 17.8435C17.5326 18.1561 17.1087 18.3317 16.6667 18.3317C12.6884 18.3317 8.87313 16.7514 6.06009 13.9383C3.24704 11.1253 1.66669 7.30995 1.66669 3.33171C1.66669 2.88968 1.84228 2.46575 2.15484 2.15319C2.4674 1.84063 2.89133 1.66504 3.33335 1.66504H5.83335C6.27538 1.66504 6.6993 1.84063 7.01186 2.15319C7.32443 2.46575 7.50002 2.88968 7.50002 3.33171V5.83171C7.50002 6.09045 7.43978 6.34564 7.32407 6.57706C7.20835 6.80849 7.04035 7.00979 6.83335 7.16504L6.44335 7.45754C6.29037 7.57435 6.18254 7.74053 6.13818 7.92783C6.09382 8.11513 6.11567 8.31202 6.20002 8.48504C7.33892 10.7983 9.21204 12.669 11.5267 13.805Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Talk to Sales
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

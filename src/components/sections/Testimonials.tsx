'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Star } from 'lucide-react';

import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { TESTIMONIALS } from '@/lib/constants';
import Image from 'next/image';

interface StatCardProps {
  value: string;
  label: string;
  suffix?: string;
  delay?: number;
}

const StatCard = ({ value, label, suffix = '', delay = 0 }: StatCardProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const targetValue = parseInt(value, 10);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 10;
    const increment = Math.max(1, Math.floor(targetValue / steps));
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, targetValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
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

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-150px' });

  return (
    <section
      id="testimonials"
      className="py-24 relative"
      style={{
        background: `url('/path-to-image.jpg') lightgray 0px -393.536px / 107.416% 177.672% no-repeat, linear-gradient(270deg, rgba(255, 255, 255, 0) -20%, rgba(19, 19, 19, 0.04) 75.76%, rgba(255, 255, 255, 0) 123.64%)`,
        backdropFilter: 'blur(11.52px)',
        WebkitBackdropFilter: 'blur(11.52px)',
      }}
    >
      <Container>
        {/* Heading */}
        <div className="max-w-7xl w-full text-center">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 border border-zinc-700/50">
              <span className="text-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                <path d="M14.0909 4.95973L14.0069 6.02608C14.0005 6.10608 14.0149 6.18637 14.0485 6.25926C14.0821 6.33215 14.1338 6.39519 14.1987 6.44236C14.3309 6.53851 14.5038 6.55805 14.6537 6.49611L15.6419 6.08639L16.63 6.49611C16.7041 6.52681 16.7849 6.53799 16.8646 6.52856C16.9442 6.51913 17.0202 6.48941 17.0851 6.44225C17.15 6.39508 17.2017 6.33205 17.2353 6.25919C17.2689 6.18632 17.2832 6.10606 17.2769 6.02608L17.1928 4.95973L17.8875 4.1462C17.9396 4.08521 17.9752 4.01187 17.9909 3.93319C18.0066 3.85451 18.0019 3.77312 17.9772 3.69679C17.9523 3.62052 17.9083 3.55189 17.8494 3.49745C17.7905 3.44301 17.7186 3.40458 17.6406 3.38582L16.6003 3.1361L16.0416 2.22382C15.9566 2.08476 15.805 2.00007 15.6419 2.00007C15.4787 2.00007 15.3275 2.08476 15.2422 2.22385L14.6834 3.13613L13.6431 3.38585C13.5652 3.40461 13.4933 3.44305 13.4344 3.49749C13.3756 3.55194 13.3317 3.62056 13.3069 3.69682C13.282 3.77311 13.2772 3.85451 13.2928 3.9332C13.3085 4.0119 13.3441 4.08525 13.3962 4.14623L14.0909 4.95973ZM8.44908 4.95973L8.36501 6.02608C8.35871 6.10606 8.37303 6.18632 8.40661 6.25919C8.4402 6.33205 8.49191 6.39508 8.55682 6.44225C8.62173 6.48941 8.69765 6.51913 8.77733 6.52856C8.857 6.53799 8.93777 6.52681 9.01189 6.49611L10 6.08642L10.9881 6.49614C11.1381 6.55811 11.3112 6.53851 11.4431 6.44239C11.5081 6.39522 11.5598 6.33218 11.5934 6.25929C11.627 6.18641 11.6413 6.10611 11.635 6.02611L11.551 4.95976L12.2456 4.14623C12.2978 4.08525 12.3334 4.0119 12.3491 3.9332C12.3647 3.85451 12.3599 3.77311 12.335 3.69682C12.3102 3.62057 12.2663 3.55194 12.2074 3.4975C12.1486 3.44306 12.0767 3.40462 11.9988 3.38585L10.9585 3.13613L10.3997 2.22385C10.3578 2.15546 10.299 2.09897 10.2291 2.05977C10.1591 2.02058 10.0802 2 10 2C9.91981 2 9.84094 2.02058 9.77096 2.05977C9.70098 2.09897 9.64223 2.15546 9.60033 2.22385L9.04158 3.13613L8.00126 3.38585C7.9233 3.40461 7.85146 3.44305 7.79259 3.49749C7.73372 3.55194 7.6898 3.62056 7.66501 3.69682C7.64016 3.77311 7.63533 3.85451 7.65098 3.9332C7.66663 4.0119 7.70224 4.08525 7.75439 4.14623L8.44908 4.95973ZM2.80713 4.95973L2.72306 6.02608C2.71676 6.10606 2.73108 6.18632 2.76466 6.25919C2.79825 6.33205 2.84997 6.39508 2.91487 6.44225C2.97978 6.48941 3.0557 6.51913 3.13538 6.52856C3.21505 6.53799 3.29582 6.52681 3.36994 6.49611L4.35807 6.08639L5.34619 6.49611C5.49613 6.55808 5.66923 6.53848 5.8012 6.44236C5.86613 6.39519 5.91787 6.33215 5.95147 6.25926C5.98507 6.18637 5.99939 6.10608 5.99307 6.02608L5.90901 4.95973L6.6037 4.1462C6.65585 4.08522 6.69146 4.01187 6.70711 3.93317C6.72276 3.85448 6.71792 3.77308 6.69307 3.69679C6.66828 3.62054 6.62435 3.55191 6.56549 3.49747C6.50662 3.44303 6.43478 3.40459 6.35682 3.38582L5.31651 3.1361L4.75776 2.22385C4.71585 2.15546 4.6571 2.09897 4.58712 2.05977C4.51714 2.02058 4.43827 2 4.35807 2C4.27786 2 4.19899 2.02058 4.12902 2.05977C4.05904 2.09897 4.00028 2.15546 3.95838 2.22385L3.39963 3.13613L2.35931 3.38585C2.28136 3.40461 2.20951 3.44305 2.15064 3.49749C2.09177 3.55194 2.04785 3.62056 2.02306 3.69682C1.99821 3.77311 1.99338 3.85451 2.00903 3.9332C2.02468 4.0119 2.06029 4.08525 2.11244 4.14623L2.80713 4.95973ZM16.6353 7.50061H3.36469C2.61219 7.50061 2 8.11286 2 8.86542V14.3866C2 15.1392 2.61219 15.7514 3.36469 15.7514H7.84751L9.6447 17.8388C9.82127 18.0538 10.1787 18.0538 10.3553 17.8388L12.1525 15.7514H16.6353C17.3878 15.7514 18 15.1392 18 14.3866V8.86542C18 8.11286 17.3878 7.50061 16.6353 7.50061ZM11.125 12.8539C10.8663 12.8539 10.6563 12.6439 10.6563 12.3851C10.6563 12.1261 10.8663 11.9164 11.125 11.9164H14.7188C14.9775 11.9164 15.1875 12.1261 15.1875 12.3851C15.1875 12.6439 14.9775 12.8539 14.7188 12.8539H11.125ZM14.7188 10.9788H5.28126C5.02251 10.9788 4.81251 10.7687 4.81251 10.51C4.81251 10.2512 5.02251 10.0412 5.28126 10.0412H14.7188C14.9775 10.0412 15.1875 10.2512 15.1875 10.51C15.1875 10.7687 14.9775 10.9788 14.7188 10.9788ZM9.34376 12.3851C9.34376 12.6439 9.13376 12.8539 8.87501 12.8539H5.28126C5.02251 12.8539 4.81251 12.6439 4.81251 12.3851C4.81251 12.1261 5.02251 11.9164 5.28126 11.9164H8.87501C9.13376 11.9164 9.34376 12.1261 9.34376 12.3851Z" fill="#FF5E32" />
              </svg></span>
              <span className="text-white text-sm font-medium tracking-wide">
                Testimonials
              </span>
            </div>
          </div>

          <h1 className="text-white mb-6 leading-tight">
            <div className="text-3xl md:text-6xl font-bold mb-2">Trusted by Growing</div>
            <div className="text-3xl md:text-6xl font-bold"> Healthcare
              <span className="text-orange-600 italic font-playfair"> Partners</span>
            </div>
          </h1>
        </div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <div className="grid grid-cols-4 gap-8 text-center">
            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            >
              <StatCard value="1000" label="Active Pharmacies" suffix="+" />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            >
              <StatCard value="50" label="Transactions/Day" suffix="K+" />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            >
              <StatCard value="4" label="Customer Rating" suffix=".9/5" />
            </motion.div>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            >
              <StatCard value="2" label="Support Available" suffix="4/7" />
            </motion.div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="mx-auto mt-20 max-w-7xl">
          <div className="relative overflow-hidden">
            <motion.div
              animate={{ x: `-${activeIndex * (100 / 3)}%` }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="flex"
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={index}
                  className="min-w-[33.3333%] px-3"
                >
                  <Card
                    variant="glow"
                    className="glass-card h-full p-5 rounded-2xl relative overflow-hidden"
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
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>

                    <p className="mb-6 text-zinc-300">
                      {testimonial.quote}
                    </p>

                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/30 text-sm font-semibold">
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="rounded-full object-cover"
                          />
                        ) : (
                          <span>{testimonial.name.charAt(0)}</span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{testimonial.name}</div>
                        <div className="text-sm text-zinc-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </motion.div>

            {/* Controls */}
            <div className="mt-8 flex justify-center gap-3">
              <button
                onClick={() =>
                  setActiveIndex((prev) =>
                    (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                  )
                }
                className="rounded-full p-3 bg-white/10 text-zinc-400 hover:bg-orange-600 hover:text-white cursor-pointer transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d="M17.5 21L10.5 14L17.5 7"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
                }
                className="rounded-full p-3 bg-orange-600 text-white hover:bg-orange-600/90 cursor-pointer transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  className="h-6 w-6"
                >
                  <path
                    d="M10.5 7L17.5 14L10.5 21"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

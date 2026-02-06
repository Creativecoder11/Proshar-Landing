'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { GradientText } from '@/components/ui/GradientText';
import {
  SOCIAL_STATS,
  TESTIMONIALS,
} from '@/lib/constants';

export default function SocialProofSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Trusted by Growing Healthcare{' '}
            <GradientText>Businesses</GradientText>
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 lg:grid-cols-4">
          {SOCIAL_STATS.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl font-bold sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-zinc-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {[0, 1, 2].map((offset) => {
                  const testimonial =
                    TESTIMONIALS[(activeIndex + offset) % TESTIMONIALS.length];
                  return (
                    <Card
                      key={testimonial.name + offset}
                      variant="glow"
                      className="p-6"
                    >
                      <div className="mb-4 flex gap-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-5 w-5 fill-amber-400 text-amber-400"
                            />
                          )
                        )}
                      </div>
                      <p className="mb-6 text-zinc-300">&ldquo;{testimonial.quote}&rdquo;</p>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/30 text-sm font-semibold">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{testimonial.name}</div>
                          <div className="text-sm text-zinc-400">
                            {testimonial.role}
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex justify-center gap-2">
              <button
                onClick={() =>
                  setActiveIndex(
                    (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
                  )
                }
                className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${
                    i === activeIndex
                      ? 'bg-primary'
                      : 'bg-zinc-600 hover:bg-zinc-500'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
              <button
                onClick={() =>
                  setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length)
                }
                className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

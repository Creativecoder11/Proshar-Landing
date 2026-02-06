'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeInUp } from '@/lib/utils';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

const AnimatedSection = React.forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children, delay = 0, className, id }, ref) => {
    return (
      <motion.div
        ref={ref}
        id={id}
        initial={fadeInUp.initial}
        whileInView={fadeInUp.animate}
        viewport={{ once: true, margin: '-50px' }}
        transition={{
          duration: 0.6,
          ease: 'easeOut',
          delay,
        }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    );
  }
);

AnimatedSection.displayName = 'AnimatedSection';

export { AnimatedSection };

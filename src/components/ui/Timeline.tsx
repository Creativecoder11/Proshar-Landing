'use client';

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  bgColor: string;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Measure timeline height
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, []);

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 80%'],
  });

  // Detect active step
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = Math.floor(latest * data.length);
    setActiveIndex(Math.min(step, data.length - 1));
  });

  const LINE_RATIO = 0.6; //timeline height

  // Animated line
  const heightTransform = useTransform(
  scrollYProgress,
  [0, 1],
  [0, height * LINE_RATIO]
);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full text-white font-sans" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col justify-start md:gap-3">
            {/* Sticky Header */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              {/* Dot */}
              <div className="h-7 absolute left-5 w-7 rounded-full bg-neutral-700 flex items-center justify-center">
                <div
                  className={`h-4 w-4 rounded-full border transition-all duration-300
                    ${
                      index <= activeIndex
                        ? 'bg-orange-500 border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]'
                        : 'bg-white/40 border-neutral-300 dark:border-neutral-700'
                    }
                  `} 
                />
              </div>

              {/* Step label */}
              <div className="flex flex-row items-center gap-4 md:pl-20">
                <div className={`${item.bgColor} px-3 py-2 rounded-sm`}>
                  <p className="text-xl font-medium text-white">
                    Step - {index + 1}
                  </p>
                </div>
                <h3 className="hidden md:block text-xl md:text-2xl font-bold text-white">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="pl-20 pr-4 md:pl-20 w-full">
              {item.content}
              <div className="h-[1px] my-6 md:pl-20 bg-white/20" />
            </div>
          </div>
        ))}

        {/* Vertical Line */}
        <div
          style={{ height: `${height}px` }}
          className="absolute left-8 top-0 overflow-hidden w-[2px]
          bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
          from-transparent via-neutral-200 dark:via-neutral-700 to-transparent
          [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[1px]
            border border-dashed border-orange-500 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

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

  // Only enable scroll-based motion for md and up
  const [isMdUp, setIsMdUp] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMdUp(window.innerWidth >= 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  // Scroll progress & active step (only on md and up)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 80%'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (isMdUp) {
      const step = Math.floor(latest * data.length);
      setActiveIndex(Math.min(step, data.length - 1));
    }
  });

  const LINE_RATIO = 0.8;

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [0, height * LINE_RATIO]
  );
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full text-white" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col justify-start md:gap-3">
            {/* Sticky Header */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center self-start max-w-xs lg:max-w-sm md:w-full pb-4 md:pb-0">
              {/* Dot (hide on small screens) */}
              <div className="hidden md:flex h-7 absolute left-5 w-7 rounded-full bg-neutral-700 items-center justify-center">
                <div
                  className={`h-4 w-4 rounded-full border transition-all duration-300
                  ${index <= activeIndex
                      ? 'bg-orange-500 border-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]'
                      : 'bg-white/40 border-neutral-300 dark:border-neutral-700'
                    }`}
                />
              </div>

              {/* Step label */}
              <div className="flex flex-row items-start md:items-center gap-4 md:pl-18">
                <div className={`${item.bgColor} px-2.5 md:px-3 py-1 md:pb-2 pt-1 md:pt-1.5 rounded-sm`}>
                  <p className="text-sm md:text-xl font-medium text-white">
                    Step - {index + 1}
                  </p>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-white">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Content */}
            <div className="pr-4 md:pl-18 w-full text-[#F7F7F7] text-sm md:text-base">
              {item.content}
              {index < data.length - 1 && (
                <div className="h-px my-4 md:my-6 pr-4 md:pl-18 bg-white/20" />
              )}
            </div>
          </div>
        ))}

        {/* Vertical Line (only on md and up) */}
        {isMdUp && (
          <div
            style={{ height: `${height}px` }}
            className="absolute left-8 top-0 overflow-hidden w-0.5
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
        )}
      </div>
    </div>
  );
};

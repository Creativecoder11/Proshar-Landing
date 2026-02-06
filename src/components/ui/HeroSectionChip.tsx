"use client";

import * as React from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export type HeroChipProps = React.HTMLAttributes<HTMLDivElement>;

export function HeroChip({ className, ...props }: HeroChipProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = React.useState(false);
  const [overflowAmount, setOverflowAmount] = React.useState(0);
  const controls = useAnimationControls();

  React.useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && contentRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const contentWidth = contentRef.current.scrollWidth;

        // Add a small buffer to prevent subpixel flickering
        if (contentWidth > containerWidth + 1) {
          setShouldAnimate(true);
          setOverflowAmount(contentWidth - containerWidth);
        } else {
          setShouldAnimate(false);
          setOverflowAmount(0);
        }
      }
    };

    // Initial check
    checkOverflow();

    // Re-check on window resize
    window.addEventListener("resize", checkOverflow);
    
    // Also check after a short delay to account for layout shifts
    const timer = setTimeout(checkOverflow, 500);

    return () => {
      window.removeEventListener("resize", checkOverflow);
      clearTimeout(timer);
    };
  }, []);

  React.useEffect(() => {
    let isMounted = true;

    const startSequence = async () => {
      if (!shouldAnimate || overflowAmount <= 0) return;

      while (isMounted) {
        // Pause at the start
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!isMounted) break;

        // Scroll smoothly to reveal the right side
        // Calculate duration based on distance (approx 50px per second)
        const duration = Math.max(2, overflowAmount * 0.02);

        await controls.start({
          x: -overflowAmount,
          transition: { duration: duration, ease: "easeInOut" },
        });

        // Pause at the end
        await new Promise((resolve) => setTimeout(resolve, 2000));
        if (!isMounted) break;

        // Scroll back to start
        await controls.start({
          x: 0,
          transition: { duration: duration, ease: "easeInOut" },
        });
      }
    };

    if (shouldAnimate) {
      startSequence();
    } else {
      controls.stop();
      controls.set({ x: 0 });
    }

    return () => {
      isMounted = false;
      controls.stop();
    };
  }, [shouldAnimate, overflowAmount, controls]);

  return (
    <div
      className={cn(
        "inline-flex items-center p-[5px] pr-[7px] rounded-full bg-white border border-[#e8e8e8] mb-8 shadow-sm max-w-full",
        className
      )}
      {...props}
    >
      {/* Static Badge */}
      <span className="bg-[#FF5E32] text-white text-xs font-medium px-[8px] py-[6px] rounded-full mr-2 shrink-0">
        All-in-One B2B Sourcing
      </span>

      {/* Scrolling Text Container */}
      <div 
        ref={containerRef} 
        className="flex-1 overflow-hidden min-w-0"
      >
        <motion.div
          ref={contentRef}
          animate={controls}
          className="inline-flex items-center whitespace-nowrap"
        >
          <span className="text-sm font-medium text-[#4f4f4f] flex items-center gap-1">
            Connecting Retailers & Wholesalers
            <Sparkles className="w-4 h-4 text-[#3a21c0] fill-[#3a21c0]/20" />
          </span>
        </motion.div>
      </div>
    </div>
  );
}

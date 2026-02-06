
"use client";

import * as React from "react";
import {
  motion,
  type Transition,
  type UseInViewOptions,
  useInView,
} from "framer-motion";

import { cn } from "@/lib/utils";

export const title = "Rolling Text";

const ENTRY_ANIMATION = {
  initial: { rotateX: 0 },
  animate: { rotateX: 90 },
};

const EXIT_ANIMATION = {
  initial: { rotateX: 90 },
  animate: { rotateX: 0 },
};

const formatCharacter = (char: string) => (char === " " ? "\u00A0" : char);

export interface RollingTextProps extends Omit<
  React.ComponentPropsWithoutRef<"span">,
  "children"
> {
  transition?: Transition;
  inView?: boolean;
  inViewMargin?: UseInViewOptions["margin"];
  inViewOnce?: boolean;
  text: string;
}

export const RollingText = React.forwardRef<HTMLSpanElement, RollingTextProps>(
  function RollingText(
    {
      className,
      transition = { duration: 0.35, delay: 0.04, ease: "easeOut" },
      inView = false,
      inViewMargin = "0px",
      inViewOnce = true,
      text,
      ...props
    },
    ref,
  ) {
    const localRef = React.useRef<HTMLSpanElement>(null);

    const setRef = React.useCallback(
      (node: HTMLSpanElement | null) => {
        localRef.current = node;
        if (!ref) return;
        if (typeof ref === "function") {
          ref(node);
          return;
        }
        ref.current = node;
      },
      [ref],
    );

    const inViewResult = useInView(localRef, {
      once: inViewOnce,
      margin: inViewMargin,
    });
    const isInView = !inView || inViewResult;

    const characters = React.useMemo(() => text.split(""), [text]);

    return (
      <span
        data-slot="rolling-text"
        {...props}
        ref={setRef}
        className={cn(className)}
      >
        {characters.map((char, idx) => (
          <span
            aria-hidden="true"
            className="relative inline-block [perspective:9999999px] [transform-style:preserve-3d] w-auto"
            key={idx}
          >
            <motion.span
              animate={isInView ? ENTRY_ANIMATION.animate : undefined}
              className="absolute inline-block [backface-visibility:hidden] origin-[50%_25%]"
              initial={ENTRY_ANIMATION.initial}
              transition={{
                ...transition,
                delay: idx * (transition.delay ?? 0),
              }}
            >
              {formatCharacter(char)}
            </motion.span>
            <motion.span
              animate={isInView ? EXIT_ANIMATION.animate : undefined}
              className="absolute inline-block [backface-visibility:hidden] origin-[50%_100%]"
              initial={EXIT_ANIMATION.initial}
              transition={{
                ...transition,
                delay: idx * (transition.delay ?? 0) + 0.16,
              }}
            >
              {formatCharacter(char)}
            </motion.span>
            <span className="invisible">{formatCharacter(char)}</span>
          </span>
        ))}

        <span className="sr-only">{text}</span>
      </span>
    );
  },
);

export default RollingText;

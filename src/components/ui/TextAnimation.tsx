"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type TextAnimationProps = {
  children: React.ReactNode;
  type?: "lines" | "words" | "chars";
  animateOnScroll?: boolean;
  delay?: number;
  duration?: number;
  stagger?: number;
};

export default function TextAnimation({
  children,
  type = "lines",
  animateOnScroll = true,
  delay = 0,
  duration = 0.9,
  stagger = 0.06,
}: TextAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRefs = useRef<SplitText[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // cleanup
      splitRefs.current.forEach((s) => s.revert());
      splitRefs.current = [];

      const elements = container.hasAttribute("data-copy-wrapper")
        ? Array.from(container.children)
        : [container];

      const targets: HTMLElement[] = [];

      elements.forEach((el) => {
        const split = new SplitText(el as HTMLElement, {
          type,
          linesClass: "gsap-line",
          wordsClass: "gsap-word",
          charsClass: "gsap-char",
          mask: type === "lines" ? "lines" : undefined,
        });

        splitRefs.current.push(split);

        if (type === "lines") targets.push(...(split.lines as HTMLElement[]));
        if (type === "words") targets.push(...(split.words as HTMLElement[]));
        if (type === "chars") targets.push(...(split.chars as HTMLElement[]));
      });

      /* ---------- Initial State ---------- */
      gsap.set(targets, {
        yPercent: type === "lines" ? 100 : 40,
        opacity: type === "lines" ? 1 : 0,
      });

      /* ---------- Animation ---------- */
      const animation = {
        yPercent: 0,
        opacity: 1,
        duration,
        stagger,
        ease: "power4.out",
        delay,
      };

      if (animateOnScroll) {
        gsap.to(targets, {
          ...animation,
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            once: true,
          },
        });
      } else {
        gsap.to(targets, animation);
      }
    }, container);

    return () => ctx.revert();
  }, [type, animateOnScroll, delay, duration, stagger]);

  return (
    <div ref={containerRef} data-copy-wrapper>
      {children}
    </div>
  );
}

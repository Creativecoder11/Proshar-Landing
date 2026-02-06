"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

export interface SplitTextProps extends React.HTMLAttributes<HTMLElement> {
  tag?: keyof React.JSX.IntrinsicElements;
  text: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words,chars" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
}

export function SplitText({
  tag = "p",
  text,
  className,
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "inherit",
  onLetterAnimationComplete,
  style,
  ...props
}: SplitTextProps) {
  const elementRef = React.useRef<HTMLElement | null>(null);
  const hasAnimatedRef = React.useRef(false);

  useGSAP(
    () => {
      const element = elementRef.current;
      if (!element) return;

      const normalizedSplitType = splitType.replaceAll(" ", "") as
        | "chars"
        | "words"
        | "lines"
        | "words,chars";

      const requestedTypes = normalizedSplitType
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const types = Array.from(new Set([...requestedTypes, "lines"])).join(
        ",",
      ) as "chars" | "words" | "lines" | "words,chars" | "lines,words,chars";

      const split = new SplitType(element, {
        types,
        tagName: "span",
      });

      const chars = split.chars ?? [];
      const words = split.words ?? [];
      const lines = split.lines ?? [];
      const lineWrappers: HTMLElement[] = [];

      if (lines.length > 1) {
        for (const line of lines) {
          const lineElement = line as unknown as HTMLElement;
          const parent = lineElement.parentElement;
          if (!parent) continue;

          const existingWrapper = parent.closest(
            "[data-split-text-line-wrapper='true']",
          );
          if (existingWrapper) continue;

          const wrapper = document.createElement("span");
          wrapper.dataset.splitTextLineWrapper = "true";
          wrapper.className = "inline-block w-full overflow-hidden align-top";

          parent.insertBefore(wrapper, lineElement);
          wrapper.appendChild(lineElement);
          lineWrappers.push(wrapper);
        }
      }

      const targets =
        splitType.includes("chars") && chars.length
          ? chars
          : splitType.includes("words") && words.length
            ? words
            : lines;

      gsap.set(targets, from);
      gsap.set(element, { visibility: "visible" });

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry?.isIntersecting) return;
          if (hasAnimatedRef.current) return;
          hasAnimatedRef.current = true;

          gsap.to(targets, {
            ...to,
            duration,
            ease,
            stagger: delay / 1000,
            onComplete: onLetterAnimationComplete,
          });

          observer.disconnect();
        },
        { threshold, rootMargin },
      );

      observer.observe(element);

      return () => {
        observer.disconnect();
        for (const wrapper of lineWrappers) {
          const parent = wrapper.parentNode;
          if (!parent) continue;

          while (wrapper.firstChild) {
            parent.insertBefore(wrapper.firstChild, wrapper);
          }
          parent.removeChild(wrapper);
        }
        split.revert();
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        threshold,
        rootMargin,
        onLetterAnimationComplete,
      ],
    },
  );

  const Tag = tag as unknown as React.ElementType;

  return (
    <Tag
      ref={elementRef}
      className={cn(className)}
      style={{
        ...style,
        visibility: style?.visibility ?? "hidden",
        textAlign,
      }}
      {...props}
    >
      {text}
    </Tag>
  );
}

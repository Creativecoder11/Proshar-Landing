"use client";

import * as React from "react";
import Image from "next/image";
import { useLocomotiveScroll } from "@/components/providers/locomotive-scroll-provider";

const logos = [
  "mkql63oa-mzpkspp.svg",
  "mkql63oa-lrhwhoq.svg",
  "mkql63oa-3nfu6kj.svg",
  "mkql63oa-fg6yc8l.svg",
  "mkql63oa-99vvf3i.svg",
  "mkql63oa-7jfufd2.svg",
  "mkql63oa-zblxu43.svg",
];

export function CompanyLogos() {
  const { scroll, isReady } = useLocomotiveScroll();
  const viewportRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);

  const [isInView, setIsInView] = React.useState(false);
  const isInViewRef = React.useRef(false);

  const lastScrollYRef = React.useRef(0);
  const boostRef = React.useRef(0);
  const offsetRef = React.useRef(0);
  const loopWidthRef = React.useRef(0);
  const lastTsRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  const measure = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const nextLoopWidth = track.scrollWidth / 2;
    if (Number.isFinite(nextLoopWidth) && nextLoopWidth > 0) {
      loopWidthRef.current = nextLoopWidth;
      offsetRef.current = offsetRef.current % nextLoopWidth;
    }
  }, []);

  React.useEffect(() => {
    measure();
    const id = window.setTimeout(measure, 250);
    const raf1 = requestAnimationFrame(measure);
    const raf2 = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(id);
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    if (typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      measure();
    });

    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(Boolean(entry?.isIntersecting));
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!isInView) {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTsRef.current = null;
      return;
    }

    const baseSpeed = 26;
    const boostDecayPerSecond = 2.6;

    const tick = (ts: number) => {
      const track = trackRef.current;
      const loopWidth = loopWidthRef.current;

      if (!track || loopWidth <= 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.min(0.05, Math.max(0, (ts - lastTsRef.current) / 1000));
      lastTsRef.current = ts;

      boostRef.current = boostRef.current * Math.exp(-boostDecayPerSecond * dt);
      const speed = baseSpeed + boostRef.current;

      offsetRef.current = (offsetRef.current + speed * dt) % loopWidth;
      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTsRef.current = null;
    };
  }, [isInView]);

  React.useEffect(() => {
    if (!isReady) return;

    const maxBoost = 70;
    const boostGain = 0.55;

    const applyScrollDelta = (delta: number) => {
      if (!isInViewRef.current) return;
      const magnitude = Math.abs(delta);
      if (magnitude < 1) return;
      const add = Math.min(maxBoost, magnitude * boostGain);
      boostRef.current = Math.min(maxBoost, boostRef.current + add);
    };

    const updateFromY = (currentY: number) => {
      const lastY = lastScrollYRef.current;
      lastScrollYRef.current = currentY;
      applyScrollDelta(currentY - lastY);
    };

    lastScrollYRef.current = window.scrollY || 0;

    if (scroll?.on && scroll?.off) {
      const handleLocoScroll = (args: unknown) => {
        const y = getScrollYFromLocomotiveEvent(args);
        if (y === null) return;
        updateFromY(y);
      };

      scroll.on("scroll", handleLocoScroll);
      return () => {
        scroll.off?.("scroll", handleLocoScroll);
      };
    }

    const handleWindowScroll = () => {
      updateFromY(window.scrollY || 0);
    };

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [isReady, scroll]);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-3xl  font-semibold text-white mb-8">
          Sourcing From the Best in the Industry
        </p>
      </div>

      <div ref={viewportRef} className="relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-6 md:gap-16 py-6 opacity-50 hover:opacity-100 transition-opacity duration-500 will-change-transform"
        >
          {[0, 1].map((copyIndex) =>
            logos.map((logo, index) => (
              <div
                key={`${copyIndex}-${logo}-${index}`}
                aria-hidden={copyIndex === 1}
                className="relative h-8 w-24 md:h-10 md:w-32 hover:scale-105 transition-transform duration-300 shrink-0"
              >
                <Image
                  src={`/assets/logo/${logo}`}
                  alt={copyIndex === 0 ? `Partner Logo ${index + 1}` : ""}
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            )),
          )}
        </div>
      </div>
    </section>
  );
}

function getScrollYFromLocomotiveEvent(event: unknown) {
  if (!event || typeof event !== "object") return null;
  const record = event as Record<string, unknown>;

  const scroll = record.scroll;
  if (!scroll || typeof scroll !== "object") return null;
  const scrollRecord = scroll as Record<string, unknown>;

  const directY = getFiniteNumber(scrollRecord.y);
  if (directY !== null) return directY;

  const instance = scrollRecord.instance;
  if (!instance || typeof instance !== "object") return null;
  const instanceRecord = instance as Record<string, unknown>;

  const nestedScroll = instanceRecord.scroll;
  if (!nestedScroll || typeof nestedScroll !== "object") return null;
  const nestedScrollRecord = nestedScroll as Record<string, unknown>;

  return getFiniteNumber(nestedScrollRecord.y);
}

function getFiniteNumber(value: unknown) {
  if (typeof value !== "number") return null;
  if (!Number.isFinite(value)) return null;
  return value;
}

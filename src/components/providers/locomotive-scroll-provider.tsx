"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ILocomotiveScrollOptions } from "locomotive-scroll";

interface LocomotiveScrollInstance {
  destroy: () => void;
  update?: () => void;
  scrollTo?: (target: number | string | HTMLElement, options?: unknown) => void;
  on?: (event: string, callback: (args: unknown) => void) => void;
  off?: (event: string, callback: (args: unknown) => void) => void;
}

interface LocomotiveScrollContextType {
  scroll: LocomotiveScrollInstance | null;
  isReady: boolean;
}

const LocomotiveScrollContext = createContext<LocomotiveScrollContextType>({
  scroll: null,
  isReady: false,
});

interface LocomotiveScrollProviderOptions extends Partial<ILocomotiveScrollOptions> {
  smooth?: boolean;
  smoothMobile?: boolean;
  resetNativeScroll?: boolean;
  lerp?: number;
  smartphone?: { smooth?: boolean };
  tablet?: { smooth?: boolean };
}

interface LocomotiveScrollProviderProps {
  children: React.ReactNode;
  options?: LocomotiveScrollProviderOptions;
}

export function LocomotiveScrollProvider({
  children,
  options = {},
}: LocomotiveScrollProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState<LocomotiveScrollInstance | null>(null);
  const [isReady, setIsReady] = useState(false);
  const lastKnownHrefRef = useRef<string | null>(null);

  useEffect(() => {
    let locomotiveScroll: LocomotiveScrollInstance | undefined;

    const initScroll = async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

        locomotiveScroll = new LocomotiveScroll({
          el: containerRef.current || undefined,
          smooth: true,
          smoothMobile: false,
          resetNativeScroll: true,
          ...options,
        } as unknown as ILocomotiveScrollOptions) as unknown as LocomotiveScrollInstance;

        setScroll(locomotiveScroll);
        setIsReady(true);
      } catch (error) {
        console.error("Failed to initialize LocomotiveScroll:", error);
      }
    };

    initScroll();

    return () => {
      if (locomotiveScroll) {
        locomotiveScroll.destroy();
      }
    };
  }, [options]);

  // Handle route changes - reinitialize scroll
  useEffect(() => {
    if (scroll) {
      const getHrefWithoutHash = (href: string) => {
        const hashIndex = href.indexOf("#");
        return hashIndex === -1 ? href : href.slice(0, hashIndex);
      };

      const resolveHref = (url: unknown) => {
        if (!url) return window.location.href;
        if (typeof url === "string") {
          try {
            return new URL(url, window.location.href).href;
          } catch {
            return window.location.href;
          }
        }
        if (url instanceof URL) return url.href;
        return window.location.href;
      };

      const handleRouteChange = (nextUrl?: unknown) => {
        const prevHref = lastKnownHrefRef.current ?? window.location.href;
        const nextHref = resolveHref(nextUrl);
        lastKnownHrefRef.current = nextHref;

        const prevBase = getHrefWithoutHash(prevHref);
        const nextBase = getHrefWithoutHash(nextHref);

        setTimeout(() => {
          scroll.update?.();
          if (prevBase === nextBase) return;
          scroll.scrollTo?.(0, { duration: 0, disableLerp: true });
        }, 100);
      };

      // Listen for Next.js route changes
      if (typeof window !== "undefined") {
        lastKnownHrefRef.current = window.location.href;
        const handlePopState = () => handleRouteChange();
        window.addEventListener("popstate", handlePopState);

        // Also listen for custom route change events
        const originalPushState = window.history.pushState;
        const originalReplaceState = window.history.replaceState;

        window.history.pushState = function (...args) {
          originalPushState.apply(this, args);
          handleRouteChange(args[2]);
        };

        window.history.replaceState = function (...args) {
          originalReplaceState.apply(this, args);
          handleRouteChange(args[2]);
        };

        return () => {
          window.removeEventListener("popstate", handlePopState);
          window.history.pushState = originalPushState;
          window.history.replaceState = originalReplaceState;
        };
      }
    }
  }, [scroll]);

  return (
    <LocomotiveScrollContext.Provider value={{ scroll, isReady }}>
      <div ref={containerRef} data-scroll-container>
        {children}
      </div>
    </LocomotiveScrollContext.Provider>
  );
}

export function useLocomotiveScroll() {
  const context = useContext(LocomotiveScrollContext);
  if (!context) {
    throw new Error(
      "useLocomotiveScroll must be used within a LocomotiveScrollProvider",
    );
  }
  return context;
}

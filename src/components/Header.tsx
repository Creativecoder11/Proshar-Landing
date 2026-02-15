"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocomotiveScroll } from "@/components/providers/locomotive-scroll-provider";

const navItems = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "interface", label: "Interface" },
  { id: "benefits", label: "Benefits" },
  { id: "testimonials", label: "Testimonials" },
] as const;

type NavItemId = (typeof navItems)[number]["id"];

const navVariants = {
  expanded: { y: 0, scale: 1, opacity: 1 },
  compact: { y: 0, scale: 0.94, opacity: 1 },
  hidden: { y: -28, scale: 0.94, opacity: 0 },
};

const sideVariants = {
  expanded: { opacity: 1 },
  compact: { opacity: 0 },
  hidden: { opacity: 0 },
};

const navStyle = {
  background: "rgba(255, 255, 255, 0.06)",
  backdropFilter: "blur(24px) saturate(150%)",
  WebkitBackdropFilter: "blur(24px) saturate(150%)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.1), inset 1px 2px 0px -1px rgba(255, 255, 255, 0.15), inset -1px -1px 0px -0.5px rgba(255, 255, 255, 0.1), 0px 4px 20px 0px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.1)`,
};

const pillStyle = {
  background: "rgba(255, 255, 255, 0.95)",
  boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 1), inset 0 -1px 0 0 rgba(0, 0, 0, 0.04), 0px 2px 8px 0px rgba(0, 0, 0, 0.12), 0px 1px 2px 0px rgba(0, 0, 0, 0.08)`,
};

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mode, setMode] = useState<"expanded" | "compact" | "hidden">("expanded");
  const [activeSection, setActiveSection] = useState<NavItemId>("home");
  const [isOnWhiteBg, setIsOnWhiteBg] = useState(false);
  const { scroll, isReady } = useLocomotiveScroll();
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);
  const lockExpandedUntil = useRef(0);

  useEffect(() => {
    if (!isReady) return;

    const updateNav = (y: number) => {
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      if (performance.now() < lockExpandedUntil.current || y <= 8) {
        setMode("expanded");
        return;
      }

      if (Math.abs(delta) < 2) return;

      if (delta > 0) {
        setMode(y > 96 ? "hidden" : "compact");
      } else {
        setMode("expanded");
      }
    };

    const updateActiveSection = (y: number) => {
      const navHeight = navRef.current?.getBoundingClientRect().height ?? 0;
      const threshold = y + navHeight + 24;

      for (let i = navItems.length - 1; i >= 0; i--) {
        const el = document.getElementById(navItems[i].id);
        if (el && y + el.getBoundingClientRect().top <= threshold + 1) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    const checkBackgroundColor = () => {
      if (!navRef.current) return;

      const rect = navRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const elementBehind = document.elementFromPoint(centerX, centerY);
      if (!elementBehind) return;

      let current: Element | null = elementBehind;
      while (current && current !== document.body) {
        const bg = window.getComputedStyle(current).backgroundColor;

        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          const rgb = bg.match(/\d+/g);
          if (rgb) {
            const [r, g, b] = rgb.map(Number);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            setIsOnWhiteBg(brightness > 200);
            return;
          }
        }
        current = current.parentElement;
      }

      setIsOnWhiteBg(false);
    };

    const handleScroll = (args?: unknown) => {
      const y = args ? getScrollY(args) : window.scrollY || 0;
      updateNav(y);
      requestAnimationFrame(() => {
        updateActiveSection(y);
        checkBackgroundColor();
      });
    };

    lastScrollY.current = window.scrollY || 0;

    if (scroll?.on) {
      scroll.on("scroll", handleScroll);
      return () => scroll.off?.("scroll", handleScroll);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReady, scroll]);

  const handleNavClick = (id: NavItemId) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetEl = document.getElementById(id);

    if (targetEl) {
      setActiveSection(id);
      lockExpandedUntil.current = performance.now() + 1600;
      setMode("expanded");

      const offset = -(navRef.current?.getBoundingClientRect().height ?? 0) - 24;

      if (scroll?.scrollTo) {
        scroll.scrollTo(targetEl, { duration: 1.35, easing: [0.22, 1, 0.36, 1], offset });
      } else {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }

    setIsMobileMenuOpen(false);
    window.history.pushState(null, "", `#${id}`);
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-3 md:py-6 max-w-7xl mx-auto px-4 md:px-0">
      <motion.div animate={mode} variants={sideVariants} style={{ pointerEvents: mode === "expanded" ? "auto" : "none" }} className="flex items-center gap-2 relative z-50">
        <Link href="/" className={cn("text-2xl font-bold tracking-tight flex items-center gap-2 transition-colors duration-300", isOnWhiteBg ? "text-gray-900" : "text-white")}>
          <Image src="/assets/logo/Proshar White Logo.svg" alt="Proshar Logo" width={120} height={40} className={cn("w-auto h-8 transition-opacity duration-300", isOnWhiteBg && "opacity-0 absolute")} />
          {isOnWhiteBg && (
            <Image src="/assets/logo/Proshar Black Logo.svg" alt="Proshar Logo" width={120} height={40} className="w-auto h-8" />
          )}
        </Link>
      </motion.div>

      <motion.div
        animate={mode}
        variants={navVariants}
        style={{
          ...navStyle,
          transformOrigin: "top center",
          ...(isOnWhiteBg && {
            background: "rgba(0, 0, 0, 0.06)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            boxShadow: `inset 0 1px 0 0 rgba(0, 0, 0, 0.05), 0px 4px 20px 0px rgba(0, 0, 0, 0.08), 0px 1px 3px 0px rgba(0, 0, 0, 0.05)`,
          })
        }}
        className="hidden md:flex items-center gap-0 p-1.5 rounded-full relative overflow-hidden transition-all duration-300"
      >
        {navItems.map((item) => (
          <Link key={item.id} href={`#${item.id}`} onClick={handleNavClick(item.id)} className={cn("relative isolate overflow-hidden px-6.5 py-3 rounded-full text-[17px] font-medium transition-all duration-300", activeSection === item.id ? (isOnWhiteBg ? "text-white" : "text-[#1a1a1a]") : (isOnWhiteBg ? "text-gray-900/90 hover:text-gray-900" : "text-white/90 hover:text-white"))}>
            {activeSection === item.id && (
              <motion.span
                layoutId="desktop-nav-pill"
                transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.8 }}
                className="absolute inset-0 -z-10 rounded-full"
                style={isOnWhiteBg ? {
                  background: "rgba(0, 0, 0, 0.95)",
                  boxShadow: `inset 0 1px 0 0 rgba(0, 0, 0, 1), 0px 2px 8px 0px rgba(0, 0, 0, 0.12)`,
                } : pillStyle}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </Link>
        ))}
      </motion.div>

      <div className="flex items-center gap-4 relative z-50">
        <motion.div animate={mode} variants={sideVariants} style={{ pointerEvents: mode === "expanded" ? "auto" : "none" }} className="hidden md:flex">
          <Button className={cn("rounded-lg w-33 font-semibold text-sm h-11 transition-colors duration-300", isOnWhiteBg ? "bg-gray-900 text-white hover:bg-gray-800 border border-gray-800" : "bg-white text-[#808080] hover:bg-gray-50 border border-[#e8e8e8]")}>
            Get Started
          </Button>
        </motion.div>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={cn("md:hidden p-2 rounded-full transition-colors", isOnWhiteBg ? "text-gray-900 hover:bg-gray-900/10" : "text-white hover:bg-white/10")} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.2 }} className="absolute top-0 left-0 right-0 bg-[#0B0B0F]/95 backdrop-blur-2xl border-b border-white/10 p-6 pt-24 md:hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <Link key={item.id} href={`#${item.id}`} onClick={handleNavClick(item.id)} className={cn("relative isolate overflow-hidden text-lg font-medium px-5 py-3 rounded-full transition-all block", activeSection === item.id ? "bg-white/95 text-[#1a1a1a]" : "text-gray-300 hover:text-white hover:bg-white/5")}>
                  {activeSection === item.id && (
                    <motion.span layoutId="mobile-nav-pill" transition={{ type: "spring", stiffness: 400, damping: 30 }} className="absolute inset-0 -z-10 rounded-full bg-white/95" style={{ boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 1), 0px 2px 8px 0px rgba(0, 0, 0, 0.12)` }} />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              ))}
              <div className="pt-4 border-t border-white/5 mt-2">
                <Button className="w-full rounded-lg bg-white text-[#808080] hover:bg-gray-50 border border-[#e8e8e8] font-semibold text-sm h-11">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function getScrollY(event: unknown): number {
  if (!event || typeof event !== "object") return 0;
  const e = event as Record<string, unknown>;
  const scroll = e.scroll as Record<string, unknown> | undefined;
  if (!scroll) return 0;

  if (typeof scroll.y === "number") return scroll.y;

  const instance = scroll.instance as Record<string, unknown> | undefined;
  const nestedScroll = instance?.scroll as Record<string, unknown> | undefined;

  return typeof nestedScroll?.y === "number" ? nestedScroll.y : 0;
}
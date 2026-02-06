"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useLocomotiveScroll } from "@/components/providers/locomotive-scroll-provider";

const navItems = [
  { id: "home", label: "Home" },
  { id: "features", label: "Features" },
  { id: "interface", label: "Interface" },
  { id: "benefits", label: "Benefits" },
  { id: "testimonials", label: "Testimonials" },
] as const;

type NavItemId = (typeof navItems)[number]["id"];

const centerNavVariants = {
  expanded: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 520,
      damping: 26,
      mass: 1,
    },
  },
  compact: {
    y: 0,
    scale: 0.94,
    opacity: 1,
    transition: {
      type: "tween",
      ease: [0.22, 1, 0.36, 1],
      duration: 0.22,
    },
  },
  hidden: {
    y: -28,
    scale: 0.94,
    opacity: 0,
    transition: {
      type: "tween",
      ease: [0.22, 1, 0.36, 1],
      duration: 0.26,
    },
  },
} satisfies Variants;

const sideVariants = {
  expanded: {
    opacity: 1,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
  },
  compact: {
    opacity: 0,
    transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] },
  },
  hidden: {
    opacity: 0,
    transition: { duration: 0.12, ease: [0.22, 1, 0.36, 1] },
  },
} satisfies Variants;

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mode, setMode] = useState<"expanded" | "compact" | "hidden">(
    "expanded",
  );
  const [activeSection, setActiveSection] = useState<NavItemId>("home");
  const { scroll, isReady } = useLocomotiveScroll();
  const navRef = useRef<HTMLElement | null>(null);
  const lastScrollYRef = useRef(0);
  const modeRef = useRef<"expanded" | "compact" | "hidden">("expanded");
  const activeSectionRef = useRef<NavItemId>("home");
  const lockExpandedUntilRef = useRef(0);
  const lockActiveUntilRef = useRef(0);
  const lockActiveIdRef = useRef<NavItemId | null>(null);
  const activeRafRef = useRef<number | null>(null);
  const sectionsRef = useRef<Array<{ id: NavItemId; el: HTMLElement }>>([]);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    if (!isReady) return;

    const setModeIfChanged = (nextMode: "expanded" | "compact" | "hidden") => {
      if (modeRef.current === nextMode) return;
      modeRef.current = nextMode;
      setMode(nextMode);
      if (nextMode === "hidden") setIsMobileMenuOpen(false);
    };

    const refreshSections = () => {
      sectionsRef.current = navItems
        .map((item) => {
          const el = document.getElementById(item.id);
          if (!el) return null;
          return { id: item.id, el };
        })
        .filter(Boolean) as Array<{ id: NavItemId; el: HTMLElement }>;
    };

    const computeActiveFromY = (y: number) => {
      const now = performance.now();
      if (now < lockActiveUntilRef.current && lockActiveIdRef.current) {
        return lockActiveIdRef.current;
      }

      if (sectionsRef.current.length === 0) refreshSections();
      if (sectionsRef.current.length === 0) return "home";

      const navHeight = navRef.current?.getBoundingClientRect().height ?? 0;
      const thresholdAbs = y + navHeight + 24;

      const sectionsWithAbsTop = sectionsRef.current
        .map((section) => ({
          id: section.id,
          absTop: y + section.el.getBoundingClientRect().top,
        }))
        .sort((a, b) => a.absTop - b.absTop);

      let bestId = sectionsWithAbsTop[0]?.id ?? "home";
      for (const section of sectionsWithAbsTop) {
        if (section.absTop <= thresholdAbs + 1) bestId = section.id;
      }

      return bestId;
    };

    const scheduleActiveUpdate = (y: number) => {
      if (activeRafRef.current !== null) return;
      activeRafRef.current = window.requestAnimationFrame(() => {
        activeRafRef.current = null;
        const nextActive = computeActiveFromY(y);
        if (activeSectionRef.current === nextActive) return;
        activeSectionRef.current = nextActive;
        setActiveSection(nextActive);
      });
    };

    const updateFromY = (currentY: number) => {
      const lastY = lastScrollYRef.current;
      const delta = currentY - lastY;
      lastScrollYRef.current = currentY;

      if (performance.now() < lockExpandedUntilRef.current) {
        setModeIfChanged("expanded");
        return;
      }

      if (currentY <= 8) {
        setModeIfChanged("expanded");
        return;
      }

      if (Math.abs(delta) < 2) return;

      if (delta > 0) {
        if (currentY > 96) {
          setModeIfChanged("hidden");
          return;
        }
        setModeIfChanged("compact");
        return;
      }

      setModeIfChanged("expanded");
    };

    const handleWindowScroll = () => {
      const y = window.scrollY || 0;
      updateFromY(y);
      scheduleActiveUpdate(y);
    };

    lastScrollYRef.current = window.scrollY || 0;
    refreshSections();
    scheduleActiveUpdate(lastScrollYRef.current);

    if (scroll?.on && scroll?.off) {
      const handleLocoScroll = (args: unknown) => {
        const y = getScrollYFromLocomotiveEvent(args);
        if (y === null) return;
        updateFromY(y);
        scheduleActiveUpdate(y);
      };

      scroll.on("scroll", handleLocoScroll);
      return () => {
        scroll.off?.("scroll", handleLocoScroll);
        if (activeRafRef.current !== null)
          window.cancelAnimationFrame(activeRafRef.current);
      };
    }

    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
      if (activeRafRef.current !== null)
        window.cancelAnimationFrame(activeRafRef.current);
    };
  }, [isReady, scroll]);

  const handleNavClick =
    (id: NavItemId) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();

      const targetEl = document.getElementById(id);
      window.history.pushState(null, "", `#${id}`);

      if (targetEl) {
        activeSectionRef.current = id;
        setActiveSection(id);
        lockExpandedUntilRef.current = performance.now() + 1600;
        lockActiveIdRef.current = id;
        lockActiveUntilRef.current = performance.now() + 1700;
        modeRef.current = "expanded";
        setMode("expanded");

        const navHeight = navRef.current?.getBoundingClientRect().height ?? 0;
        const offset = -(navHeight + 24);

        if (scroll?.scrollTo) {
          scroll.scrollTo(targetEl, {
            duration: 1.35,
            easing: [0.22, 1, 0.36, 1],
            offset,
          });
        } else {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      setIsMobileMenuOpen(false);
    };

  return (
    <nav
      ref={(node) => {
        navRef.current = node;
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between py-6 max-w-7xl mx-auto"
    >
      <motion.div
        initial={false}
        animate={mode}
        variants={sideVariants}
        style={{ pointerEvents: mode === "expanded" ? "auto" : "none" }}
        className="flex items-center gap-2 relative z-50"
      >
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-white flex items-center gap-2"
        >
          <Image
            src="/assets/logo/ProsharLogo.svg"
            alt="Proshar Logo"
            width={120}
            height={40}
            className="w-auto h-8"
          />
        </Link>
      </motion.div>

      {/* Desktop Menu - Exact Design Match */}
      <motion.div
        initial={false}
        animate={mode}
        variants={centerNavVariants}
        style={{
          transformOrigin: "top center",
          background: "rgba(255, 255, 255, 0.06)",
          backdropFilter: "blur(24px) saturate(150%)",
          WebkitBackdropFilter: "blur(24px) saturate(150%)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: `
            inset 0 1px 0 0 rgba(255, 255, 255, 0.1),
            inset 1px 2px 0px -1px rgba(255, 255, 255, 0.15),
            inset -1px -1px 0px -0.5px rgba(255, 255, 255, 0.1),
            0px 4px 20px 0px rgba(0, 0, 0, 0.15),
            0px 1px 3px 0px rgba(0, 0, 0, 0.1)
          `,
        }}
        className="hidden md:flex items-center gap-0 p-[6px] rounded-full relative overflow-hidden"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <Link
              key={item.id}
              href={`#${item.id}`}
              onClick={handleNavClick(item.id)}
              className={cn(
                "relative isolate overflow-hidden px-[26px] py-[12px] rounded-full text-[17px] font-normal transition-all duration-300",
                isActive 
                  ? "text-[#1a1a1a]" 
                  : "text-white/90 hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="desktop-nav-pill"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 30,
                    mass: 0.8
                  }}
                  className="absolute inset-0 -z-10 rounded-full"
                  style={{
                    background: "rgba(255, 255, 255, 0.95)",
                    boxShadow: `
                      inset 0 1px 0 0 rgba(255, 255, 255, 1),
                      inset 0 -1px 0 0 rgba(0, 0, 0, 0.04),
                      0px 2px 8px 0px rgba(0, 0, 0, 0.12),
                      0px 1px 2px 0px rgba(0, 0, 0, 0.08)
                    `,
                  }}
                />
              )}
              <span className="relative z-10 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </motion.div>

      <div className="flex items-center gap-4 relative z-50">
        <motion.div
          initial={false}
          animate={mode}
          variants={sideVariants}
          style={{ pointerEvents: mode === "expanded" ? "auto" : "none" }}
          className="hidden md:flex"
        >
          <Button className="rounded-[8px] w-[132px] bg-white text-[#808080] hover:bg-gray-50 border border-[#e8e8e8] font-semibold text-sm h-[44px]">
            Get Started
          </Button>
        </motion.div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-white hover:bg-white/10 rounded-full transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 right-0 bg-[#0B0B0F]/95 backdrop-blur-2xl border-b border-white/10 p-6 pt-24 md:hidden shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.4)]"
          >
            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={handleNavClick(item.id)}
                    className={cn(
                      "relative isolate overflow-hidden text-lg font-medium px-5 py-3 rounded-full transition-all block",
                      isActive
                        ? "bg-white/95 text-[#1a1a1a]"
                        : "text-gray-300 hover:text-white hover:bg-white/5",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="mobile-nav-pill"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        className="absolute inset-0 -z-10 rounded-full bg-white/95"
                        style={{
                          boxShadow: `
                            inset 0 1px 0 0 rgba(255, 255, 255, 1),
                            0px 2px 8px 0px rgba(0, 0, 0, 0.12)
                          `,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-white/5 mt-2">
                <Button className="w-full rounded-[8px] bg-white text-[#808080] hover:bg-gray-50 border border-[#e8e8e8] font-semibold text-sm h-[44px]">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
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
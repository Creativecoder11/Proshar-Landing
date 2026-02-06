# Proshar – Modern Pharmacy Management Landing Page

A production-ready, dark-themed landing page for a pharmacy management platform built with Next.js 14+, TypeScript, Tailwind CSS, GSAP, Framer Motion, and Locomotive Scroll.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP (ScrollTrigger), Framer Motion, Locomotive Scroll
- **UI:** Lucide React icons, CVA (class-variance-authority), clsx, tailwind-merge

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

### Lint

```bash
npm run lint
```

## Project Structure

```
src/
├── app/              # Next.js App Router (layout, page, globals.css)
├── components/
│   ├── sections/     # Landing page sections (Hero, Features, Stats, etc.)
│   ├── ui/           # Reusable UI (Button, Card, Container, GradientText)
│   ├── Header.tsx
│   ├── SmoothScroll.tsx
│   └── ClientProviders.tsx
├── hooks/            # useScrollAnimations, useMediaQuery
├── lib/              # utils, constants
└── types/            # TypeScript interfaces
```

## Features

- **Hero:** Animated headline (GSAP), gradient text, CTA buttons, dashboard mockup, trust badges
- **Features Grid:** 6 feature cards with icons, hover effects, scroll-triggered stagger
- **Stats:** Three stat cards, dashboard mockup, CTA
- **Feature Details:** 4 detailed cards with bullet lists
- **Design Showcase:** Side-by-side layout, mobile mockup, capability highlights
- **Interface Features:** Dashboard mockup + feature list with gradient icons
- **Social Proof:** Stats, testimonial carousel, star ratings
- **FAQ:** Accordion with Framer Motion
- **CTA:** Gradient headline, Start Free Trial / Talk to Sales
- **Footer:** Top strip CTA, multi-column links, app badges, social icons

## Design

- **Colors:** Dark background (#0a0a0a), primary purple/pink gradients, orange accent for CTAs
- **Effects:** Glassmorphism, card glow, gradient text, scroll progress bar in header
- **Accessibility:** Reduced motion support, ARIA labels, keyboard navigation, semantic HTML

## Browser Support

- Chrome/Edge, Firefox, Safari (latest 2 versions)
- Mobile Safari, Chrome Mobile

## License

Private – Proshar. All rights reserved.

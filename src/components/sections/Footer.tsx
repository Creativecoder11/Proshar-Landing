'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Twitter,
  Instagram,
  Facebook,
  Linkedin,
  Apple,
  Play,
} from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { FOOTER_LINKS } from '@/lib/constants';

const SOCIAL_LINKS = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      {/* Top strip: Get started today + CTA */}
      <div className="border-b border-white/10 bg-white/[0.02] py-6">
        <Container>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-lg font-medium text-white">
              Get started today
            </p>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="accent" size="lg">
                Start Free Trial
              </Button>
            </motion.div>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold">
              proshar
            </Link>
            <p className="mt-4 max-w-sm text-sm text-zinc-400">
              Modern pharmacy management platform. Streamline workflows, enhance
              patient care, and boost profitability.
            </p>
            <div className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm transition-colors hover:bg-white/10"
              >
                <Apple className="h-5 w-5" />
                App Store
              </a>
              <a
                href="#"
                className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm transition-colors hover:bg-white/10"
              >
                <Play className="h-5 w-5" />
                Google Play
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-4">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h4 className="mb-4 font-semibold">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-sm text-zinc-400 transition-colors hover:text-white"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="text-center text-sm text-zinc-500">
            © 2026 Proshar. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

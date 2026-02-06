import type { Metadata } from 'next';
import { Geist, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/ClientProviders';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});


export const metadata: Metadata = {
  title: 'Proshar - Modern Pharmacy Management Made Simple',
  description:
    'Streamline workflows, enhance patient care, and boost profitability with our intuitive pharmacy management platform.',
  openGraph: {
    title: 'Proshar - Modern Pharmacy Management Made Simple',
    description:
      'Streamline workflows, enhance patient care, and boost profitability with our intuitive pharmacy management platform.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#0a0a0a] font-geist text-white antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

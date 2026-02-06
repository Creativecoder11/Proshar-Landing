'use client';

import { useEffect, useRef } from 'react';
import 'locomotive-scroll/dist/locomotive-scroll.css';

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollInstanceRef = useRef<{ destroy: () => void } | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initScroll = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      scrollInstanceRef.current = new LocomotiveScroll({
        lenisOptions: {
          smoothWheel: true,
          duration: 1.2,
        },
        autoStart: true,
      }) as unknown as { destroy: () => void };
    };

    initScroll();

    return () => {
      scrollInstanceRef.current?.destroy();
      scrollInstanceRef.current = null;
    };
  }, []);

  return <>{children}</>;
}

'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to reporting service in production
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
      <Container>
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold text-white">
            Something went wrong
          </h1>
          <p className="mt-2 text-zinc-400">
            We&apos;re sorry, but something unexpected happened. Please try
            again.
          </p>
          <Button onClick={reset} className="mt-6">
            Try again
          </Button>
        </div>
      </Container>
    </div>
  );
}

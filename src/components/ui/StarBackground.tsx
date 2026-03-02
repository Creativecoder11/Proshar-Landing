"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  twinkleDuration: number;
  twinkleDelay: number;
}

export default function StarBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [isHydrated, setIsHydrated] = useState(false); // for preventing hydration mismatch

  useEffect(() => {
    const starCount = 75; // Number of stars
    const newStars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const duration = Math.random() * 30 + 15; // 15s to 45s for movement
      newStars.push({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 3 + 1, // 1px to 4px
        duration: duration,
        delay: -1 * (Math.random() * duration), // Negative delay to start mid-flight
        twinkleDuration: Math.random() * 3 + 2, // 2s to 5s for twinkle
        twinkleDelay: Math.random() * 5,
      });
    }

    setStars(newStars);
    setIsHydrated(true); // After the stars are set, mark hydration complete

    return () => {};
  }, []);

  // Return null on server/initial render to avoid hydration mismatch
  if (!isHydrated) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full will-change-transform"
          style={{
            left: `${star.left}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            // Combined animation using transform for GPU acceleration
            animation: `rise ${star.duration}s linear ${star.delay}s infinite, twinkle ${star.twinkleDuration}s ease-in-out ${star.twinkleDelay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
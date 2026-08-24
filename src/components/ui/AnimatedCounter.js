'use client';

import { useEffect, useState } from 'react';

export default function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Easing function (easeOutQuart)
      const easeOutQuart = 1 - Math.pow(1 - progress / duration, 4);
      
      if (progress < duration) {
        setCount(Math.min(end, end * easeOutQuart));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  // Format number with commas
  const formattedCount = Math.floor(count).toLocaleString();

  return (
    <span>
      {prefix}{formattedCount}{suffix}
    </span>
  );
}

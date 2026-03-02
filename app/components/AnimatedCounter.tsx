"use client";

import { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  value: string | number;
}

export default function AnimatedCounter({ value }: AnimatedCounterProps) {
  const num = typeof value === "number" ? value : parseInt(value as string) || 0;
  const suffix = typeof value === "string" ? value.replace(/[\d.]+/, "") : "";
  const [currentValue, setCurrentValue] = useState<number>(0);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [key, setKey] = useState<number>(0);
  const ref = useRef<HTMLParagraphElement>(null);

  // Detect when section is in view
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    },
    { threshold: 0.1 }
  );

  const currentRef = ref.current;
  if (currentRef) observer.observe(currentRef);

  return () => {
    if (currentRef) observer.unobserve(currentRef);
  };
}, []);

  useEffect(() => {
    if (!isInView) return;

    // Initial animation
    const initialTimer = setTimeout(() => {
      const step = num / 20;
      let current = 0;
      const interval = setInterval(() => {
        current += step;
        if (current >= num) {
          current = num;
          clearInterval(interval);
        }
        setCurrentValue(current);
      }, 100);
    }, 100);

    // Loop every 5s after first animation
    const loopInterval = setInterval(() => {
      setKey((prev) => prev + 1);
      setCurrentValue(0);

      setTimeout(() => {
        const step = num / 20;
        let current = 0;
        const animateInterval = setInterval(() => {
          current += step;
          if (current >= num) {
            current = num;
            clearInterval(animateInterval);
          }
          setCurrentValue(current);
        }, 100);
      }, 50);
    }, 5000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(loopInterval);
    };
  }, [isInView, num]);

  const displayValue = Math.min(Math.round(currentValue), num) + suffix;

  return (
    <p
      ref={ref}
      key={key}
      className="text-xl font-bold text-primary sm:text-4xl md:text-5xl transition-all duration-300 ease-out stats-animate"
      style={{
        opacity: currentValue === 0 ? 0.7 : 1,
        transform: currentValue === 0 ? "scale(0.95)" : "scale(1)",
      }}
    >
      {displayValue}
    </p>
  );
}
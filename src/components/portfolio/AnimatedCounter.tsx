import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 1.8 }: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const target = parseInt(value.replace(/\D/g, ""), 10) || 0;
    if (target === 0) {
      setCount(0);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const runtime = timestamp - startTime;
            const progress = Math.min(runtime / (duration * 1000), 1);
            // Easing out quadratic curve
            const easeProgress = progress * (2 - progress);
            const current = Math.floor(easeProgress * target);
            setCount(current);
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [value, duration]);

  const suffix = value.replace(/\d/g, "");
  return <span ref={ref}>{count}{suffix}</span>;
}

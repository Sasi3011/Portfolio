import { useEffect, useRef, useState } from "react";

const MOBILE_DOTS = 28;
const DESKTOP_DOTS = 48;
const CONNECT_RADIUS = 110;

export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (!reduced && !coarse) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const dotCount = window.innerWidth < 768 ? MOBILE_DOTS : DESKTOP_DOTS;

    const dots = Array.from({ length: dotCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.6 + 0.4,
    }));

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) tick();
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.fillStyle = "rgba(96, 165, 250, 0.55)";
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      const maxDistSq = CONNECT_RADIUS * CONNECT_RADIUS;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < maxDistSq) {
            const d = Math.sqrt(distSq);
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - d / CONNECT_RADIUS)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);

  if (!enabled) return null;

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 -z-10 opacity-45" />;
}

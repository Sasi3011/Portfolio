import { useEffect } from "react";
import Lenis from "lenis";
import Particles from "./portfolio/Particles";
import Nav from "./portfolio/Nav";
import Hero from "./portfolio/Hero";
import DeferredSection from "./portfolio/DeferredSection";

export default function Portfolio() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReduced || coarsePointer) return;

    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      infinite: false,
    });

    let rafId = 0;
    let running = true;

    function raf(time: number) {
      if (!running) return;
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) rafId = requestAnimationFrame(raf);
      else cancelAnimationFrame(rafId);
    };

    document.addEventListener("visibilitychange", onVisibility);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link && link.hash && link.hash.startsWith("#")) {
        e.preventDefault();
        const element = document.querySelector(link.hash);
        if (element) {
          lenis.scrollTo(element as HTMLElement, { offset: -80 });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      document.removeEventListener("visibilitychange", onVisibility);
      lenis.destroy();
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Particles />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <DeferredSection name="about" minHeight="85dvh" rootMargin="480px 0px" />
        <DeferredSection name="skills" minHeight="70dvh" />
        <DeferredSection name="projects" minHeight="80dvh" />
        <DeferredSection name="experience" minHeight="65dvh" />
        <DeferredSection name="achievements" minHeight="85dvh" />
        <DeferredSection name="coding" minHeight="75dvh" />
        <DeferredSection name="why" minHeight="55dvh" />
        <DeferredSection name="vision" minHeight="80dvh" />
        <DeferredSection name="contact" minHeight="75dvh" />
        <DeferredSection name="footer" minHeight="20dvh" rootMargin="120px 0px" />
      </main>
    </div>
  );
}

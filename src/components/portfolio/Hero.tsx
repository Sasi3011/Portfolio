import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from "framer-motion";
import {
  Download,
  Code,
  Palette,
  Braces,
  Terminal,
  Cpu,
  Globe,
  MousePointer2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import MockIDE from "./MockIDE";



const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const MARQUEE_ITEMS = [
  { Icon: Code, text: "Full Stack Development", color: "text-blue-600 border-blue-500/30 bg-blue-500/8" },
  { Icon: Palette, text: "UI/UX Design", color: "text-pink-600 border-pink-500/30 bg-pink-500/8" },
  { Icon: Terminal, text: "Clean Code", color: "text-emerald-600 border-emerald-500/30 bg-emerald-500/8" },
  { Icon: Braces, text: "React & Node.js", color: "text-cyan-600 border-cyan-500/30 bg-cyan-500/8" },
  { Icon: Sparkles, text: "Product Design", color: "text-amber-600 border-amber-500/30 bg-amber-500/8" },
  { Icon: Cpu, text: "Scalable Systems", color: "text-violet-600 border-violet-500/30 bg-violet-500/8" },
  { Icon: Globe, text: "Web Applications", color: "text-sky-600 border-sky-500/30 bg-sky-500/8" },
  { Icon: MousePointer2, text: "Interactive Prototypes", color: "text-rose-600 border-rose-500/30 bg-rose-500/8" },
];

function MarqueeStrip({ items, duration = "35s" }: { items: typeof MARQUEE_ITEMS; duration?: string }) {
  return (
    <div className="marquee-mask absolute bottom-0 left-0 right-0 overflow-hidden border-t border-primary/10 bg-primary/5 py-2 sm:py-3.5 flex-shrink-0 z-10 w-full select-none animate-fade-in flex">
      <div
        className="marquee-track flex shrink-0 items-center"
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {items.map(({ Icon, text, color }, i) => (
          <span
            key={`${text}-${i}`}
            className="inline-flex shrink-0 items-center gap-2.5 px-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[10px] mr-12 sm:mr-16"
          >
            <span className={`grid h-6 w-6 place-items-center rounded-md border ${color}`}>
              <Icon className="h-3 w-3" strokeWidth={2} />
            </span>
            <span>{text}</span>
          </span>
        ))}
      </div>
      <div
        className="marquee-track flex shrink-0 items-center"
        style={{ "--marquee-duration": duration } as React.CSSProperties}
      >
        {items.map(({ Icon, text, color }, i) => (
          <span
            key={`${text}-dup-${i}`}
            className="inline-flex shrink-0 items-center gap-2.5 px-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:text-[10px] mr-12 sm:mr-16"
          >
            <span className={`grid h-6 w-6 place-items-center rounded-md border ${color}`}>
              <Icon className="h-3 w-3" strokeWidth={2} />
            </span>
            <span>{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const [isSwapped, setIsSwapped] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleCursorMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = containerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Map mouse position to degree rotation [-10, 10]
    const rX = -(mouseY / (height / 2)) * 10;
    const rY = (mouseX / (width / 2)) * 10;
    
    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };



  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-[100dvh] snap-start flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-28 sm:px-6 sm:pb-32 md:px-10 md:pt-32 md:pb-36"
    >
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
      <motion.div style={{ y }} className="absolute -top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-primary/25 blur-[120px]" />
      <motion.div style={{ y: y2 }} className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-accent/15 blur-[100px]" />

      <motion.div style={{ opacity }} className="relative mx-auto flex w-full max-w-[1400px] flex-col items-center px-2 sm:px-4">
        <motion.div initial="hidden" animate="show" variants={stagger} className="grid w-full items-center gap-10 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Typography */}
          <div className="flex flex-col items-start text-left lg:col-span-7">
            <motion.p variants={fadeUp} className="text-sm tracking-wide text-muted-foreground md:text-base">
              Hello - I&apos;m <span className="font-medium text-foreground">Sasikiran T.T.</span>
            </motion.p>

            <motion.h1 variants={fadeUp} className="hero-headline mt-4 font-bold select-none">
              {/* Full Stack Developer row */}
              <div
                className="relative lg:cursor-none"
                onMouseEnter={() => setShowCursor(true)}
                onMouseLeave={() => setShowCursor(false)}
                onMouseMove={handleCursorMove}
              >
                {/* Solid Gradient version */}
                <span
                  className={`block text-[clamp(1.75rem,5.5vw,4.8rem)] leading-[1.12] tracking-[0.03em] text-gradient transition-opacity duration-500 ${
                    isSwapped ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  Full Stack Developer
                </span>
                {/* Outline version */}
                <span
                  className={`absolute inset-0 block text-[clamp(1.75rem,5.5vw,4.8rem)] leading-[1.12] tracking-[0.03em] text-outline-blue transition-opacity duration-500 ${
                    isSwapped ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  Full Stack Developer
                </span>
              </div>

              {/* & UI/UX Designer row */}
              <div
                className="relative mt-2 lg:cursor-none sm:mt-3"
                onMouseEnter={() => {
                  setIsSwapped(true);
                  setShowCursor(true);
                }}
                onMouseLeave={() => {
                  setIsSwapped(false);
                  setShowCursor(false);
                }}
                onMouseMove={handleCursorMove}
              >
                {/* Outline version */}
                <span
                  className={`block text-[clamp(1.75rem,5.5vw,4.8rem)] leading-[1.12] tracking-[0.03em] text-outline-blue transition-opacity duration-500 ${
                    isSwapped ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  &amp; UI/UX Designer
                </span>
                {/* Solid Gradient version */}
                <span
                  className={`absolute inset-0 block text-[clamp(1.75rem,5.5vw,4.8rem)] leading-[1.12] tracking-[0.03em] text-gradient transition-opacity duration-500 ${
                    isSwapped ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  &amp; UI/UX Designer
                </span>
              </div>

              {/* Custom Follower Cursor */}
              <AnimatePresence>
                {showCursor && (
                  <motion.div
                    className="pointer-events-none fixed z-[9999] flex h-12 w-12 items-center justify-center rounded-full border border-primary bg-background/90 text-primary shadow-[0_0_20px_rgba(59,130,246,0.35)] backdrop-blur-md"
                    style={{
                      left: mousePos.x,
                      top: mousePos.y,
                      x: "-50%",
                      y: "-50%",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 450, damping: 25 }}
                  >
                    <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="prose-body mt-6 max-w-2xl text-sm text-muted-foreground sm:text-base md:text-lg"
            >
              I design intuitive interfaces and build production-ready full-stack applications - from Figma wireframes to deployed web apps.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-full border border-primary/40 px-5 py-2.5 text-xs font-semibold text-foreground transition hover:border-primary hover:bg-primary/10 sm:px-6 sm:py-3 sm:text-sm bg-primary/5 shadow-[0_0_15px_rgba(59,130,246,0.15)] glow-sm"
              >
                Get in Touch
              </motion.a>
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.04 }}
                className="hidden items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/45 hover:bg-primary/10 sm:inline-flex shadow-sm"
              >
                <Download className="h-4 w-4" /> Resume
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column: Holographic mock IDE terminal console */}
          <motion.div
            variants={scaleIn}
            className="flex w-full items-center justify-center lg:col-span-5"
          >
            <div className="relative w-full max-w-[500px]">
              {/* Corner Sci-fi brackets */}
              <div className="pointer-events-none absolute -top-3.5 -left-3.5 h-6 w-6 border-t-2 border-l-2 border-primary/30" />
              <div className="pointer-events-none absolute -top-3.5 -right-3.5 h-6 w-6 border-t-2 border-r-2 border-primary/30" />
              <div className="pointer-events-none absolute -bottom-3.5 -left-3.5 h-6 w-6 border-b-2 border-l-2 border-primary/30" />
              <div className="pointer-events-none absolute -bottom-3.5 -right-3.5 h-6 w-6 border-b-2 border-r-2 border-primary/30" />
              
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-accent opacity-15 blur-xl transition-all duration-300 group-hover:opacity-40" />
              
              {/* 3D tilt component */}
              <motion.div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative cursor-pointer transition-all duration-200 ease-out hover:glow-cyan"
              >
                <div style={{ transform: "translateZ(20px)" }}>
                  <MockIDE />
                </div>
              </motion.div>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
      <MarqueeStrip items={MARQUEE_ITEMS} duration="45s" />
    </section>
  );
}

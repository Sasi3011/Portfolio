import { motion } from "framer-motion";
import {
  Brain,
  Globe,
  GraduationCap,
  Heart,
  Leaf,
  Lightbulb,
  Rocket,
  Sparkles,
  Users,
} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const ease = [0.22, 1, 0.36, 1] as const;

const journeyBeats = [
  {
    Icon: Lightbulb,
    title: "Where it started",
    text: "A curiosity for technology grew into a calling — I didn't just want to use tools, I wanted to build things that matter.",
    accent: "#F59E0B",
  },
  {
    Icon: Rocket,
    title: "Building Techno Vanam",
    text: "I founded Techno Vanam to turn that calling into action — a space where ideas become products and teams grow together.",
    accent: "#10B981",
  },
  {
    Icon: Heart,
    title: "Why it matters",
    text: "Technology should open doors, not create barriers. Every product we ship is a step toward empowering someone else's journey.",
    accent: "#EC4899",
  },
];

const technoVanamFocus = [
  { Icon: Globe, label: "Web Applications", desc: "Scalable products built for real users" },
  { Icon: Brain, label: "AI-Powered Platforms", desc: "Intelligent tools that solve complex problems" },
  { Icon: GraduationCap, label: "Educational Technology", desc: "Learning experiences that unlock potential" },
];

export default function Vision() {
  return (
    <Section id="vision">
      <SectionTitle line1="ENTREPRENEURIAL" line2="JOURNEY" align="right" />

      <p className="-mt-6 mb-8 max-w-xl text-left text-sm leading-relaxed text-muted-foreground sm:mb-10 sm:text-right sm:text-[15px] md:ml-auto">
        From a student with a dream to a founder building for impact — this is the story behind Techno Vanam.
      </p>

      <div className="panel-glow overflow-hidden rounded-2xl border border-primary/20 bg-white/70 shadow-[0_8px_32px_-12px_rgba(59,130,246,0.08)]">
        <div className="border-b border-primary/15 bg-gradient-to-r from-emerald-500/[0.06] via-primary/[0.04] to-violet-500/[0.06] px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Leaf className="h-4 w-4 text-emerald-600" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                Founder Story
              </span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-600">
              Techno Vanam
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 md:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Narrative */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
              className="lg:col-span-7"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                Sasikiran T.T.
              </p>
              <h3 className="hero-headline mt-2 text-2xl font-bold tracking-[0.03em] text-slate-900 sm:text-3xl md:text-4xl">
                Founder &amp; CEO,{" "}
                <span className="text-gradient">Techno Vanam</span>
              </h3>

              <div className="mt-6 space-y-5 text-sm leading-relaxed text-slate-600 sm:text-[15px] sm:leading-[1.75]">
                <p>
                  My entrepreneurial journey didn&apos;t begin in a boardroom — it began with a quiet belief that
                  technology, when built with heart, can change lives. I am{" "}
                  <span className="font-semibold text-foreground">Sasikiran T.T.</span>, and that belief led me to
                  found <span className="font-semibold text-emerald-700">Techno Vanam</span>.
                </p>
                <p>
                  What started as a passion for innovation became a mission: to create digital solutions that solve
                  real-world problems — not for the sake of building, but because someone out there needs what we
                  are making.
                </p>
                <p>
                  Through Techno Vanam, I&apos;ve led teams across web applications, AI-powered platforms, and
                  educational technology — learning every day, shipping with purpose, and turning raw ideas into
                  products people can actually use.
                </p>
              </div>

              <blockquote className="relative mt-8 border-l-2 border-emerald-500/50 pl-5 sm:pl-6">
                <Sparkles className="absolute -left-3 top-0 h-5 w-5 text-emerald-500/80 bg-white rounded-full" />
                <p className="text-base italic leading-relaxed text-slate-700 sm:text-lg">
                  &ldquo;My goal isn&apos;t just to build software — it&apos;s to empower businesses and individuals
                  through technology, and to create meaningful opportunities for growth and innovation along the
                  way.&rdquo;
                </p>
                <footer className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  — Sasikiran T.T., Founder &amp; CEO
                </footer>
              </blockquote>
            </motion.div>

            {/* Techno Vanam card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
              className="lg:col-span-5"
            >
              <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-50/80 via-white to-primary/[0.03] p-6 shadow-[0_16px_40px_-24px_rgba(16,185,129,0.25)] sm:p-7">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-400/15 blur-3xl"
                />

                <div className="relative">
                  <div className="mb-5 flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10 shadow-sm">
                      <Leaf className="h-6 w-6 text-emerald-600" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Techno Vanam</h4>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-emerald-600">
                        Technology · Growth · Impact
                      </p>
                    </div>
                  </div>

                  <p className="mb-6 text-sm leading-relaxed text-slate-600">
                    Techno Vanam is where purpose meets engineering — a company built to design, develop, and deliver
                    technology that helps people learn, work, and grow with confidence.
                  </p>

                  <div className="space-y-3">
                    {technoVanamFocus.map(({ Icon, label, desc }) => (
                      <div
                        key={label}
                        className="flex items-start gap-3 rounded-xl border border-white/80 bg-white/70 px-3.5 py-3 shadow-sm"
                      >
                        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-emerald-500/15 bg-emerald-500/8">
                          <Icon className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex items-center gap-2 rounded-xl border border-emerald-500/15 bg-emerald-500/[0.06] px-3.5 py-3">
                    <Users className="h-4 w-4 shrink-0 text-emerald-600" />
                    <p className="text-xs leading-relaxed text-slate-600">
                      Leading teams, learning continuously, and turning ambitious ideas into reality — together.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Journey beats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
            {journeyBeats.map(({ Icon, title, text, accent }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
                className="relative overflow-hidden rounded-xl border border-primary/10 bg-white/60 p-5 backdrop-blur-sm"
              >
                <div
                  className="absolute inset-x-0 top-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }}
                />
                <div
                  className="mb-3 grid h-9 w-9 place-items-center rounded-lg border bg-white"
                  style={{ borderColor: `${accent}30`, color: accent }}
                >
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.75} />
                </div>
                <h5 className="text-sm font-bold text-slate-900">{title}</h5>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{text}</p>
              </motion.div>
            ))}
          </div>

          {/* Closing strip */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex items-start gap-3 rounded-xl border border-primary/10 bg-primary/[0.04] px-4 py-4 sm:items-center sm:px-5 sm:py-4"
          >
            <Heart className="mt-0.5 h-4 w-4 shrink-0 text-rose-500 sm:mt-0" />
            <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              This journey is still being written — and I&apos;d love for your story to be part of it. Whether
              you&apos;re a client, collaborator, or fellow builder, let&apos;s create something that lasts.
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

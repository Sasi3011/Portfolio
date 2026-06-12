import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Brain,
  GitBranch,
  Globe,
  GraduationCap,
  Terminal,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const ease = [0.22, 1, 0.36, 1] as const;

const focuses = [
  {
    Icon: Globe,
    label: "web-apps",
    color: "text-sky-600 bg-sky-50 border-sky-200",
  },
  {
    Icon: Brain,
    label: "ai-platforms",
    color: "text-violet-600 bg-violet-50 border-violet-200",
  },
  {
    Icon: GraduationCap,
    label: "edtech",
    color: "text-amber-600 bg-amber-50 border-amber-200",
  },
  {
    Icon: Users,
    label: "team-lead",
    color: "text-rose-600 bg-rose-50 border-rose-200",
  },
  {
    Icon: Zap,
    label: "product-design",
    color: "text-cyan-600 bg-cyan-50 border-cyan-200",
  },
  {
    Icon: TrendingUp,
    label: "growth",
    color: "text-emerald-600 bg-emerald-50 border-emerald-200",
  },
];

const stats = [
  { value: "2023", label: "Founded", key: "founded_at" },
  { value: "3+", label: "Products", key: "shipped" },
  { value: "10+", label: "Team", key: "team_size" },
  { value: "∞", label: "Ambition", key: "ambition" },
];

export default function Vision() {
  return (
    <Section id="vision">
      <SectionTitle line1="ENTREPRENEURIAL" line2="JOURNEY" align="right" />

      <p className="-mt-6 mb-12 max-w-xl text-left text-sm leading-relaxed text-muted-foreground sm:text-right sm:text-[15px] md:ml-auto">
        From a student with a dream to a founder building for impact — this is
        the story behind Techno Vanam.
      </p>

      <div className="w-full space-y-4">
        {/* ── ROW 1: IDE-style header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          {/* IDE title bar */}
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1">
              <Terminal className="h-3 w-3 text-slate-400" />
              <span className="font-mono text-[10px] text-slate-500">
                techno-vanam / README.md
              </span>
            </div>
            <div className="flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
              </span>
              <span className="font-mono text-[9px] font-semibold uppercase tracking-widest text-green-700">
                active
              </span>
            </div>
          </div>

          {/* Tabs bar */}
          <div className="flex items-center gap-0 border-b border-slate-200 bg-slate-50/60 px-4">
            {["README.md", "about.ts", "vision.json"].map((tab, i) => (
              <div
                key={tab}
                className={`border-r border-slate-200 px-4 py-2 font-mono text-[10px] ${
                  i === 0
                    ? "border-b-2 border-b-green-500 bg-white text-slate-700"
                    : "text-slate-400"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="flex flex-col gap-8 p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
              <img
                src="/Green Text With TM.png"
                alt="Techno Vanam"
                className="mb-5 h-10 sm:h-12 w-auto object-contain"
              />
              {/* Code-style tagline */}
              <div className="mb-2 font-mono text-sm text-slate-400">
                <span className="text-violet-500">const</span>{" "}
                <span className="text-sky-600">mission</span>{" "}
                <span className="text-slate-500">=</span>{" "}
              </div>
              <h3 className="hero-headline text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
                Building tech{" "}
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #16a34a 0%, #4ade80 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  that matters.
                </span>
              </h3>
              <div className="mt-1 font-mono text-sm text-slate-400">
                <span className="text-slate-400">;</span>
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-500 sm:text-[15px]">
                Designing, developing &amp; delivering technology that helps
                people learn, work, and grow with confidence.
              </p>
              <a
                href="#contact"
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-green-300 bg-green-600 px-5 py-2.5 font-mono text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
              >
                ./connect --now <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* Stats as key-value pairs */}
            <div className="w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs lg:w-64 lg:shrink-0">
              <div className="border-b border-slate-200 bg-white px-4 py-2 text-[10px] uppercase tracking-widest text-slate-400">
                // techno_vanam.json
              </div>
              <div className="divide-y divide-slate-100 p-1">
                {stats.map(({ value, label, key }, i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07, ease }}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5"
                  >
                    <span className="text-slate-400">&quot;{key}&quot;:</span>
                    <span className="font-bold text-green-600">
                      &quot;{value}&quot;
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── ROW 2: Story (editor) + Focuses ── */}
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Story as code file */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-7"
          >
            {/* File tab */}
            <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-50 px-5 py-2.5">
              <GitBranch className="h-3.5 w-3.5 text-green-500" />
              <span className="font-mono text-[10px] text-slate-500">main</span>
              <span className="mx-1 text-slate-300">·</span>
              <span className="font-mono text-[10px] text-slate-500">
                founder_story.md
              </span>
            </div>
            {/* Line-numbered content */}
            <div className="flex text-sm">
              {/* Line numbers */}
              <div className="select-none border-r border-slate-100 bg-slate-50/60 px-3 py-6 text-right font-mono text-[11px] leading-[2.1] text-slate-300">
                {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
                  <div key={n}>{n}</div>
                ))}
              </div>
              {/* Code content */}
              <div className="flex-1 overflow-hidden px-5 py-6 font-mono text-[11px] leading-[2.1] sm:text-xs">
                <div>
                  <span className="text-slate-400"># Founder Story</span>
                </div>
                <div>&nbsp;</div>
                <div>
                  <span className="text-slate-600">
                    My journey didn&apos;t begin in a boardroom — it began with
                    a
                  </span>
                </div>
                <div>
                  <span className="text-slate-600">quiet belief that </span>
                  <span className="rounded bg-green-100 px-1 text-green-700">
                    technology built with heart
                  </span>
                  <span className="text-slate-600"> can</span>
                </div>
                <div>
                  <span className="text-slate-600">change lives. I am </span>
                  <span className="font-bold text-slate-900">
                    Sasikiran T.T.
                  </span>
                </div>
                <div>&nbsp;</div>
                <div>
                  <span className="text-slate-600">Through </span>
                  <span className="font-bold text-green-700">Techno Vanam</span>
                  <span className="text-slate-600">
                    , I&apos;ve led teams shipping web
                  </span>
                </div>
                <div>
                  <span className="text-slate-600">
                    apps, AI platforms, and EdTech products.
                  </span>
                </div>
              </div>
            </div>

            {/* Focus pills at bottom */}
            <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-4">
              <p className="mb-2.5 font-mono text-[9px] uppercase tracking-widest text-slate-400">
                // labels
              </p>
              <div className="flex flex-wrap gap-1.5">
                {focuses.map(({ Icon, label, color }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium ${color}`}
                  >
                    <Icon className="h-3 w-3" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quote as terminal output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 lg:col-span-5"
          >
            {/* Terminal bar */}
            <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100/60 px-5 py-3">
              <Terminal className="h-3.5 w-3.5 text-slate-400" />
              <span className="font-mono text-[10px] text-slate-500">
                vision_statement.sh
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-7 sm:p-8">
              <div>
                <p className="mb-4 font-mono text-[11px] text-slate-500">
                  <span className="text-green-600">$</span> cat vision.txt
                </p>
                <p className="text-lg font-medium italic leading-relaxed text-slate-700 sm:text-xl">
                  &ldquo;My goal isn&apos;t just to build software — it&apos;s
                  to empower businesses and individuals through technology, and
                  to create meaningful opportunities for growth and innovation
                  along the way.&rdquo;
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-slate-200 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white font-bold text-green-600 shadow-sm">
                  S
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Sasikiran T.T.
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                    Founder &amp; CEO · Techno Vanam
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

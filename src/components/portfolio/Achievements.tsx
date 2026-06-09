import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  FileText,
  Folder,
  Medal,
  Rocket,
  Sparkles,
  Trophy,
} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const ease = [0.22, 1, 0.36, 1] as const;

type TabId = "all" | "design" | "innovation";

type Tier = "Winner" | "Finalist" | "Shortlisted";

interface Achievement {
  title: string;
  sub: string;
  category: "Design" | "Innovation";
  tier: Tier;
  year: string;
}

const achievements: Achievement[] = [
  { title: "Design Showdown", sub: "First Place Winner", category: "Design", tier: "Winner", year: "2025" },
  { title: "Design-A-Thon", sub: "First Place · UI/UX Design", category: "Design", tier: "Winner", year: "2025" },
  { title: "MSME Idea Hackathon 5.0", sub: "Finalist", category: "Innovation", tier: "Finalist", year: "2025" },
  { title: "Eureka! 2025", sub: "Zonal Finalist · IIT Bombay E-Cell", category: "Innovation", tier: "Finalist", year: "2025" },
  {
    title: "Smart India Hackathon 2025",
    sub: "Internal Round Shortlisted",
    category: "Innovation",
    tier: "Shortlisted",
    year: "2025",
  },
];

const files = [
  { id: "all" as const, name: "awards.json", icon: FileText, color: "text-amber-600" },
  { id: "design" as const, name: "design-wins.md", icon: FileText, color: "text-pink-600" },
  { id: "innovation" as const, name: "hackathons.ts", icon: FileText, color: "text-violet-600" },
];

function filterAchievements(tab: TabId) {
  if (tab === "design") return achievements.filter((a) => a.category === "Design");
  if (tab === "innovation") return achievements.filter((a) => a.category === "Innovation");
  return achievements;
}

const tierBadge: Record<Tier, string> = {
  Winner: "bg-amber-500/10 text-amber-700 border-amber-500/20",
  Finalist: "bg-violet-500/10 text-violet-700 border-violet-500/20",
  Shortlisted: "bg-sky-500/10 text-sky-700 border-sky-500/20",
};

function renderAllCode() {
  return (
    <div className="font-mono text-[11px] leading-relaxed text-slate-800 sm:text-xs">
      <div>[</div>
      {achievements.map((a, i) => (
        <div key={a.title} className="pl-4">
          <div>&#123;</div>
          <div className="pl-4">
            <span className="text-blue-600">&quot;title&quot;</span>:{" "}
            <span className="text-emerald-600">&quot;{a.title}&quot;</span>,
          </div>
          <div className="pl-4">
            <span className="text-blue-600">&quot;tier&quot;</span>:{" "}
            <span className="text-emerald-600">&quot;{a.tier}&quot;</span>,
          </div>
          <div className="pl-4">
            <span className="text-blue-600">&quot;category&quot;</span>:{" "}
            <span className="text-emerald-600">&quot;{a.category}&quot;</span>,
          </div>
          <div className="pl-4">
            <span className="text-blue-600">&quot;year&quot;</span>:{" "}
            <span className="text-emerald-600">&quot;{a.year}&quot;</span>
          </div>
          <div>&#125;{i < achievements.length - 1 ? "," : ""}</div>
        </div>
      ))}
      <div>]</div>
    </div>
  );
}

function renderDesignCode() {
  const items = filterAchievements("design");
  return (
    <div className="font-mono text-[11px] leading-relaxed text-slate-800 sm:text-xs">
      <div><span className="text-violet-600 font-semibold"># Design Wins</span></div>
      <div>&nbsp;</div>
      {items.map((a) => (
        <div key={a.title}>
          <div>
            <span className="text-amber-600 font-semibold">## {a.title}</span>
          </div>
          <div className="pl-2 text-slate-600">- {a.sub}</div>
          <div className="pl-2 text-slate-400">- tier: {a.tier.toLowerCase()}</div>
          <div>&nbsp;</div>
        </div>
      ))}
    </div>
  );
}

function renderInnovationCode() {
  const items = filterAchievements("innovation");
  return (
    <div className="font-mono text-[11px] leading-relaxed text-slate-800 sm:text-xs">
      <div>
        <span className="text-violet-600 font-semibold">export const</span>{" "}
        <span className="text-blue-600">hackathons</span> = [
      </div>
      {items.map((a, i) => (
        <div key={a.title} className="pl-4">
          &#123; title: <span className="text-emerald-600">&quot;{a.title}&quot;</span>, tier:{" "}
          <span className="text-emerald-600">&quot;{a.tier}&quot;</span> &#125;
          {i < items.length - 1 ? "," : ""}
        </div>
      ))}
      <div>] as const;</div>
    </div>
  );
}

function VisualPreview({ tab }: { tab: TabId }) {
  const items = filterAchievements(tab);
  const wins = items.filter((a) => a.tier === "Winner").length;
  const finals = items.filter((a) => a.tier === "Finalist").length;

  return (
    <div className="flex flex-1 flex-col justify-between rounded-xl border border-primary/10 bg-white/40 p-4 sm:p-5">
      <div>
        <div className="mb-5 flex items-center gap-3 border-b border-primary/10 pb-4">
          <div className="grid h-9 w-9 place-items-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-600">
            <Trophy className="h-4.5 w-4.5" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
              {tab === "all" ? "All Recognition" : tab === "design" ? "Design Wins" : "Innovation Programs"}
            </h3>
            <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
              {items.length} entries · {wins} wins · {finals} finals
            </p>
          </div>
        </div>

        <div className="relative space-y-6 pl-6 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-0.5 before:bg-primary/15">
          {items.map((a) => (
            <div key={a.title} className="relative">
              <div
                className={`absolute -left-[24px] top-[5px] h-4 w-4 rounded-full border ${
                  a.tier === "Winner"
                    ? "border-amber-500 bg-background shadow-[0_0_8px_rgba(245,158,11,0.45)]"
                    : "border-primary/25 bg-primary/5"
                }`}
              />
              <div className="pl-2.5">
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider ${tierBadge[a.tier]}`}
                  >
                    {a.tier}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground/60">
                    {a.year}
                  </span>
                </div>
                <h4 className="text-sm font-bold leading-snug text-foreground sm:text-base">{a.title}</h4>
                <p className="mt-1 text-xs text-muted-foreground sm:text-[13px]">{a.sub}</p>
                {a.tier === "Winner" && (
                  <div className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] text-amber-700">
                    <Medal className="h-3 w-3" />
                    top placement
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 border-t border-primary/10 pt-4 text-xs font-semibold text-primary">
        <Sparkles className="h-3.5 w-3.5 animate-pulse" />
        <span>Competing across design &amp; innovation tracks.</span>
      </div>
    </div>
  );
}

export default function Achievements() {
  const [activeTab, setActiveTab] = useState<TabId>("all");
  const lineCount = activeTab === "all" ? 28 : activeTab === "design" ? 12 : 10;

  return (
    <Section id="achievements">
      <SectionTitle line1="AWARDS &" line2="WINS" align="left" />

      <div className="mt-6 w-full sm:mt-10">
        <div className="panel-glow flex h-auto min-h-0 flex-col overflow-hidden rounded-2xl border border-primary/20 bg-white/70 shadow-[0_8px_32px_-12px_rgba(59,130,246,0.08)] md:min-h-[480px] lg:min-h-[520px] md:flex-row">
          {/* Explorer sidebar */}
          <div className="flex w-full shrink-0 flex-col justify-between border-b border-primary/15 bg-slate-50/70 p-4 md:w-[220px] md:border-b-0 md:border-r">
            <div>
              <div className="mb-4 flex items-center gap-2 px-1">
                <Folder className="h-4 w-4 text-primary" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                  Explorer
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 px-1 py-1 font-mono text-[11px] font-semibold text-foreground/80">
                  <ChevronRight className="h-3.5 w-3.5 rotate-90 text-muted-foreground/60" />
                  <span>achievements</span>
                </div>
                <div className="space-y-1 pl-4">
                  {files.map((file) => {
                    const isActive = activeTab === file.id;
                    const FileIcon = file.icon;
                    return (
                      <button
                        type="button"
                        key={file.id}
                        onClick={() => setActiveTab(file.id)}
                        className={`flex w-full items-center gap-2 rounded-lg border px-2.5 py-2 text-left font-mono text-xs transition duration-200 ${
                          isActive
                            ? "border-primary/15 bg-primary/10 font-medium text-primary"
                            : "border-transparent text-muted-foreground hover:bg-slate-200/50 hover:text-foreground"
                        }`}
                      >
                        <FileIcon className={`h-3.5 w-3.5 ${file.color}`} />
                        <span>{file.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 hidden border-t border-primary/10 pt-4 font-mono text-[9px] tracking-wider text-muted-foreground/50 md:block">
              <div className="flex items-center gap-2">
                <Trophy className="h-3 w-3 text-amber-500" />
                <span>{achievements.filter((a) => a.tier === "Winner").length} wins logged</span>
              </div>
            </div>
          </div>

          {/* Editor workspace */}
          <div className="flex flex-1 flex-col overflow-hidden bg-white/40">
            <div className="flex overflow-x-auto border-b border-primary/15 bg-slate-100/50 scrollbar-none">
              {files.map((file) => {
                const isActive = activeTab === file.id;
                const FileIcon = file.icon;
                return (
                  <button
                    type="button"
                    key={file.id}
                    onClick={() => setActiveTab(file.id)}
                    className={`flex shrink-0 items-center gap-1.5 border-r border-primary/15 px-3 py-2.5 font-mono text-[10px] tracking-wide transition duration-200 sm:gap-2 sm:px-5 sm:py-3 sm:text-xs ${
                      isActive
                        ? "border-t-2 border-t-primary bg-white/95 font-medium text-primary"
                        : "text-muted-foreground hover:bg-slate-200/40"
                    }`}
                  >
                    <FileIcon className={`h-3.5 w-3.5 ${file.color}`} />
                    <span>{file.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid min-h-0 flex-1 gap-5 p-4 sm:gap-6 sm:p-5 md:min-h-[400px] md:grid-cols-12 md:gap-8 md:p-8">
              {/* Source view */}
              <div className="relative flex h-auto flex-col justify-start rounded-xl border border-primary/15 bg-slate-50/50 p-4 sm:p-5 md:col-span-7">
                <div className="mb-4 flex items-center justify-between border-b border-primary/10 pb-3">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">
                    source view
                  </span>
                </div>

                <div className="flex items-start gap-3 overflow-x-auto pb-2">
                  <div className="shrink-0 border-r border-primary/10 pr-2.5 text-right font-mono text-[11px] text-muted-foreground/35 select-none">
                    {Array.from({ length: lineCount }, (_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <div className="min-w-[200px] flex-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {activeTab === "all" && renderAllCode()}
                        {activeTab === "design" && renderDesignCode()}
                        {activeTab === "innovation" && renderInnovationCode()}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Visual preview */}
              <div className="flex h-auto flex-col md:col-span-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease }}
                    className="flex flex-1 flex-col"
                  >
                    <VisualPreview tab={activeTab} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Stats marquee strip — hero-style footer */}
        <div className="mt-6 overflow-hidden rounded-xl border border-primary/10 bg-primary/5 py-3">
          <div className="flex flex-wrap items-center justify-center gap-6 px-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:gap-10">
            {[
              { Icon: Sparkles, label: `${achievements.length} Programs` },
              { Icon: Trophy, label: `${achievements.filter((a) => a.tier === "Winner").length} Wins` },
              { Icon: Rocket, label: `${achievements.filter((a) => a.tier === "Finalist").length} Finals` },
              { Icon: Medal, label: "Design & Innovation" },
            ].map(({ Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2">
                <span className="grid h-6 w-6 place-items-center rounded-md border border-primary/20 bg-primary/5 text-primary">
                  <Icon className="h-3 w-3" strokeWidth={2} />
                </span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

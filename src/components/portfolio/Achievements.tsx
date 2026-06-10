import { motion } from "framer-motion";
import {
  Award,
  GripHorizontal,
  LayoutGrid,
  Medal,
  Star,
  Target,
  Trophy,
  FileBadge,
} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const ease = [0.22, 1, 0.36, 1] as const;

type Tier = "Winner" | "Finalist" | "Shortlisted";

interface Achievement {
  id: string;
  title: string;
  sub: string;
  category: "Design" | "Innovation";
  tier: Tier;
  year: string;
}

const achievements: Achievement[] = [
  {
    id: "AW-105",
    title: "Design Showdown",
    sub: "First Place Winner",
    category: "Design",
    tier: "Winner",
    year: "2025",
  },
  {
    id: "AW-104",
    title: "Design-A-Thon",
    sub: "First Place · UI/UX Design",
    category: "Design",
    tier: "Winner",
    year: "2025",
  },
  {
    id: "AW-103",
    title: "MSME Idea Hackathon 5.0",
    sub: "Finalist",
    category: "Innovation",
    tier: "Finalist",
    year: "2025",
  },
  {
    id: "AW-102",
    title: "Eureka! 2025",
    sub: "Zonal Finalist · IIT Bombay E-Cell",
    category: "Innovation",
    tier: "Finalist",
    year: "2025",
  },
  {
    id: "AW-101",
    title: "Smart India Hackathon 2025",
    sub: "Internal Round Shortlisted",
    category: "Innovation",
    tier: "Shortlisted",
    year: "2025",
  },
];

const columns: { id: Tier; title: string; icon: any; color: string; bg: string; dot: string }[] = [
  {
    id: "Shortlisted",
    title: "Shortlisted",
    icon: Target,
    color: "text-slate-600",
    bg: "bg-slate-200/50",
    dot: "bg-slate-400",
  },
  {
    id: "Finalist",
    title: "Finalist",
    icon: Star,
    color: "text-violet-700",
    bg: "bg-violet-100",
    dot: "bg-violet-500",
  },
  {
    id: "Winner",
    title: "Winner",
    icon: Trophy,
    color: "text-amber-700",
    bg: "bg-amber-100",
    dot: "bg-amber-500",
  },
];

export default function Achievements() {
  return (
    <Section id="achievements">
      <SectionTitle line1="AWARDS &" line2="WINS" align="left" />

      <p className="mt-[-1.5rem] mb-10 max-w-xl text-left text-sm leading-relaxed text-slate-500 sm:text-[15px]">
        Tracking milestones, hackathons, and design competitions.
      </p>

      {/* Kanban Board Container */}
      <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 lg:p-8 shadow-sm">
        
        {/* Kanban Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-slate-400" />
            <h3 className="font-mono text-sm font-semibold text-slate-700">Awards Board</h3>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 border border-slate-200 shadow-sm">
            <Award className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-mono text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              {achievements.length} Total Issues
            </span>
          </div>
        </div>

        {/* Columns Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {columns.map((col, colIndex) => {
            const colItems = achievements.filter((a) => a.tier === col.id);

            return (
              <div key={col.id} className="flex flex-col">
                {/* Column Header */}
                <div className="mb-3 flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-700">
                      {col.title}
                    </span>
                  </div>
                  <span className={`flex h-5 items-center justify-center rounded-full px-2 font-mono text-[10px] font-bold ${col.bg} ${col.color}`}>
                    {colItems.length}
                  </span>
                </div>

                {/* Column Body / Drop Zone */}
                <div className="flex flex-1 flex-col gap-3 rounded-xl border border-slate-200/60 bg-slate-100/50 p-3">
                  {colItems.length === 0 ? (
                    <div className="flex h-24 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 text-xs text-slate-400">
                      No issues
                    </div>
                  ) : (
                    colItems.map((item, itemIndex) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: colIndex * 0.1 + itemIndex * 0.1,
                          ease,
                        }}
                        className="group relative cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md active:cursor-grabbing"
                      >
                        {/* Drag handle */}
                        <div className="absolute right-3 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                          <GripHorizontal className="h-4 w-4 text-slate-300" />
                        </div>

                        {/* Labels / Meta */}
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[9px] font-bold text-slate-400">
                            {item.id}
                          </span>
                          <span
                            className={`rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider ${
                              item.category === "Design"
                                ? "text-pink-600"
                                : "text-blue-600"
                            }`}
                          >
                            {item.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="mb-1 text-sm font-bold leading-tight text-slate-800">
                          {item.title}
                        </h4>

                        {/* Subtitle */}
                        <p className="mb-4 text-[11px] leading-relaxed text-slate-500">
                          {item.sub}
                        </p>

                        {/* Footer (Year + Tier Icon) */}
                        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                          <span className="font-mono text-[10px] text-slate-400">
                            {item.year}
                          </span>
                          {item.tier === "Winner" ? (
                            <div className="flex items-center gap-1 rounded bg-amber-50 px-1.5 py-0.5 text-[9px] font-bold text-amber-600">
                              <Medal className="h-3 w-3" /> Winner
                            </div>
                          ) : (
                            <div className="flex items-center gap-1">
                              <col.icon className={`h-3.5 w-3.5 ${col.color}`} strokeWidth={2.5} />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

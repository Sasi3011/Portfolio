import { useMemo, useState } from "react";
import type { GitHubContributionDay } from "@/lib/api/github.functions";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type DayCell = GitHubContributionDay | null;

function buildWeeks(days: GitHubContributionDay[]): DayCell[][] {
  if (days.length === 0) return [];
  const weeks: DayCell[][] = [];
  let week: DayCell[] = [];
  const firstDay = new Date(`${days[0].date}T00:00:00`).getDay();
  for (let i = 0; i < firstDay; i++) week.push(null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// 3D Isometric Settings
const TW = 12; // Tile half-width
const TH = 7;  // Tile half-height

const LEVEL_COLORS = [
  { top: "#f8fafc", left: "#f1f5f9", right: "#e2e8f0" }, // L0
  { top: "#a7f3d0", left: "#6ee7b7", right: "#34d399" }, // L1
  { top: "#6ee7b7", left: "#34d399", right: "#10b981" }, // L2
  { top: "#34d399", left: "#10b981", right: "#059669" }, // L3
  { top: "#10b981", left: "#059669", right: "#047857" }, // L4
];

const LEVEL_Z = [3, 14, 30, 52, 85]; // Heights for each level

interface GitHubContributionGraphProps {
  contributions: GitHubContributionDay[];
  total: number;
  username: string;
}

export default function GitHubContributionGraph({
  contributions,
  total,
  username,
}: GitHubContributionGraphProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  const weeks = useMemo(() => buildWeeks(contributions), [contributions]);

  // Flatten and sort for Z-indexing (Painter's algorithm: draw back-to-front)
  // Smaller (x + y) goes first, putting them in the background.
  const blocks = useMemo(() => {
    return weeks
      .flatMap((week, x) => week.map((day, y) => ({ x, y, day })))
      .sort((a, b) => (a.x + a.y) - (b.x + b.y));
  }, [weeks]);

  // Calculate viewBox
  const minIsoX = -6 * TW;
  const maxIsoX = 52 * TW;
  const minIsoY = -85; // Highest Z
  const maxIsoY = (52 + 6) * TH + 2 * TH;
  
  const vbWidth = maxIsoX - minIsoX + 2 * TW;
  const vbHeight = maxIsoY - minIsoY + 2 * TH + 20;

  return (
    <div className="relative w-full">
      <div className="mb-2 flex flex-wrap items-end justify-between gap-2 px-2">
        <div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">Code Skyline</h3>
          <p className="text-sm text-slate-500 mt-1">
            <span className="font-semibold text-emerald-600">{total.toLocaleString()}</span> contributions in the last year
          </p>
        </div>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-slate-100 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-slate-600 transition-colors hover:bg-emerald-50 hover:text-emerald-600"
        >
          @{username}
        </a>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/50 shadow-sm relative pt-1 pb-1 cursor-crosshair group">
        
        {/* Subtle grid background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_14px]"></div>

        <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-none flex justify-center px-2">
          <svg 
            viewBox={`${minIsoX - TW} ${minIsoY - TH} ${vbWidth} ${vbHeight}`} 
            className="w-full h-auto max-h-[350px] drop-shadow-xl -mt-4 sm:-mt-8"
            style={{ filter: "drop-shadow(0 20px 20px rgba(0,0,0,0.05))" }}
          >
            {blocks.map(({ x, y, day }) => {
              const level = day ? Math.min(Math.max(day.level, 0), 4) : 0;
              const Z = LEVEL_Z[level];
              const color = LEVEL_COLORS[level];

              // Base center coordinate
              const isoX = (x - y) * TW;
              const isoY = (x + y) * TH;

              // Polygons
              const pTop = `0,${-Z} ${TW},${TH - Z} 0,${2 * TH - Z} ${-TW},${TH - Z}`;
              const pLeft = `${-TW},${TH - Z} 0,${2 * TH - Z} 0,${2 * TH} ${-TW},${TH}`;
              const pRight = `0,${2 * TH - Z} ${TW},${TH - Z} ${TW},${TH} 0,${2 * TH}`;

              return (
                <g 
                  key={`${x}-${y}`} 
                  transform={`translate(${isoX}, ${isoY})`}
                  className="transition-transform duration-300 ease-out hover:-translate-y-4 hover:drop-shadow-[0_10px_10px_rgba(16,185,129,0.3)]"
                  onMouseEnter={(e) => {
                    if (!day) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    setTooltip({
                      x: rect.left + rect.width / 2,
                      y: rect.top - 10,
                      text: `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  <polygon points={pLeft} fill={color.left} stroke={color.left} strokeWidth={0.5} />
                  <polygon points={pRight} fill={color.right} stroke={color.right} strokeWidth={0.5} />
                  <polygon points={pTop} fill={color.top} stroke={color.top} strokeWidth={0.5} />
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="absolute bottom-3 right-4 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-2 py-1.5 rounded-lg border border-slate-200 shadow-sm">
          <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400">Less</span>
          <div className="flex gap-1.5 items-end h-4">
            {LEVEL_COLORS.map((c, i) => (
              <div 
                key={i} 
                className="w-2.5 rounded-sm shadow-sm"
                style={{ backgroundColor: c.top, height: `${4 + (i * 3)}px` }}
              />
            ))}
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">More</span>
        </div>
      </div>

      {tooltip && (
        <div
          className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-full rounded-lg border border-emerald-500/20 bg-slate-900 px-3 py-2 text-[11px] font-medium text-white shadow-xl backdrop-blur-sm transition-all animate-in fade-in zoom-in-95 duration-200"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
        </div>
      )}
    </div>
  );
}

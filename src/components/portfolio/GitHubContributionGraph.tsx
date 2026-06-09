import { useMemo, useState } from "react";
import type { GitHubContributionDay } from "@/lib/api/github.functions";

const LEVEL_CLASS = [
  "bg-primary/[0.07] border border-primary/10",
  "bg-primary/30 border border-primary/15",
  "bg-primary/50 border border-primary/20",
  "bg-primary/75 border border-primary/25",
  "bg-primary border border-primary/30",
] as const;

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

function monthLabels(weeks: DayCell[][]) {
  const labels: { label: string; index: number }[] = [];
  let lastMonth = -1;

  weeks.forEach((week, index) => {
    const firstDay = week.find((d) => d !== null);
    if (!firstDay) return;
    const month = new Date(`${firstDay.date}T00:00:00`).getMonth();
    if (month !== lastMonth) {
      labels.push({ label: MONTHS[month], index });
      lastMonth = month;
    }
  });

  return labels;
}

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

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
  const labels = useMemo(() => monthLabels(weeks), [weeks]);

  return (
    <div className="relative">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{total.toLocaleString()}</span> contributions in the last year
        </p>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] uppercase tracking-widest text-primary hover:underline"
        >
          @{username}
        </a>
      </div>

      <div className="overflow-x-auto pb-1">
        <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/60 sm:hidden">
          Swipe to view full graph →
        </p>
        <div className="min-w-[640px] sm:min-w-[680px]">
          <div className="relative mb-2 h-4 pl-8">
            {labels.map(({ label, index }) => (
              <span
                key={`${label}-${index}`}
                className="absolute font-mono text-[10px] text-muted-foreground/70"
                style={{ left: `${32 + index * 14}px` }}
              >
                {label}
              </span>
            ))}
          </div>

          <div className="flex gap-[3px]">
            <div className="flex flex-col gap-[3px] pt-[2px]">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((day, i) => (
                <span
                  key={`${day}-${i}`}
                  className="flex h-[11px] items-center font-mono text-[9px] leading-none text-muted-foreground/50"
                >
                  {day}
                </span>
              ))}
            </div>

            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => {
                    if (!day) {
                      return <span key={`${wi}-${di}`} className="h-[11px] w-[11px] rounded-[2px]" />;
                    }

                    const level = Math.min(Math.max(day.level, 0), 4);

                    return (
                      <button
                        key={day.date}
                        type="button"
                        className={`h-[11px] w-[11px] rounded-[2px] transition-transform hover:scale-125 hover:ring-1 hover:ring-primary/40 ${LEVEL_CLASS[level]}`}
                        aria-label={`${day.count} contributions on ${formatDate(day.date)}`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                            text: `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                        onFocus={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                            text: `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}`,
                          });
                        }}
                        onBlur={() => setTooltip(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-end gap-1.5 pl-8">
            <span className="font-mono text-[9px] text-muted-foreground/60">Less</span>
            {LEVEL_CLASS.map((cls, i) => (
              <span key={i} className={`h-[11px] w-[11px] rounded-[2px] ${cls}`} />
            ))}
            <span className="font-mono text-[9px] text-muted-foreground/60">More</span>
          </div>
        </div>
      </div>

      {tooltip && (
        <div
          className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-full rounded-md border border-primary/15 bg-slate-900 px-2.5 py-1.5 text-[11px] text-white shadow-lg"
          style={{ left: tooltip.x, top: tooltip.y - 8 }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

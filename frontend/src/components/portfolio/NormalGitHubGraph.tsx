import { GitHubContributionDay } from "@/lib/api/github.functions";

interface NormalGitHubGraphProps {
  contributions: GitHubContributionDay[];
  total: number;
}

export default function NormalGitHubGraph({ contributions, total }: NormalGitHubGraphProps) {
  // Group by week
  const weeks: (GitHubContributionDay | null)[][] = [];
  let currentWeek: (GitHubContributionDay | null)[] = [];
  
  if (contributions.length > 0) {
    const firstDay = new Date(`${contributions[0].date}T00:00:00`).getDay();
    for (let i = 0; i < firstDay; i++) {
      currentWeek.push(null);
    }
    for (const day of contributions) {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
    }
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      weeks.push(currentWeek);
    }
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 1: return "bg-[#9be9a8] border-[#9be9a8]";
      case 2: return "bg-[#40c463] border-[#40c463]";
      case 3: return "bg-[#30a14e] border-[#30a14e]";
      case 4: return "bg-[#216e39] border-[#216e39]";
      default: return "bg-[#ebedf0] border-[#ebedf0]";
    }
  };

  return (
    <div className="w-full">
      <div className="mb-2 flex justify-between items-end">
        <span className="text-xs font-semibold text-slate-500">{total} contributions in the last year</span>
      </div>
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, i) => (
          <div key={i} className="flex flex-col gap-1">
            {week.map((day, j) => (
              <div
                key={j}
                className={`w-[10px] h-[10px] sm:w-3 sm:h-3 rounded-[2px] border ${
                  day ? getLevelColor(day.level) : "bg-transparent border-transparent"
                }`}
                title={day ? `${day.count} contributions on ${day.date}` : ""}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-slate-500">
        <span>Less</span>
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] bg-[#ebedf0]" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] bg-[#9be9a8]" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] bg-[#40c463]" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] bg-[#30a14e]" />
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-[2px] bg-[#216e39]" />
        <span>More</span>
      </div>
    </div>
  );
}

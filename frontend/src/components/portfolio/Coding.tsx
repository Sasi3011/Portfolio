import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Activity,
  Cpu,
  Globe,
  HardDrive,
  Hash,
  MemoryStick,
  Server,
  TerminalSquare,
} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import NormalGitHubGraph from "./NormalGitHubGraph";
import { getGitHubProfile } from "@/lib/api/github.functions";
import { GITHUB_URL, GITHUB_USERNAME } from "@/lib/constants/social";
import { useInView } from "@/hooks/use-in-view";

const ease = [0.22, 1, 0.36, 1] as const;

const platforms = [
  {
    name: "LeetCode",
    stat: "100+",
    pct: 75,
    sub: "Problems Solved",
    color: "bg-amber-400",
  },
  {
    name: "HackerRank",
    stat: "4★",
    pct: 80,
    sub: "SQL / Java",
    color: "bg-emerald-400",
  },
  {
    name: "SkillRack",
    stat: "1100+",
    pct: 95,
    sub: "Problems Solved",
    color: "bg-violet-400",
  },
];

const certs = [
  { pid: "1024", cmd: "React.js Complete Guide", mem: "14.2", cpu: "99.9" },
  { pid: "2048", cmd: "UI/UX Design Using Figma", mem: "8.5", cpu: "85.0" },
  { pid: "3192", cmd: "Java Basics (HackerRank)", mem: "5.1", cpu: "45.2" },
  { pid: "4096", cmd: "Intro to HTML (SoloLearn)", mem: "2.0", cpu: "12.5" },
];

function generateBars(pct: number) {
  const totalBlocks = 30;
  const filledBlocks = Math.floor((pct / 100) * totalBlocks);
  const emptyBlocks = totalBlocks - filledBlocks;
  return (
    <span className="font-mono text-xs font-black tracking-tighter">
      <span className="text-slate-800">
        {"|".repeat(filledBlocks)}
      </span>
      <span className="text-slate-200">
        {"|".repeat(emptyBlocks)}
      </span>
    </span>
  );
}

export default function Coding() {
  const { ref, inView } = useInView({ rootMargin: "240px 0px", once: true });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["github-profile", GITHUB_USERNAME],
    queryFn: () => getGitHubProfile(),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    enabled: inView,
  });

  return (
    <div ref={ref}>
      <Section id="coding">
        <SectionTitle line1="CODING" line2="PROFILE" align="right" />

        <p className="-mt-6 mb-8 max-w-xl text-left text-sm leading-relaxed text-slate-500 sm:mb-10 sm:text-right sm:text-[15px] md:ml-auto">
          System monitor view of my coding activity, competitive programming, and skill certifications.
        </p>

        {/* htop Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mx-auto w-full overflow-hidden rounded-xl border border-slate-300 bg-[#FAFAFA] font-mono shadow-sm"
        >
          {/* Terminal Header */}
          <div className="flex items-center gap-2 border-b border-slate-300 bg-slate-200 px-4 py-2">
            <div className="flex gap-1.5">
              <div className="h-3 w-3 rounded-full bg-red-400 border border-red-500" />
              <div className="h-3 w-3 rounded-full bg-amber-400 border border-amber-500" />
              <div className="h-3 w-3 rounded-full bg-emerald-400 border border-emerald-500" />
            </div>
            <div className="ml-4 flex items-center gap-2 text-xs font-semibold text-slate-600">
              <TerminalSquare className="h-3.5 w-3.5" />
              <span>htop - sasi@portfolio:~</span>
            </div>
          </div>

          <div className="p-4 sm:p-6 text-xs sm:text-sm text-slate-800">
            {/* Top htop Header Section */}
            <div className="flex flex-col lg:flex-row gap-8 mb-8 border-b border-dashed border-slate-300 pb-8">
              
              {/* CPU/Memory Gauges (Platforms) */}
              <div className="flex-1 space-y-3">
                {platforms.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="w-12 shrink-0 font-bold text-slate-500 text-right">
                      CPU{i + 1}
                    </span>
                    <span className="text-slate-400">[</span>
                    <div className="flex-1 flex items-center bg-slate-100 h-4 relative">
                      <div className={`h-full ${p.color}`} style={{ width: `${p.pct}%` }} />
                      <span className="absolute inset-0 flex items-center px-2 font-bold text-slate-900 mix-blend-overlay">
                        {generateBars(p.pct)}
                      </span>
                    </div>
                    <span className="text-slate-400">]</span>
                    <span className="w-24 shrink-0 font-bold text-right">
                      {p.pct.toFixed(1)}%
                    </span>
                    <span className="w-32 shrink-0 text-slate-500 hidden sm:block">
                      {p.name} ({p.stat})
                    </span>
                  </div>
                ))}
                
                <div className="flex items-center gap-3 pt-2">
                  <span className="w-12 shrink-0 font-bold text-slate-500 text-right">Mem</span>
                  <span className="text-slate-400">[</span>
                  <div className="flex-1 flex items-center bg-slate-100 h-4 relative">
                    <div className="h-full bg-blue-400" style={{ width: '42%' }} />
                    <span className="absolute inset-0 flex items-center px-2 font-bold text-slate-900 mix-blend-overlay">
                      {generateBars(42)}
                    </span>
                  </div>
                  <span className="text-slate-400">]</span>
                  <span className="w-24 shrink-0 font-bold text-right">3.82G/8.00G</span>
                  <span className="w-32 shrink-0 text-slate-500 hidden sm:block">
                    Allocated
                  </span>
                </div>
              </div>

              {/* GitHub System Stats */}
              <div className="flex-1 lg:max-w-sm space-y-2 text-slate-600">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Tasks:</span>
                  <span>{data?.publicRepos || "..."} total, 1 running</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Load average:</span>
                  <span>0.88, 1.05, 1.21</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-slate-500">Uptime:</span>
                  <span>24/7/365</span>
                </div>
                {data && (
                  <>
                    <div className="flex justify-between pt-2">
                      <span className="font-bold text-slate-500">USER:</span>
                      <a href={GITHUB_URL} className="text-blue-600 hover:underline">@{data.username}</a>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-500">TOTAL_COMMITS:</span>
                      <span className="font-bold text-slate-800">{data.totalContributions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-500">NETWORK_PEERS:</span>
                      <span>{data.followers} followers</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* GitHub Contribution Heatmap as "Network Activity" */}
            {data && (
              <div className="mb-8">
                <h4 className="mb-3 flex items-center gap-2 font-bold text-slate-500 uppercase tracking-widest text-[10px]">
                  <Activity className="h-3.5 w-3.5" />
                  Network I/O Matrix (GitHub Contributions)
                </h4>
                <div className="rounded border border-slate-300 bg-white p-4 overflow-x-auto shadow-sm">
                  <NormalGitHubGraph
                    contributions={data.contributions}
                    total={data.totalContributions}
                  />
                </div>
              </div>
            )}

            {/* Process List (Certifications & Repos) */}
            <div>
              <h4 className="mb-2 flex items-center gap-2 font-bold text-slate-500 uppercase tracking-widest text-[10px]">
                <Server className="h-3.5 w-3.5" />
                Active Processes (Certifications & Repositories)
              </h4>
              
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left whitespace-nowrap">
                  <thead className="bg-slate-200 text-slate-600 font-bold border-b border-slate-300">
                    <tr>
                      <th className="px-3 py-1">PID</th>
                      <th className="px-3 py-1">USER</th>
                      <th className="px-3 py-1">PRI</th>
                      <th className="px-3 py-1">S</th>
                      <th className="px-3 py-1">%CPU</th>
                      <th className="px-3 py-1">%MEM</th>
                      <th className="px-3 py-1 w-full">COMMAND</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {/* Certifications Map */}
                    {certs.map((c) => (
                      <tr key={c.pid} className="hover:bg-slate-200/50">
                        <td className="px-3 py-1 text-slate-500">{c.pid}</td>
                        <td className="px-3 py-1">root</td>
                        <td className="px-3 py-1">20</td>
                        <td className="px-3 py-1 text-emerald-600 font-bold">R</td>
                        <td className="px-3 py-1">{c.cpu}</td>
                        <td className="px-3 py-1">{c.mem}</td>
                        <td className="px-3 py-1 font-bold">{c.cmd}</td>
                      </tr>
                    ))}
                    
                    {/* Recent Repos Map */}
                    {data?.repos.slice(0, 3).map((repo, i) => (
                      <tr key={repo.name} className="hover:bg-slate-200/50">
                        <td className="px-3 py-1 text-slate-500">{9000 + i * 14}</td>
                        <td className="px-3 py-1 text-blue-600">{data.username}</td>
                        <td className="px-3 py-1">20</td>
                        <td className="px-3 py-1 text-slate-400">S</td>
                        <td className="px-3 py-1">{(Math.random() * 5).toFixed(1)}</td>
                        <td className="px-3 py-1">{(Math.random() * 2).toFixed(1)}</td>
                        <td className="px-3 py-1 text-slate-600">
                          <a href={repo.htmlUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                            ./run_repo --name {repo.name} {repo.language && `--lang ${repo.language}`}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
          
          {/* Terminal Footer */}
          <div className="bg-slate-800 text-slate-300 px-4 py-1.5 text-[10px] flex gap-6 mt-4">
            <span>F1 <span className="text-white font-bold">Help</span></span>
            <span>F2 <span className="text-white font-bold">Setup</span></span>
            <span>F3 <span className="text-white font-bold">Search</span></span>
            <span>F9 <span className="text-white font-bold">Kill</span></span>
            <span>F10 <span className="text-white font-bold">Quit</span></span>
          </div>
        </motion.div>
      </Section>
    </div>
  );
}

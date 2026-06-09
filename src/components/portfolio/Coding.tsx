import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Braces,
  CheckCircle2,
  Code,
  Cpu,
  ExternalLink,
  GitBranch,
  Github,
  Star,
  Terminal,
  Users,
} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import GitHubContributionGraph from "./GitHubContributionGraph";
import { getGitHubProfile } from "@/lib/api/github.functions";
import { GITHUB_URL, GITHUB_USERNAME } from "@/lib/constants/social";
import { useInView } from "@/hooks/use-in-view";

const ease = [0.22, 1, 0.36, 1] as const;

const platforms = [
  { Icon: Terminal, name: "LeetCode", stat: "100+", sub: "Problems Solved · DSA", color: "text-amber-600" },
  { Icon: Braces, name: "HackerRank", stat: "4★", sub: "SQL · Java · Certifications", color: "text-emerald-600" },
  { Icon: Cpu, name: "SkillRack", stat: "1100+", sub: "Programming Problems Solved", color: "text-violet-600" },
];

const certs = [
  "React.js Complete Guide",
  "UI/UX Design Using Figma",
  "Java Basics – HackerRank",
  "Introduction to HTML – SoloLearn",
];

function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-primary/10 ${className}`} />;
}

export default function Coding() {
  const { ref, inView } = useInView({ rootMargin: "240px 0px", once: true });
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["github-profile", GITHUB_USERNAME],
    queryFn: () => getGitHubProfile(),
    staleTime: 1000 * 60 * 15,
    enabled: inView,
  });

  return (
    <div ref={ref}>
      <Section id="coding">
      <SectionTitle line1="CODING" line2="PROFILE" align="right" />

      <p className="-mt-6 mb-8 max-w-xl text-left text-sm leading-relaxed text-muted-foreground sm:mb-10 sm:text-right sm:text-[15px] md:ml-auto">
        Live GitHub activity, competitive programming stats, and certifications.
      </p>

      <div className="panel-glow overflow-hidden rounded-2xl border border-primary/20 bg-white/70 shadow-[0_8px_32px_-12px_rgba(59,130,246,0.08)]">
        {/* GitHub header */}
        <div className="border-b border-primary/15 bg-slate-50/70 px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Github className="h-4 w-4 text-primary" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                GitHub Activity
              </span>
            </div>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-primary hover:underline"
            >
              github.com/{GITHUB_USERNAME}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <div className="p-5 sm:p-6 md:p-8">
          {isLoading && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <SkeletonBlock className="h-14 w-14 rounded-full" />
                <div className="flex-1 space-y-2">
                  <SkeletonBlock className="h-5 w-40" />
                  <SkeletonBlock className="h-4 w-56" />
                </div>
              </div>
              <SkeletonBlock className="h-32 w-full" />
            </div>
          )}

          {isError && (
            <div className="rounded-xl border border-dashed border-primary/25 bg-primary/5 px-5 py-8 text-center">
              <p className="text-sm font-medium text-foreground">Could not load GitHub data</p>
              <button
                type="button"
                onClick={() => refetch()}
                className="mt-3 rounded-lg border border-primary/20 bg-white px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/5"
              >
                Retry
              </button>
            </div>
          )}

          {data && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="space-y-8"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={data.avatarUrl}
                    alt={data.name}
                    className="h-14 w-14 rounded-full border-2 border-primary/20 shadow-sm"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{data.name}</h3>
                    <p className="font-mono text-xs text-muted-foreground">@{data.username}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  {[
                    { label: "Repos", value: data.publicRepos, Icon: GitBranch },
                    { label: "Followers", value: data.followers, Icon: Users },
                    { label: "Contributions", value: data.totalContributions, Icon: Code },
                  ].map(({ label, value, Icon }) => (
                    <div
                      key={label}
                      className="min-w-0 rounded-xl border border-primary/10 bg-white/60 px-2 py-2 text-center sm:px-4 sm:py-2.5"
                    >
                      <Icon className="mx-auto mb-1 h-3.5 w-3.5 text-primary" />
                      <p className="hero-headline text-base font-bold text-slate-900 sm:text-lg">{value.toLocaleString()}</p>
                      <p className="font-mono text-[8px] uppercase tracking-wider text-muted-foreground sm:text-[9px]">{label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-primary/15 bg-slate-50/50 p-4 sm:p-5">
                <GitHubContributionGraph
                  contributions={data.contributions}
                  total={data.totalContributions}
                  username={data.username}
                />
              </div>

              {data.repos.length > 0 && (
                <div>
                  <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
                    Recent Repositories
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {data.repos.map((repo) => (
                      <a
                        key={repo.name}
                        href={repo.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-xl border border-primary/10 bg-white/50 px-4 py-3 transition hover:border-primary/25 hover:bg-white/80"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-semibold text-primary group-hover:underline">{repo.name}</p>
                          {repo.language && (
                            <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{repo.language}</span>
                          )}
                        </div>
                        {repo.description && (
                          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{repo.description}</p>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease }}
          className="panel-glow rounded-2xl border border-primary/20 bg-white/70 p-6 sm:p-8"
        >
          <div className="mb-5 flex items-start gap-3.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-500 sm:h-11 sm:w-11">
              <Code className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-base font-semibold sm:text-lg">Practice Platforms</h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-primary">Competitive coding</p>
            </div>
          </div>

          <div className="space-y-4">
            {platforms.map((p) => (
              <div
                key={p.name}
                className="flex items-start gap-4 border-b border-primary/10 pb-4 last:border-0 last:pb-0"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/15 bg-primary/5">
                  <p.Icon className={`h-4 w-4 ${p.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <span className="text-sm font-medium sm:text-base">{p.name}</span>
                    <span className="hero-headline text-xl font-bold text-gradient sm:text-2xl">{p.stat}</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{p.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08, ease }}
          className="panel-glow rounded-2xl border border-primary/20 bg-white/70 p-6 sm:p-8"
        >
          <div className="mb-5 flex items-start gap-3.5">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-amber-500/20 bg-amber-500/10 text-amber-500 sm:h-11 sm:w-11">
              <Star className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div>
              <h3 className="text-base font-semibold sm:text-lg">Certifications</h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-primary">Verified skills</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {certs.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-2 rounded-xl border border-primary/10 bg-primary/5 px-3.5 py-2.5 text-xs text-foreground/90 sm:text-sm"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
    </div>
  );
}

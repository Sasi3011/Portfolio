import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Command,
  Heart,
  Palette,
  Search,
  Target,
  Zap,
} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const ease = [0.22, 1, 0.36, 1] as const;

const values = [
  {
    Icon: Zap,
    title: "Speed + Polish",
    description:
      "I ship quickly without sacrificing quality — tight feedback loops, clean code, and refined UI in every delivery.",
    accent: "text-amber-500",
    bg: "bg-amber-100",
    hoverBg: "group-hover:bg-amber-100",
    hoverText: "group-hover:text-amber-600",
  },
  {
    Icon: Target,
    title: "Product Mindset",
    description:
      "Every decision is grounded in user value and business impact — not code for code's sake.",
    accent: "text-emerald-500",
    bg: "bg-emerald-100",
    hoverBg: "group-hover:bg-emerald-100",
    hoverText: "group-hover:text-emerald-600",
  },
  {
    Icon: Palette,
    title: "Design + Code",
    description:
      "From Figma wireframes to deployed React apps — one person who handles both design and development.",
    accent: "text-purple-500",
    bg: "bg-purple-100",
    hoverBg: "group-hover:bg-purple-100",
    hoverText: "group-hover:text-purple-600",
  },
  {
    Icon: Heart,
    title: "Founder Energy",
    description:
      "Hackathon-tested ownership. I treat every project like a startup I'm building — committed and proactive.",
    accent: "text-rose-500",
    bg: "bg-rose-100",
    hoverBg: "group-hover:bg-rose-100",
    hoverText: "group-hover:text-rose-600",
  },
];

export default function WhyMe() {
  const [searchValue, setSearchValue] = useState("");
  const targetText = "> evaluate --candidate Sasikiran";

  // Simulate typing effect in the command palette search bar
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= targetText.length) {
        setSearchValue(targetText.slice(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 60);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <Section id="why">
      <SectionTitle line1="WHY WORK" line2="WITH ME" align="left" />

      <p className="-mt-6 mb-12 max-w-xl text-sm leading-relaxed text-slate-500 sm:mb-16 sm:text-[15px]">
        One partner who designs and ships — so your idea moves from concept to
        launch without handoff friction.
      </p>

      {/* Command Palette Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, ease }}
        className="mx-auto w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-900/5"
      >
        {/* Search Bar Header */}
        <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-5">
          <Search className="h-6 w-6 text-blue-500" strokeWidth={2.5} />
          <div className="relative flex-1">
            <span className="font-mono text-lg font-bold text-slate-800 sm:text-xl">
              {searchValue}
            </span>
            <span className="ml-[1px] inline-block h-6 w-2 animate-pulse bg-blue-500 align-middle"></span>
          </div>
          
          <div className="hidden items-center gap-1.5 sm:flex">
            <div className="flex h-7 items-center justify-center rounded border border-slate-200 bg-slate-50 px-2 font-sans text-xs font-semibold text-slate-400 shadow-sm">
              <Command className="mr-1 h-3.5 w-3.5" />
              Ctrl
            </div>
            <div className="flex h-7 w-7 items-center justify-center rounded border border-slate-200 bg-slate-50 font-sans text-xs font-semibold text-slate-400 shadow-sm">
              K
            </div>
          </div>
        </div>

        {/* Search Results Area */}
        <div className="p-3 sm:p-4">
          <div className="mb-2 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
            4 Core Competencies Found
          </div>

          <div className="flex flex-col gap-1">
            {values.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 1.2 + i * 0.1, ease }}
                className="group flex cursor-pointer items-center justify-between rounded-xl px-4 py-4 transition-all duration-200 hover:bg-slate-50"
              >
                <div className="flex items-center gap-5">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white text-slate-400 shadow-sm transition-colors duration-300 ${item.hoverBg} ${item.hoverText}`}
                  >
                    <item.Icon className="h-6 w-6" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 transition-colors sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[13px] leading-relaxed text-slate-500 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4 text-blue-500" strokeWidth={2.5} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Command Palette Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-6 py-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          <div className="flex gap-4">
            <span className="flex items-center gap-1.5"><ArrowRight className="h-3 w-3" /> Select</span>
            <span className="hidden sm:inline-block">ESC to cancel</span>
          </div>
          <div className="text-blue-500">
            100% Match
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

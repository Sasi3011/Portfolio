import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Code2, Link as LinkIcon, Sparkles } from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const ease = [0.22, 1, 0.36, 1] as const;

interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  type: string;
  skills: string[];
  points: string[];
  intro: string;
}

const exp: ExperienceItem[] = [
  {
    id: "exp_mern_2025",
    role: "MERN Stack Intern",
    org: "Aptitude Guru Hemchandar",
    period: "Dec 2025",
    type: "Engineering",
    skills: ["React", "Node.js", "MongoDB", "Express", "REST_APIs"],
    intro:
      "A comprehensive capstone-driven engineering internship heavily focused on modern full-stack web development and database management.",
    points: [
      "Completed an intensive MERN Stack training program focusing on scalable architectures.",
      "Successfully delivered a comprehensive capstone project utilizing the complete MERN stack.",
      "Built RESTful APIs with Node.js/Express and connected them to dynamic React frontend interfaces.",
      "Designed and managed database schemas and data relationships using MongoDB.",
    ],
  },
  {
    id: "exp_ui_acs",
    role: "UI/UX Designer",
    org: "ACS Auto Consultancy",
    period: "Internship",
    type: "Design",
    skills: ["Figma", "Prototyping", "User_Flows", "Client_Comms"],
    intro:
      "A design-centric role where I translated client requirements into interactive, high-fidelity prototypes and professional screen layouts.",
    points: [
      "Designed 10+ professional screens in Figma.",
      "Developed interactive prototypes for client review.",
      "Improved user journeys and overall usability.",
      "Collaborated with stakeholders on product requirements.",
    ],
  },
  {
    id: "exp_ui_galatta",
    role: "UI/UX Design Intern",
    org: "CodeGalatta",
    period: "Internship",
    type: "Product Design",
    skills: ["Wireframes", "Hi-Fi_UI", "UX_Research"],
    intro:
      "A foundational product design internship focused on creating wireframes and iterating on user experience alongside development teams.",
    points: [
      "Created wireframes and high-fidelity prototypes.",
      "Worked on multiple product modules end-to-end.",
      "Enhanced UX through iterative design feedback.",
      "Collaborated with mentors and development teams.",
    ],
  },
];

function ExperienceRow({ item, index }: { item: ExperienceItem; index: number }) {
  const isReversed = index % 2 !== 0;
  const [isFetching, setIsFetching] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const handleRunRequest = () => {
    if (isFetching) return;
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      setHasRun(true);
      setTimeout(() => setHasRun(false), 2000);
    }, 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1, ease }}
      className={`flex flex-col border-b border-slate-200 last:border-b-0 ${
        isReversed ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      {/* Human Readable Text */}
      <div className="flex-1 p-6 sm:p-10 lg:w-7/12">
        {/* Endpoint Badge */}
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded bg-blue-100 px-2.5 py-1 font-mono text-[10px] font-bold text-blue-700 shadow-sm">
            GET
          </span>
          <span className="font-mono text-xs text-slate-500">
            /api/v1/experience/<span className="text-slate-800 font-semibold">{item.id}</span>
          </span>
        </div>

        <div className="group mb-2 flex items-center gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {item.role}
          </h2>
          <LinkIcon className="h-4 w-4 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        
        <div className="mb-6 flex flex-wrap items-center gap-3 font-mono text-xs font-semibold text-slate-500">
          <span className="rounded bg-blue-50 px-2 py-0.5 text-blue-700">
            {item.org}
          </span>
          <span>•</span>
          <span>{item.period}</span>
        </div>

        <p className="mb-8 text-[15px] leading-relaxed text-slate-600">
          {item.intro}
        </p>

        <div>
          <h4 className="mb-4 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-slate-400">
            <Sparkles className="h-3.5 w-3.5" /> Key Deliverables
          </h4>
          <ul className="space-y-4">
            {item.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-emerald-500" strokeWidth={3} />
                <span className="text-sm leading-relaxed text-slate-700">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Code & Specs (Light Mode JSON) */}
      <div
        className={`border-t border-slate-200 bg-[#F8FAFC] p-6 sm:p-10 lg:w-5/12 lg:border-t-0 shadow-inner ${
          isReversed ? "lg:border-r" : "lg:border-l"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Response Payload
          </div>
          <button
            onClick={handleRunRequest}
            disabled={isFetching}
            className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2.5 py-1.5 font-mono text-[10px] font-bold text-slate-600 shadow-sm transition-colors hover:bg-slate-50 hover:text-blue-600 disabled:opacity-50"
          >
            {isFetching ? (
              <span className="animate-pulse">Fetching...</span>
            ) : hasRun ? (
              <span className="text-emerald-500">200 OK ✓</span>
            ) : (
              <>
                Run Request <span className="text-blue-500">▶</span>
              </>
            )}
          </button>
        </div>

        {/* JSON Code Block */}
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-[#0F172A] p-5 font-mono text-xs leading-relaxed text-slate-300 shadow-lg">
          {/* Mac Window Dots */}
          <div className="absolute left-4 top-4 z-10 flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>

          <div
            className={`mt-6 transition-all duration-300 ${
              isFetching ? "opacity-30 blur-sm" : "opacity-100 blur-0"
            }`}
          >
            <div className="text-slate-400">&#123;</div>
            
            <div className="pl-4">
              <span className="text-sky-300">&quot;id&quot;</span>:{" "}
              <span className="text-emerald-300">&quot;{item.id}&quot;</span>,
            </div>
            
            <div className="pl-4">
              <span className="text-sky-300">&quot;object&quot;</span>:{" "}
              <span className="text-emerald-300">&quot;experience&quot;</span>,
            </div>
            
            <div className="pl-4">
              <span className="text-sky-300">&quot;department&quot;</span>:{" "}
              <span className="text-emerald-300">&quot;{item.type}&quot;</span>,
            </div>
            
            <div className="pl-4 flex flex-wrap gap-1">
              <span className="text-sky-300">&quot;tech_stack&quot;</span>:{" "}
              <span className="text-slate-400">[</span>
              {item.skills.map((s, sIdx) => (
                <span key={s} className="text-amber-300">
                  &quot;{s}&quot;{sIdx < item.skills.length - 1 ? <span className="text-slate-400">,</span> : ""}
                </span>
              ))}
              <span className="text-slate-400">],</span>
            </div>
            
            <div className="pl-4">
              <span className="text-sky-300">&quot;impact_score&quot;</span>:{" "}
              <span className="text-purple-400">{item.points.length * 10}</span>
            </div>

            <div className="text-slate-400">&#125;</div>
          </div>

          {/* Loading Overlay */}
          {isFetching && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-[#0F172A]/50 backdrop-blur-[2px]">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-500 border-t-blue-500"></div>
            </div>
          )}
        </div>

        {/* Status Widgets */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-3 font-mono text-[10px] shadow-sm">
            <span className="mb-1 font-semibold text-slate-400 uppercase">Status</span>
            <div className="flex items-center gap-1.5 rounded bg-emerald-50 px-2 py-0.5 font-bold text-emerald-600">
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  isFetching ? "animate-pulse bg-slate-400" : "bg-emerald-500"
                }`}
              />
              {isFetching ? "..." : "200 OK"}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-3 font-mono text-[10px] shadow-sm">
            <span className="mb-1 font-semibold text-slate-400 uppercase">Latency</span>
            <span className="font-bold text-slate-700">
              {isFetching ? "..." : `${(index + 1) * 24}ms`}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border border-slate-200 bg-white p-3 font-mono text-[10px] shadow-sm">
            <span className="mb-1 font-semibold text-slate-400 uppercase">Duration</span>
            <span className="font-bold text-slate-700 text-center">{item.period}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <Section id="experience">
      <SectionTitle line1="WORK" line2="EXPERIENCE" align="right" />

      <p className="-mt-6 mb-12 ml-auto max-w-lg text-right text-sm leading-relaxed text-slate-500 sm:text-[15px]">
        My professional timeline, formatted as API documentation. Human-readable details on the left, payload specs on the right.
      </p>

      {/* API Docs Container */}
      <div className="mx-auto flex w-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Global Docs Header */}
        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 shadow-sm">
            <Code2 className="h-4 w-4" />
          </div>
          <h3 className="font-mono text-sm font-semibold text-slate-700">
            Developer_Portal / <span className="text-slate-400">v1</span> /{" "}
            <span className="font-bold text-slate-900">Experience_Objects</span>
          </h3>
          <div className="ml-auto hidden items-center gap-2 sm:flex">
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              API Operational
            </span>
          </div>
        </div>

        {/* Documentation Rows */}
        <div className="flex flex-col">
          {exp.map((item, i) => (
            <ExperienceRow key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

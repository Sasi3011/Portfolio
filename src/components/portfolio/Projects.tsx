import { motion } from "framer-motion";
import { Github, ExternalLink, CheckCircle2, FolderKanban } from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const ease = [0.22, 1, 0.36, 1] as const;

interface TechStack {
  name: string;
  icon: string;
  color: string;
}

interface Project {
  index: string;
  name: string;
  tag: string;
  desc: string;
  tech: TechStack[];
  features: string[];
  accent: string;
  accentAlt: string;
  github: string;
  demo: string;
  previewUrl: string;
}

const projects: Project[] = [
  {
    index: "01",
    name: "ATHLIXIR",
    tag: "Sports & Athlete Management",
    desc: "A full-stack platform for athlete performance tracking, event management, analytics, and responsive dashboards built for teams.",
    tech: [
      { name: "React.js", icon: "react", color: "61DAFB" },
      { name: "Tailwind CSS", icon: "tailwindcss", color: "06B6D4" },
      { name: "Firebase", icon: "firebase", color: "FFCA28" },
      { name: "Figma", icon: "figma", color: "F24E1E" },
    ],
    features: ["Athlete Management", "Event Tracking", "Performance Analytics", "Responsive Dashboard"],
    accent: "#6366F1",
    accentAlt: "#8B5CF6",
    github: "https://github.com/sasikiran-tt/athlixir",
    demo: "https://athlixir.vercel.app",
    previewUrl: "athlixir.vercel.app",
  },
  {
    index: "02",
    name: "Billing Software",
    tag: "MERN Stack Application",
    desc: "A secure billing and invoicing system with authentication, product management, invoice generation, and real-time payment tracking.",
    tech: [
      { name: "MongoDB", icon: "mongodb", color: "47A248" },
      { name: "Express.js", icon: "express", color: "404040" },
      { name: "React.js", icon: "react", color: "61DAFB" },
      { name: "Node.js", icon: "nodedotjs", color: "339933" },
    ],
    features: ["User Authentication", "Product Management", "Invoice Generation", "Payment Tracking"],
    accent: "#10B981",
    accentAlt: "#059669",
    github: "https://github.com/sasikiran-tt/billing-software",
    demo: "https://billing-mern.vercel.app",
    previewUrl: "billing-mern.vercel.app",
  },
];

function ProjectPreview({ p }: { p: Project }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_20px_50px_-24px_rgba(15,23,42,0.18)]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50/90 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
        </div>
        <div className="mx-auto flex min-w-0 max-w-[220px] flex-1 items-center justify-center rounded-md border border-slate-200/80 bg-white px-3 py-1">
          <span className="truncate font-mono text-[10px] text-slate-400">{p.previewUrl}</span>
        </div>
      </div>

      {/* Preview canvas */}
      <div
        className="relative flex aspect-[16/10] items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${p.accent}18 0%, ${p.accentAlt}10 45%, #f8fafc 100%)`,
        }}
      >
        <div
          className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full blur-3xl"
          style={{ backgroundColor: `${p.accent}30` }}
        />
        <div
          className="pointer-events-none absolute -bottom-12 -right-8 h-48 w-48 rounded-full blur-3xl"
          style={{ backgroundColor: `${p.accentAlt}25` }}
        />

        <div className="relative z-10 w-[88%] max-w-full rounded-xl border border-white/70 bg-white/90 p-3 shadow-lg backdrop-blur-sm sm:w-[78%] sm:p-5">
          <div className="mb-3 flex items-center justify-between">
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-widest"
              style={{ color: p.accent }}
            >
              Project {p.index}
            </span>
            <FolderKanban className="h-4 w-4" style={{ color: p.accent }} />
          </div>
          <p className="hero-headline text-xl font-bold tracking-[0.04em] text-slate-900 sm:text-2xl">{p.name}</p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-400">{p.tag}</p>
          <div className="mt-4 grid grid-cols-1 gap-2 min-[400px]:grid-cols-2">
            {p.features.slice(0, 4).map((f) => (
              <div
                key={f}
                className="rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-2 text-[10px] font-medium text-slate-600"
              >
                {f}
              </div>
            ))}
          </div>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-4 select-none font-mono text-[4.5rem] font-black leading-none opacity-[0.06] sm:text-[6rem]"
          style={{ color: p.accent }}
        >
          {p.index}
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ p, reverse }: { p: Project; reverse: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, ease }}
      className={`grid items-center gap-8 lg:grid-cols-2 lg:gap-12 ${reverse ? "lg:[direction:rtl]" : ""}`}
    >
      <div className={`${reverse ? "lg:[direction:ltr]" : ""}`}>
        <ProjectPreview p={p} />
      </div>

      <div className={`${reverse ? "lg:[direction:ltr]" : ""}`}>
        <div className="mb-4 flex items-center gap-3">
          <span
            className="inline-flex items-center rounded-lg px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest"
            style={{ color: p.accent, backgroundColor: `${p.accent}12` }}
          >
            {p.index}
          </span>
          <span className="h-px flex-1 bg-slate-200" />
        </div>

        <h3 className="hero-headline text-2xl font-bold tracking-[0.03em] text-slate-900 sm:text-3xl md:text-4xl">{p.name}</h3>
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">{p.tag}</p>

        <p className="prose-body mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {p.desc}
        </p>

        <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
          {p.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.tech.map((t) => (
            <span
              key={t.name}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200/80 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm"
            >
              <img
                src={`https://cdn.simpleicons.org/${t.icon}/${t.color}`}
                alt=""
                className="h-3.5 w-3.5 object-contain"
                loading="lazy"
              />
              {t.name}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {p.github && (
            <motion.a
              href={p.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
            >
              <Github className="h-4 w-4" />
              View Code
            </motion.a>
          )}
          {p.demo && (
            <motion.a
              href={p.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90"
              style={{ backgroundColor: p.accent, boxShadow: `0 8px 24px ${p.accent}40` }}
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </motion.a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionTitle line1="SELECTED" line2="PROJECTS" align="left" />

      <p className="-mt-6 mb-10 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mb-12 sm:text-[15px]">
        End-to-end products I designed, built, and shipped — from concept and UI to deployment.
      </p>

      <div className="space-y-16 sm:space-y-20 lg:space-y-24">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} reverse={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}

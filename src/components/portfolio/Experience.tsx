import { motion } from "framer-motion";
import { Briefcase, Building2, CheckCircle2 } from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const ease = [0.22, 1, 0.36, 1] as const;

interface ExperienceItem {
  index: string;
  role: string;
  org: string;
  period: string;
  type: string;
  accent: string;
  accentAlt: string;
  skills: string[];
  points: string[];
}

const exp: ExperienceItem[] = [
  {
    index: "01",
    role: "UI/UX Designer",
    org: "ACS Auto Consultancy",
    period: "Internship",
    type: "Design",
    accent: "#06B6D4",
    accentAlt: "#3B82F6",
    skills: ["Figma", "Prototyping", "User Flows"],
    points: [
      "Designed 10+ professional screens in Figma",
      "Developed interactive prototypes for client review",
      "Improved user journeys and overall usability",
      "Collaborated with stakeholders on product requirements",
    ],
  },
  {
    index: "02",
    role: "UI/UX Design Intern",
    org: "CodeGalatta",
    period: "Internship",
    type: "Product Design",
    accent: "#8B5CF6",
    accentAlt: "#EC4899",
    skills: ["Wireframes", "Hi-Fi UI", "UX Research"],
    points: [
      "Created wireframes and high-fidelity prototypes",
      "Worked on multiple product modules end-to-end",
      "Enhanced UX through iterative design feedback",
      "Collaborated with mentors and development teams",
    ],
  },
];

function ExperienceCard({ item, i }: { item: ExperienceItem; i: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: i * 0.08, ease }}
      className="relative grid grid-cols-[auto_1fr] gap-5 sm:gap-7"
    >
      <div className="flex flex-col items-center pt-1">
        <div
          className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-xl border bg-white shadow-sm sm:h-11 sm:w-11"
          style={{ borderColor: `${item.accent}35`, color: item.accent }}
        >
          <Briefcase className="h-4.5 w-4.5" strokeWidth={1.75} />
        </div>
        {i < exp.length - 1 && (
          <div
            className="mt-2 w-px flex-1 min-h-[2.5rem]"
            style={{ background: `linear-gradient(to bottom, ${item.accent}45, transparent)` }}
          />
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_32px_-20px_rgba(15,23,42,0.14)] transition-shadow hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.18)]">
        <div
          className="h-0.5 w-full"
          style={{ background: `linear-gradient(90deg, ${item.accent}, ${item.accentAlt})` }}
        />

        <div className="p-6 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span
              className="rounded-md px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest"
              style={{ color: item.accent, backgroundColor: `${item.accent}10` }}
            >
              {item.index}
            </span>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-slate-500">
              {item.period}
            </span>
            <span
              className="rounded-md px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white"
              style={{ backgroundColor: item.accent }}
            >
              {item.type}
            </span>
          </div>

          <h3 className="hero-headline text-xl font-bold tracking-[0.03em] text-slate-900 sm:text-2xl">
            {item.role}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
            <Building2 className="h-3.5 w-3.5 shrink-0" style={{ color: item.accent }} />
            <span className="font-medium text-slate-700">{item.org}</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {item.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-slate-200/80 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600"
              >
                {skill}
              </span>
            ))}
          </div>

          <ul className="mt-5 grid gap-2.5 border-t border-slate-100 pt-5 sm:grid-cols-2 sm:gap-x-5">
            {item.points.map((point) => (
              <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-slate-600">
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  return (
    <Section id="experience">
      <SectionTitle line1="WORK" line2="EXPERIENCE" align="right" />

      <p className="-mt-6 mb-10 ml-auto max-w-lg text-right text-sm leading-relaxed text-muted-foreground sm:mb-12 sm:text-[15px]">
        Design-led internships where I shipped real interfaces and improved product usability.
      </p>

      <div className="relative mx-auto max-w-3xl space-y-6 sm:space-y-7">
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-4 left-[19px] top-4 hidden w-px sm:left-[21px] sm:block"
          style={{ background: "linear-gradient(to bottom, #3b82f630, #8b5cf630, transparent)" }}
        />

        {exp.map((item, i) => (
          <ExperienceCard key={item.org} item={item} i={i} />
        ))}
      </div>
    </Section>
  );
}

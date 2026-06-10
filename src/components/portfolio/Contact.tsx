import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
  Terminal,
} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import {
  EMAIL,
  GITHUB_URL,
  GITHUB_USERNAME,
  LINKEDIN_URL,
  PHONE,
} from "@/lib/constants/social";

const contactLinks = [
  {
    key: "email",
    label: "Email",
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    Icon: Mail,
    color: "text-blue-500",
    lineNo: "01",
  },
  {
    key: "phone",
    label: "Phone",
    value: PHONE,
    href: `tel:${PHONE.replace(/\s/g, "")}`,
    Icon: Phone,
    color: "text-emerald-500",
    lineNo: "02",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/sasikiran",
    href: LINKEDIN_URL,
    Icon: Linkedin,
    color: "text-indigo-500",
    lineNo: "03",
  },
  {
    key: "github",
    label: "GitHub",
    value: `github.com/${GITHUB_USERNAME}`,
    href: GITHUB_URL,
    Icon: Github,
    color: "text-purple-500",
    lineNo: "04",
  },
];

export default function Contact() {
  return (
    <Section id="contact" className="justify-start pt-24 md:pt-32">
      <SectionTitle line1="LET'S" line2="CONNECT" align="left" />

      <p className="-mt-6 mb-10 max-w-xl text-sm leading-relaxed text-slate-500 sm:text-[15px]">
        Open to freelancing, internships, and full-time roles. Pick a channel —
        I&apos;ll get back within 24 hours.
      </p>

      {/* Light Theme IDE Window */}
      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-slate-900/5">
        
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#F8F9FA] px-6 py-3.5 sm:px-8">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full border border-rose-300 bg-rose-400" />
            <span className="h-3 w-3 rounded-full border border-amber-300 bg-amber-400" />
            <span className="h-3 w-3 rounded-full border border-emerald-300 bg-emerald-400" />
          </div>
          
          <div className="flex items-center gap-2 rounded-md bg-white px-4 py-1 shadow-sm border border-slate-200">
            <Terminal className="h-3.5 w-3.5 text-blue-500" />
            <span className="font-mono text-xs font-semibold text-slate-600">
              contact.ts
            </span>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-600">
              Live
            </span>
          </div>
        </div>

        {/* Code Editor Body */}
        <div className="p-4 sm:p-6 md:p-8 bg-white font-mono">
          
          {/* const declaration */}
          <div className="mb-4 text-xs sm:text-sm font-semibold">
            <span className="text-blue-600">const </span>
            <span className="text-slate-800">contact</span>
            <span className="text-slate-400"> = </span>
            <span className="text-slate-500">{"{"}</span>
          </div>

          {/* Contact rows */}
          <div className="flex flex-col gap-1 pl-0 sm:pl-4">
            {contactLinks.map(
              ({ key, label, value, href, Icon, color, lineNo }, i) => (
                <motion.a
                  key={key}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: i * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover="hover"
                  className="group flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-6 py-4 px-4 rounded-xl transition-colors duration-200 hover:bg-slate-50 border border-transparent hover:border-slate-100 cursor-pointer"
                >
                  {/* Line number */}
                  <span className="hidden sm:inline-block w-8 shrink-0 text-xs text-slate-300 font-medium select-none">
                    {lineNo}
                  </span>

                  {/* Key */}
                  <span
                    className={`shrink-0 text-sm font-bold sm:text-base md:text-lg ${color} w-24`}
                  >
                    {key}
                  </span>

                  {/* Colon */}
                  <span className="shrink-0 text-sm font-bold text-slate-400 sm:text-base">
                    :
                  </span>

                  {/* Label — big */}
                  <motion.span
                    variants={{ hover: { x: 6 } }}
                    transition={{ duration: 0.2 }}
                    className="flex-1 font-sans text-xl font-black tracking-tight text-slate-800 sm:text-2xl md:text-3xl"
                  >
                    {label}
                  </motion.span>

                  {/* Link value — right side (Light theme string color usually red/rose) */}
                  <span className="hidden font-mono text-[13px] font-medium text-rose-600 transition md:block truncate max-w-[280px]">
                    &quot;{value}&quot;
                  </span>

                  {/* Arrow button */}
                  <motion.span
                    variants={{ hover: { rotate: 45, scale: 1.1 } }}
                    transition={{ duration: 0.2 }}
                    className="grid h-10 w-10 sm:h-12 sm:w-12 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-400 shadow-sm transition group-hover:border-blue-500 group-hover:bg-blue-50 group-hover:text-blue-500"
                  >
                    <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
                  </motion.span>
                </motion.a>
              ),
            )}
          </div>

          {/* Closing brace */}
          <div className="mt-4 font-mono text-xs sm:text-sm font-semibold">
            <span className="text-slate-500">{"}"}</span>
            <span className="text-slate-400">;</span>
          </div>

          {/* Terminal prompt at bottom */}
          <div className="mt-8 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-5 text-[11px] sm:text-xs font-semibold bg-slate-50/50 -mx-4 sm:-mx-8 -mb-4 sm:-mb-8 px-4 sm:px-8 pb-4 sm:pb-6 rounded-b-2xl">
            <span className="text-emerald-600">
              sasikiran@portfolio
            </span>
            <span className="text-slate-400">
              :
            </span>
            <span className="text-blue-600">
              ~/contact
            </span>
            <span className="text-slate-400">
              $
            </span>
            <span className="text-slate-700 animate-pulse">
              ping me 🚀_
            </span>
          </div>
        </div>
      </div>
    </Section>
  );
}

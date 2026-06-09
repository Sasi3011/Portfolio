import { motion } from "framer-motion";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

type TechLogo =
  | { type: "simple"; slug: string; color: string }
  | { type: "img"; src: string };

interface TechItem {
  name: string;
  logo: TechLogo;
  brandColor: string;
}

const categories: { title: string; color: string; techs: TechItem[] }[] = [
  {
    title: "Frontend",
    color: "#8B5CF6",
    techs: [
      { name: "React.js",     logo: { type: "simple", slug: "react",       color: "61DAFB" }, brandColor: "61DAFB" },
      { name: "TypeScript",   logo: { type: "simple", slug: "typescript",  color: "3178C6" }, brandColor: "3178C6" },
      { name: "JavaScript",   logo: { type: "simple", slug: "javascript",  color: "F7DF1E" }, brandColor: "F7DF1E" },
      { name: "Next.js",      logo: { type: "simple", slug: "nextdotjs",   color: "000000" }, brandColor: "475569" },
      { name: "Tailwind CSS", logo: { type: "simple", slug: "tailwindcss", color: "06B6D4" }, brandColor: "06B6D4" },
      { name: "HTML5",        logo: { type: "simple", slug: "html5",       color: "E34F26" }, brandColor: "E34F26" },
      { name: "CSS3",         logo: { type: "img", src: "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg" }, brandColor: "1572B6" },
    ],
  },
  {
    title: "Backend",
    color: "#10B981",
    techs: [
      { name: "Node.js",    logo: { type: "simple", slug: "nodedotjs", color: "339933" }, brandColor: "339933" },
      { name: "Express.js", logo: { type: "simple", slug: "express",   color: "404040" }, brandColor: "404040" },
      { name: "NestJS",     logo: { type: "simple", slug: "nestjs",    color: "E0234E" }, brandColor: "E0234E" },
      { name: "REST APIs",  logo: { type: "simple", slug: "swagger",   color: "85EA2D" }, brandColor: "5a7f00" },
      { name: "Python",     logo: { type: "simple", slug: "python",    color: "3776AB" }, brandColor: "3776AB" },
    ],
  },
  {
    title: "Database",
    color: "#3B82F6",
    techs: [
      { name: "MongoDB",    logo: { type: "simple", slug: "mongodb",    color: "47A248" }, brandColor: "47A248" },
      { name: "Firebase",   logo: { type: "simple", slug: "firebase",   color: "FFCA28" }, brandColor: "f97316" },
      { name: "PostgreSQL", logo: { type: "simple", slug: "postgresql", color: "4169E1" }, brandColor: "4169E1" },
    ],
  },
  {
    title: "Design",
    color: "#EC4899",
    techs: [
      { name: "Figma", logo: { type: "img", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" }, brandColor: "F24E1E" },
      { name: "Canva", logo: { type: "simple", slug: "canva", color: "00C4CC" }, brandColor: "00C4CC" },
    ],
  },
  {
    title: "Languages",
    color: "#F59E0B",
    techs: [
      { name: "C",      logo: { type: "simple", slug: "c",         color: "00599C" }, brandColor: "00599C" },
      { name: "C++",    logo: { type: "img", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" }, brandColor: "00599C" },
      { name: "Python", logo: { type: "simple", slug: "python",    color: "3776AB" }, brandColor: "3776AB" },
      { name: "Java",   logo: { type: "img", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" }, brandColor: "F89820" },
    ],
  },
  {
    title: "Tools",
    color: "#0EA5E9",
    techs: [
      { name: "VS Code", logo: { type: "img", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/visualstudiocode.svg" }, brandColor: "007ACC" },
      { name: "Git",     logo: { type: "simple", slug: "git",     color: "F05032" }, brandColor: "F05032" },
      { name: "GitHub",  logo: { type: "simple", slug: "github",  color: "24292e" }, brandColor: "24292e" },
      { name: "Postman", logo: { type: "simple", slug: "postman", color: "FF6C37" }, brandColor: "FF6C37" },
    ],
  },
];

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Stagger container: triggers when it scrolls into view
const logoContainer = {
  hidden: {
    transition: {
      staggerChildren: 0.07,
      staggerDirection: -1, // reverse order on exit
    },
  },
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

// Each logo pops up from below, exits downward in reverse
const logoItem = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.65,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Skills() {
  return (
    <Section id="skills">
      <SectionTitle
        label="Expertise"
        line1="TECHNICAL"
        line2="SKILLS"
        description="Technologies and tools I use to design, build, and ship products."
        align="right"
      />

      <div className="mt-10 sm:mt-14 max-w-5xl mx-auto space-y-0">
        {categories.map((cat, i) => (
          <div
            key={cat.title}
            className={i !== categories.length - 1 ? "border-b border-slate-100" : ""}
          >
            {/* Each row: fixed-width label | logos left-aligned */}
            <div className="grid grid-cols-1 items-center gap-4 py-5 sm:grid-cols-[11.5rem_minmax(0,1fr)] sm:gap-x-8 sm:py-6 md:grid-cols-[13.5rem_minmax(0,1fr)] md:gap-x-10 lg:grid-cols-[15rem_minmax(0,1fr)]">

              {/* Category label — fixed column so logos align and text never overlaps icons */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0 overflow-hidden"
              >
                <h3
                  className="max-w-full text-3xl font-black leading-[0.92] tracking-tighter select-none sm:text-4xl md:text-5xl"
                  style={{ color: cat.color }}
                >
                  {cat.title}
                </h3>
              </motion.div>

              {/* Logos — stagger in one by one on scroll */}
              <motion.div
                className="flex min-w-0 flex-wrap items-center gap-2.5 sm:gap-3"
                variants={logoContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-40px" }}
              >
                {cat.techs.map((tech, j) => {
                  const iconSrc =
                    tech.logo.type === "simple"
                      ? `https://cdn.simpleicons.org/${tech.logo.slug}/${tech.logo.color}`
                      : tech.logo.src;

                  return (
                    <motion.div
                      key={tech.name}
                      variants={logoItem}
                      whileHover={{ y: -5, scale: 1.15 }}
                      className="relative group/tip cursor-default"
                    >
                      {/* Icon tile */}
                      <div
                        className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-200"
                        style={{
                          backgroundColor: hexToRgba(tech.brandColor, 0.08),
                          borderColor: hexToRgba(tech.brandColor, 0.25),
                        }}
                      >
                        <img
                          src={iconSrc}
                          alt={tech.name}
                          className="h-6 w-6 object-contain sm:h-7 sm:w-7"
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                        />
                      </div>

                      {/* Glow on hover */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover/tip:opacity-100 transition-opacity duration-200 pointer-events-none"
                        style={{ boxShadow: `0 0 18px ${hexToRgba(tech.brandColor, 0.45)}` }}
                      />

                      {/* Tooltip */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1.5 bg-slate-900 text-white text-[10px] font-semibold rounded-lg opacity-0 pointer-events-none group-hover/tip:opacity-100 transition-opacity duration-150 whitespace-nowrap z-20 shadow-xl">
                        {tech.name}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-slate-900" />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

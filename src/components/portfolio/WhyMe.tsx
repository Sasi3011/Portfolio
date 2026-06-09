import { motion } from "framer-motion";
import { Heart, Palette, Target, Zap } from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const ease = [0.22, 1, 0.36, 1] as const;

const values = [
  {
    Icon: Zap,
    title: "Speed + Polish",
    description:
      "I ship quickly without sacrificing quality — tight feedback loops, clean code, and refined UI in every delivery.",
    accent: "#F97316",
  },
  {
    Icon: Target,
    title: "Product Mindset",
    description:
      "Every decision is grounded in user value and business impact — not code for code's sake.",
    accent: "#EC4899",
  },
  {
    Icon: Palette,
    title: "Design + Code",
    description:
      "From Figma wireframes to deployed React apps — one person who handles both design and development.",
    accent: "#8B5CF6",
  },
  {
    Icon: Heart,
    title: "Founder Energy",
    description:
      "Hackathon-tested ownership. I treat every project like a startup I'm building — committed and proactive.",
    accent: "#EF4444",
  },
];

export default function WhyMe() {
  return (
    <Section id="why">
      <SectionTitle line1="WHY WORK" line2="WITH ME" align="left" />

      <p className="-mt-6 mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mb-10 sm:text-[15px]">
        One partner who designs and ships — so your idea moves from concept to launch without handoff friction.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {values.map((item, i) => {
          const Icon = item.Icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: i * 0.06, ease }}
              className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.12)] sm:p-7"
            >
              <div
                className="mb-4 grid h-10 w-10 place-items-center rounded-xl border bg-white"
                style={{ borderColor: `${item.accent}30`, color: item.accent }}
              >
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

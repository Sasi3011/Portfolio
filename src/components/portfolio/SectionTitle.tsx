import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

interface SectionTitleProps {
  label?: string;
  line1: string;
  line2?: string;
  description?: string;
  compact?: boolean;
  align?: "left" | "right";
}

export default function SectionTitle({
  line1,
  line2,
  compact = false,
  align = "left",
}: SectionTitleProps) {
  const isLeft = align === "left";

  return (
    <div
      className={`w-full ${
        compact ? "mb-0" : "mb-10 lg:mb-14"
      }`}
    >
      {/* Main heading row with line */}
      <div className={`flex w-full flex-col gap-4 lg:flex-row ${isLeft ? "" : "lg:flex-row-reverse"} lg:items-center lg:gap-6`}>
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          {!isLeft && <div className="hidden h-px min-w-6 flex-1 bg-primary/15 sm:block" />}
          <h2 className="section-title hero-headline flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[clamp(1.55rem,7vw,3.75rem)] font-bold uppercase leading-none select-none sm:gap-x-3 sm:text-5xl md:text-6xl">
            <span className="text-gradient break-words">{line1}</span>
            {line2 && <span className="text-outline-blue break-words">{line2}</span>}
          </h2>
          {isLeft && <div className="hidden h-px min-w-6 flex-1 bg-primary/15 sm:block" />}
        </div>
      </div>
    </div>
  );
}

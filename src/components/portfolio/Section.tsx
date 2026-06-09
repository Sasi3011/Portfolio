import React from "react";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, children, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`h-screen-section px-4 pt-20 pb-16 sm:px-6 sm:pt-24 md:px-10 md:py-24 section-glow ${className}`}
    >
      <div className="mx-auto w-full min-w-0 max-w-[1400px]">{children}</div>
    </section>
  );
}

import { useState } from "react";
import { User, Code, Rocket, Terminal } from "lucide-react";

export default function HudTerminal() {
  const [activeTab, setActiveTab] = useState("whoami");

  const tabs = [
    { id: "whoami", label: "whoami", icon: User },
    { id: "stack", label: "stack", icon: Code },
    { id: "mission", label: "mission", icon: Rocket },
  ];

  const content = {
    whoami:
      "B.E. Computer Science student at Sri Eshwar College of Engineering. Aggressive problem solver, MERN enthusiast, UI/UX designer, and zonal hackathon finalist.",
    stack:
      "React, Node.js, Express, MongoDB, PostgreSQL, Firebase, TypeScript, Tailwind CSS, Figma, Wireframing, Python, Git.",
    mission:
      "Building scalable, clean products that solve business problems, leading design-to-deployment, and aspiring to launch digital ventures.",
  };

  return (
    <div className="mt-8 w-full max-w-lg rounded-xl border border-primary/15 bg-black/[0.02] p-4 text-left backdrop-blur-sm">
      <div className="mb-3.5 flex items-center justify-between border-b border-primary/10 pb-2.5">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-primary" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            console // query_sys
          </span>
        </div>
        <div className="flex gap-1.5">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                type="button"
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`flex items-center gap-1 rounded-md px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider transition ${
                  activeTab === t.id
                    ? "bg-primary/15 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-primary/5 border border-transparent"
                }`}
              >
                <Icon className="h-3 w-3" />
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
      <div className="min-h-[60px] font-mono text-[11px] leading-relaxed text-muted-foreground/90 sm:text-xs">
        <span className="text-primary font-bold">sasi@portfolio:~$</span> query{" "}
        {activeTab}
        <p className="mt-2 text-foreground font-sans leading-relaxed">
          {content[activeTab as keyof typeof content]}
        </p>
      </div>
    </div>
  );
}

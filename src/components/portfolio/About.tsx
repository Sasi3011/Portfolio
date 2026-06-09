import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FileText, ChevronRight, User, GraduationCap, Sparkles } from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const ease = [0.22, 1, 0.36, 1] as const;

export default function About() {
  const [activeTab, setActiveTab] = useState<"story" | "education" | "profile">("story");

  const files = [
    { id: "story", name: "story.md", icon: FileText, color: "text-emerald-600" },
    { id: "education", name: "education.json", icon: FileText, color: "text-amber-600" },
    { id: "profile", name: "profile.ts", icon: FileText, color: "text-blue-600" },
  ] as const;

  const renderStoryCode = () => (
    <div className="font-mono text-[11px] leading-relaxed text-slate-800 sm:text-xs">
      <div><span className="text-violet-600 font-semibold"># About Me</span></div>
      <div>&nbsp;</div>
      <div><span className="text-slate-400">&lt;!-- Profile Introduction --&gt;</span></div>
      <div className="mt-1 leading-normal">I&apos;m Sasikiran T.T., a B.E. Computer Science student with a strong interest in technology, design, and entrepreneurship. I build full-stack web applications and craft UI/UX experiences.</div>
      <div>&nbsp;</div>
      <div className="mt-1 leading-normal">By combining engineering, creativity, and product thinking, I work to turn abstract ideas into real, usable digital products.</div>
      <div>&nbsp;</div>
      <div className="mt-1 leading-normal">Hackathons, startup programs, and continuous learning keep me sharp, curious, and motivated to create impactful products.</div>
    </div>
  );

  const renderProfileCode = () => (
    <div className="font-mono text-[11px] leading-relaxed text-slate-800 sm:text-xs">
      <div>
        <span className="text-violet-600 font-semibold">export const</span> <span className="text-blue-600">developer</span> = &#123;
      </div>
      <div className="pl-4">
        <span className="text-blue-600">name</span>: <span className="text-emerald-600">&quot;Sasikiran T.T.&quot;</span>,
      </div>
      <div className="pl-4">
        <span className="text-blue-600">role</span>: <span className="text-emerald-600">&quot;Full Stack &amp; UI/UX Builder&quot;</span>,
      </div>
      <div className="pl-4">
        <span className="text-blue-600">status</span>: <span className="text-emerald-600">&quot;Active Student&quot;</span>,
      </div>
      <div className="pl-4">
        <span className="text-blue-600">cgpa</span>: <span className="text-amber-700">7.9</span>,
      </div>
      <div className="pl-4">
        <span className="text-blue-600">institution</span>: <span className="text-emerald-600">&quot;Sri Eshwar College of Engineering&quot;</span>,
      </div>
      <div className="pl-4">
        <span className="text-blue-600">skills</span>: [
      </div>
      <div className="pl-8 text-emerald-600">
        &quot;Design Systems&quot;, &quot;MERN Stack&quot;, &quot;Firebase&quot;, &quot;TypeScript&quot;
      </div>
      <div className="pl-4">]</div>
      <div>&#125;;</div>
    </div>
  );

  const renderEducationCode = () => (
    <div className="font-mono text-[11px] leading-relaxed text-slate-800 sm:text-xs">
      <div>[</div>
      <div className="pl-4">&#123;</div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;institution&quot;</span>: <span className="text-emerald-600">&quot;Sri Eshwar College of Engineering&quot;</span>,
      </div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;major&quot;</span>: <span className="text-emerald-600">&quot;B.E. Computer Science&quot;</span>,
      </div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;cgpa&quot;</span>: <span className="text-emerald-600">&quot;7.9 / 10&quot;</span>,
      </div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;period&quot;</span>: <span className="text-emerald-600">&quot;2024 – Present&quot;</span>,
      </div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;active&quot;</span>: <span className="text-amber-700">true</span>
      </div>
      <div className="pl-4">&#125;,</div>
      <div className="pl-4">&#123;</div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;institution&quot;</span>: <span className="text-emerald-600">&quot;Vikas Vidyalaya Matriculation Higher Secondary School&quot;</span>,
      </div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;major&quot;</span>: <span className="text-emerald-600">&quot;Higher Secondary (12th)&quot;</span>,
      </div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;percentage&quot;</span>: <span className="text-emerald-600">&quot;77%&quot;</span>,
      </div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;period&quot;</span>: <span className="text-emerald-600">&quot;2023 – 2024&quot;</span>
      </div>
      <div className="pl-4">&#125;,</div>
      <div className="pl-4">&#123;</div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;institution&quot;</span>: <span className="text-emerald-600">&quot;A.V.P. Trust National Matric. Hr. Sec. School&quot;</span>,
      </div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;major&quot;</span>: <span className="text-emerald-600">&quot;Secondary School (10th)&quot;</span>,
      </div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;percentage&quot;</span>: <span className="text-emerald-600">&quot;77%&quot;</span>,
      </div>
      <div className="pl-8">
        <span className="text-blue-600">&quot;period&quot;</span>: <span className="text-emerald-600">&quot;2021 – 2022&quot;</span>
      </div>
      <div className="pl-4">&#125;</div>
      <div>]</div>
    </div>
  );

  return (
    <Section id="about">
      <SectionTitle
        label="About"
        line1="ABOUT"
        line2="ME"
        description="Computer Science student, product builder, and aspiring founder focused on meaningful digital products."
        align="left"
      />

      <div className="w-full mt-6 sm:mt-10">
        {/* Unified Developer Workspace Card */}
        <div className="panel-glow flex h-auto min-h-0 flex-col overflow-hidden rounded-2xl border border-primary/20 bg-white/70 shadow-[0_8px_32px_-12px_rgba(59,130,246,0.08)] md:min-h-[480px] lg:min-h-[520px] md:flex-row">
          
          {/* Left Column: File Explorer Sidebar */}
          <div className="w-full md:w-[220px] shrink-0 border-b md:border-b-0 md:border-r border-primary/15 bg-slate-50/70 p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4 px-1">
                <Folder className="h-4 w-4 text-primary" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">Explorer</span>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 px-1 py-1 font-mono text-[11px] font-semibold text-foreground/80">
                  <ChevronRight className="h-3.5 w-3.5 rotate-90 text-muted-foreground/60" />
                  <span>src</span>
                </div>
                <div className="pl-4 space-y-1">
                  {files.map((file) => {
                    const isActive = activeTab === file.id;
                    const FileIcon = file.icon;
                    return (
                      <button
                        type="button"
                        key={file.id}
                        onClick={() => setActiveTab(file.id)}
                        className={`w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left font-mono text-xs transition duration-200 ${
                          isActive
                            ? "bg-primary/10 text-primary font-medium border border-primary/15"
                            : "text-muted-foreground hover:bg-slate-200/50 hover:text-foreground border border-transparent"
                        }`}
                      >
                        <FileIcon className={`h-3.5 w-3.5 ${file.color}`} />
                        <span>{file.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Quick status stamp at bottom of explorer */}
            <div className="hidden md:block pt-4 border-t border-primary/10 font-mono text-[9px] text-muted-foreground/50 tracking-wider">
              <span>status: active</span>
            </div>
          </div>

          {/* Right Column: Code Editor & Preview Tab Viewports */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white/40">
            {/* Editor Tabs Bar */}
            <div className="flex border-b border-primary/15 bg-slate-100/50 overflow-x-auto scrollbar-none">
              {files.map((file) => {
                const isActive = activeTab === file.id;
                const FileIcon = file.icon;
                return (
                  <button
                    type="button"
                    key={file.id}
                    onClick={() => setActiveTab(file.id)}
                    className={`flex items-center gap-2 border-r border-primary/15 px-5 py-3 text-xs font-mono tracking-wide transition duration-200 ${
                      isActive
                        ? "bg-white/95 text-primary border-t-2 border-t-primary font-medium"
                        : "text-muted-foreground hover:bg-slate-200/40"
                    }`}
                  >
                    <FileIcon className={`h-3.5 w-3.5 ${file.color}`} />
                    <span>{file.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Content Pane (Split on large screens, stacked on small) */}
            <div className="flex-1 p-5 sm:p-6 md:p-8 grid gap-6 md:grid-cols-12 md:gap-8 min-h-[400px]">
              
              {/* Split Half 1: Syntax Highlighted Code Viewer */}
              <div className="md:col-span-7 rounded-xl border border-primary/15 bg-slate-50/50 p-4 sm:p-5 flex flex-col justify-start relative h-auto">
                {/* Micro tech console header */}
                <div className="flex justify-between items-center pb-3 border-b border-primary/10 mb-4">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                    <div className="h-2 w-2 rounded-full bg-slate-300" />
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40">source view</span>
                </div>
                
                <div className="flex gap-3 items-start overflow-x-auto pb-2">
                  {/* Line numbers */}
                  <div className="font-mono text-[11px] text-muted-foreground/35 select-none text-right pr-2.5 border-r border-primary/10 shrink-0">
                    {Array.from({ length: activeTab === "story" ? 8 : activeTab === "profile" ? 10 : 21 }, (_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  {/* Highlighted text */}
                  <div className="flex-1 min-w-[200px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {activeTab === "story" && renderStoryCode()}
                        {activeTab === "profile" && renderProfileCode()}
                        {activeTab === "education" && renderEducationCode()}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Split Half 2: Interactive Visual Render Viewport */}
              <div className="md:col-span-5 flex flex-col justify-between h-auto">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease }}
                    className="flex-1 flex flex-col justify-between"
                  >
                    
                    {/* Visual Render for Story Tab */}
                    {activeTab === "story" && (
                      <div className="flex-1 flex flex-col justify-between bg-white/40 p-4 sm:p-5 rounded-xl border border-primary/10">
                        <div>
                          <div className="flex items-center gap-3 mb-4 sm:mb-5">
                            <div className="grid h-9 w-9 place-items-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-500">
                              <User className="h-4.5 w-4.5" strokeWidth={2} />
                            </div>
                            <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">My Story</h3>
                          </div>
                          <div className="prose-body space-y-4 text-sm text-muted-foreground leading-relaxed sm:text-[14px]">
                            <p>
                              I&apos;m <span className="font-semibold text-foreground">Sasikiran T.T.</span>, a B.E. Computer Science
                              student with a strong interest in technology, design, and entrepreneurship. I build full-stack web applications and craft UI/UX experiences.
                            </p>
                            <p>
                              By combining engineering, creativity, and product thinking, I work to turn abstract ideas into real, usable digital products.
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-primary/10 flex items-center gap-2 text-xs text-primary font-semibold">
                          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                          <span>Focused on clean designs &amp; scalable code.</span>
                        </div>
                      </div>
                    )}

                    {/* Visual Render for Profile Tab */}
                    {activeTab === "profile" && (
                      <div className="flex-1 flex flex-col justify-between bg-white/40 p-4 sm:p-5 rounded-xl border border-primary/10">
                        <div>
                          <div className="flex items-center gap-3 mb-5 border-b border-primary/10 pb-4">
                            {/* Initials hologram */}
                            <div className="relative h-12 w-12 flex items-center justify-center shrink-0">
                              <div className="absolute inset-0 rounded-full border border-dashed border-primary/40 animate-[spin_20s_linear_infinite]" />
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 flex items-center justify-center">
                                <span className="text-lg font-bold font-hero tracking-widest text-primary">S</span>
                              </div>
                            </div>
                            <div>
                              <h3 className="text-base font-bold text-foreground">Sasikiran T.T.</h3>
                              <p className="text-[10px] font-mono uppercase tracking-widest text-primary">Full Stack &amp; UI/UX</p>
                            </div>
                          </div>

                          <div className="space-y-3 font-mono text-xs text-muted-foreground">
                            <div className="flex justify-between border-b border-black/[0.04] pb-2">
                              <span className="uppercase tracking-wider text-muted-foreground/60 text-[10px]">Status</span>
                              <span className="text-foreground font-medium flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Active Student
                              </span>
                            </div>
                            <div className="flex justify-between border-b border-black/[0.04] pb-2">
                              <span className="uppercase tracking-wider text-muted-foreground/60 text-[10px]">Major</span>
                              <span className="text-foreground font-medium">BE Computer Science</span>
                            </div>
                            <div className="flex justify-between border-b border-black/[0.04] pb-2">
                              <span className="uppercase tracking-wider text-muted-foreground/60 text-[10px]">Institution</span>
                              <span className="text-foreground font-medium">Sri Eshwar College of Engineering</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="uppercase tracking-wider text-muted-foreground/60 text-[10px]">Current CGPA</span>
                              <span className="text-foreground font-semibold">7.9 / 10</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 pt-4 border-t border-primary/10">
                          {["Design Systems", "MERN Stack", "Firebase", "TypeScript"].map((t) => (
                            <span key={t} className="px-2 py-0.5 rounded border border-primary/10 bg-primary/5 text-[9px] font-mono text-primary/80">
                              #{t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Visual Render for Education Tab */}
                    {activeTab === "education" && (
                      <div className="flex-1 flex flex-col justify-between bg-white/40 p-4 sm:p-5 rounded-xl border border-primary/10">
                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <div className="grid h-9 w-9 place-items-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-600">
                              <GraduationCap className="h-4.5 w-4.5" strokeWidth={2} />
                            </div>
                            <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">Education Timeline</h3>
                          </div>

                          {/* Minimalist vertical timeline */}
                          <div className="relative pl-6 space-y-8 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-primary/15">
                            {[
                              {
                                title: "Sri Eshwar College of Engineering",
                                sub: "B.E. Computer Science · CGPA 7.9",
                                date: "2024 – Present",
                                active: true,
                              },
                              {
                                title: "Vikas Vidyalaya Matriculation Higher Secondary School",
                                sub: "Higher Secondary (12th) · 77%",
                                date: "2023 – 2024",
                                active: false,
                              },
                              {
                                title: "A.V.P. Trust National Matric. Hr. Sec. School",
                                sub: "Secondary School (10th) · 77%",
                                date: "2021 – 2022",
                                active: false,
                              },
                            ].map((e, idx) => (
                              <div key={idx} className="relative group/item">
                                <div
                                  className={`absolute -left-[24px] top-[5px] h-4 w-4 rounded-full border transition-all duration-300 ${
                                    e.active
                                      ? "border-primary bg-background shadow-[0_0_8px_rgba(59,130,246,0.5)] scale-110"
                                      : "border-primary/20 bg-primary/5 group-hover/item:border-primary/50"
                                  }`}
                                />
                                <div className="flex flex-col gap-1.5 pl-2.5">
                                  <h4 className="font-bold text-sm sm:text-base text-foreground group-hover/item:text-primary transition-colors leading-snug">
                                    {e.title}
                                  </h4>
                                  <p className="text-xs sm:text-[13px] text-muted-foreground">{e.sub}</p>
                                  <div className="mt-1 flex">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-semibold border uppercase tracking-wider transition-all duration-300 ${
                                      e.active
                                        ? "bg-primary/10 text-primary border-primary/20 shadow-[0_2px_8px_rgba(59,130,246,0.05)]"
                                        : "bg-slate-100 text-muted-foreground border-slate-200"
                                    }`}>
                                      {e.date}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}

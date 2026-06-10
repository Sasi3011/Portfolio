import { useRef } from "react";
import { motion } from "framer-motion";
import { 
  MousePointer2, 
  Type, 
  Square, 
  Circle, 
  StickyNote, 
  PenTool, 
  Hand, 
  MessageSquare
} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const frontend = [
  { name: "React", src: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", src: "https://cdn.simpleicons.org/nextdotjs/000000" },
  { name: "TypeScript", src: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Tailwind", src: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "JavaScript", src: "https://cdn.simpleicons.org/javascript/F7DF1E" },
];

const backend = [
  { name: "Node.js", src: "https://cdn.simpleicons.org/nodedotjs/339933" },
  { name: "Express", src: "https://cdn.simpleicons.org/express/000000" },
  { name: "NestJS", src: "https://cdn.simpleicons.org/nestjs/E0234E" },
  { name: "Python", src: "https://cdn.simpleicons.org/python/3776AB" },
];

const databases = [
  { name: "MongoDB", src: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "PostgreSQL", src: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "Firebase", src: "https://cdn.simpleicons.org/firebase/FFCA28" },
];

const tools = [
  { name: "Git", src: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  { name: "VS Code", src: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/visualstudiocode.svg" },
  { name: "Canva", src: "https://cdn.simpleicons.org/canva/00C4CC" },
];

// Helper to render a FigJam style frame
const CanvasFrame = ({ 
  title, 
  data, 
  color, 
  delay,
  dragConstraints 
}: { 
  title: string; 
  data: typeof frontend; 
  color: string; 
  delay: number;
  dragConstraints: React.RefObject<Element>;
}) => (
  <motion.div 
    drag
    dragConstraints={dragConstraints}
    dragElastic={0.1}
    dragMomentum={false}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ zIndex: 20 }}
    whileDrag={{ scale: 1.02, zIndex: 50, cursor: "grabbing" }}
    className={`p-5 sm:p-6 rounded-3xl border-2 border-dashed bg-white/70 backdrop-blur-md ${color} shadow-sm w-full max-w-[360px] cursor-grab`}
  >
    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-5 ml-1 pointer-events-none">{title}</h3>
    <div className="flex flex-wrap gap-3 pointer-events-none">
      {data.map((tech) => (
        <div 
          key={tech.name} 
          className="group flex items-center gap-2.5 bg-white border border-slate-200 rounded-full pr-4 pl-1.5 py-1.5 shadow-sm transition-all"
        >
          <div className="w-10 h-10 p-2 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center">
            <img src={tech.src} alt={tech.name} className="w-full h-full object-contain" loading="lazy" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-slate-700">{tech.name}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

// Multiplayer Cursor Component
const MultiplayerCursor = ({ name, color, pathX, pathY, delay }: { name: string; color: string; pathX: string[]; pathY: string[]; delay: number }) => (
  <motion.div
    animate={{ x: pathX, y: pathY }}
    transition={{ duration: 15, repeat: Infinity, ease: "linear", delay }}
    className="absolute top-0 left-0 z-40 pointer-events-none hidden sm:block"
  >
    <MousePointer2 className={`w-6 h-6 ${color} fill-current drop-shadow-md`} />
    <div className={`mt-1 ml-5 px-2.5 py-1 rounded-md text-[11px] font-bold text-white shadow-sm whitespace-nowrap w-max ${color.replace('text-', 'bg-')}`}>
      {name}
    </div>
  </motion.div>
);

export default function Skills() {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <Section id="skills" className="pt-24 md:pt-32">
      <SectionTitle
        label="Expertise"
        line1="TECHNICAL"
        line2="SKILLS"
        description="A collaborative whiteboard view of my tech stack. Feel free to drag the frames and notes around!"
        align="right"
      />

      {/* FigJam Canvas Container */}
      <div 
        ref={canvasRef}
        className="relative w-full mt-8 rounded-3xl border border-slate-300 bg-[#F5F6F8] shadow-inner overflow-hidden min-h-[700px] z-0 p-4 sm:p-8 flex items-center justify-center"
      >
        
        {/* Dot Grid Background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(#d4d4d8_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

        {/* Fake Multiplayer Cursors */}
        <MultiplayerCursor 
          name="Tech Recruiter" 
          color="text-rose-500" 
          pathX={["10%", "60%", "80%", "40%", "10%"]} 
          pathY={["20%", "80%", "30%", "70%", "20%"]} 
          delay={0} 
        />
        <MultiplayerCursor 
          name="Senior Dev" 
          color="text-blue-500" 
          pathX={["80%", "20%", "10%", "70%", "80%"]} 
          pathY={["70%", "30%", "80%", "20%", "70%"]} 
          delay={5} 
        />
        <MultiplayerCursor 
          name="Designer" 
          color="text-amber-500" 
          pathX={["50%", "90%", "30%", "10%", "50%"]} 
          pathY={["10%", "50%", "90%", "40%", "10%"]} 
          delay={2} 
        />

        {/* Main Canvas Content */}
        <div className="relative w-full max-w-6xl flex flex-wrap justify-center gap-6 sm:gap-10 pb-24 z-10">
          
          <CanvasFrame title="Frontend Architecture" data={frontend} color="border-sky-400" delay={0.1} dragConstraints={canvasRef} />
          
          {/* Sticky Note 1 */}
          <motion.div 
            drag
            dragConstraints={canvasRef}
            dragElastic={0.1}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, zIndex: 30 }}
            whileDrag={{ scale: 1.1, rotate: 0, zIndex: 50, cursor: "grabbing" }}
            className="w-56 h-auto bg-[#FFEB3B] p-5 shadow-[2px_4px_16px_rgba(0,0,0,0.15)] self-center cursor-grab active:cursor-grabbing border border-[#FBC02D]/40"
          >
            <p className="font-serif italic text-slate-800 text-[15px] font-medium leading-relaxed pointer-events-none">
              "Building clean, scalable components is my absolute favorite part of the stack!"
            </p>
            <div className="mt-3 text-xs text-slate-600 font-sans font-medium pointer-events-none">Sasi</div>
          </motion.div>

          <CanvasFrame title="Backend & APIs" data={backend} color="border-emerald-400" delay={0.2} dragConstraints={canvasRef} />
          
          <CanvasFrame title="Database & Cloud" data={databases} color="border-indigo-400" delay={0.3} dragConstraints={canvasRef} />

          {/* Sticky Note 2 */}
          <motion.div 
            drag
            dragConstraints={canvasRef}
            dragElastic={0.1}
            dragMomentum={false}
            initial={{ opacity: 0, scale: 0.5, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, zIndex: 30 }}
            whileDrag={{ scale: 1.1, rotate: 0, zIndex: 50, cursor: "grabbing" }}
            className="w-56 h-auto bg-[#FFCDD2] p-5 shadow-[2px_4px_16px_rgba(0,0,0,0.15)] self-center cursor-grab active:cursor-grabbing border border-[#EF9A9A]/40"
          >
            <p className="font-serif italic text-slate-800 text-[15px] font-medium leading-relaxed pointer-events-none">
              "Always learning new system design patterns 🚀"
            </p>
            <div className="mt-3 text-xs text-slate-600 font-sans font-medium pointer-events-none">Guest</div>
          </motion.div>

          <CanvasFrame title="Tools & Design" data={tools} color="border-amber-400" delay={0.4} dragConstraints={canvasRef} />

        </div>

        {/* Floating Toolbar */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1 sm:gap-2 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] border border-slate-200 z-50">
          {[
            { icon: MousePointer2, active: true },
            { icon: Hand, active: false },
            { icon: PenTool, active: false },
            { icon: Square, active: false },
            { icon: Circle, active: false },
            { icon: Type, active: false },
            { icon: StickyNote, active: false },
            { icon: MessageSquare, active: false },
          ].map((item, i) => (
            <div 
              key={i} 
              className={`p-2 sm:p-2.5 rounded-xl cursor-pointer transition-colors ${
                item.active 
                  ? "bg-blue-100 text-blue-600" 
                  : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
              }`}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          ))}
          
          <div className="h-8 w-px bg-slate-200 mx-1 sm:mx-3" />
          
          <div className="flex -space-x-2 px-1">
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-[10px] sm:text-xs font-bold text-white z-30 shadow-sm">S</div>
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-[10px] sm:text-xs font-bold text-white z-20 shadow-sm">D</div>
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center text-[10px] sm:text-xs font-bold text-white z-10 shadow-sm">R</div>
          </div>
        </div>

      </div>
    </Section>
  );
}

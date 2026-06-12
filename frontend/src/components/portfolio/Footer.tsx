import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants/social";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: LINKEDIN_URL, Icon: Linkedin, color: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/5" },
  { label: "GitHub", href: GITHUB_URL, Icon: Github, color: "hover:text-[#181717] hover:border-[#181717]/30 hover:bg-[#181717]/5" },
  { label: "Email", href: `mailto:${EMAIL}`, Icon: Mail, color: "hover:text-rose-500 hover:border-rose-500/30 hover:bg-rose-500/5" },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-slate-200 bg-white pt-20 sm:pt-32">
      <div className="mx-auto max-w-[1400px] px-6 sm:px-10">
        
        {/* Top Section: CTA & Links */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0">
          
          {/* Left: Call to Action & Socials */}
          <div className="max-w-xl">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Have an idea in mind?
            </h2>
            <p className="text-lg text-slate-500 mb-8 max-w-md leading-relaxed">
              Let's collaborate to build digital products with design-led thinking and founder energy.
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {socialLinks.map(({ label, href, Icon, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group flex items-center gap-2.5 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-600 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${color}`}
                >
                  <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Navigation Links */}
          <div className="flex flex-col items-start md:items-end w-full md:w-auto">
            <p className="mb-6 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Navigation
            </p>
            <ul className="flex flex-row md:flex-col flex-wrap gap-4 md:gap-3">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-1.5 text-base md:text-lg font-medium text-slate-500 transition-colors hover:text-slate-900"
                  >
                    {label}
                    <ArrowUpRight className="h-4 w-4 opacity-0 -translate-x-2 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 text-blue-500" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* MASSIVE TYPOGRAPHY */}
      <div className="w-full mt-20 sm:mt-32 mb-8 sm:mb-12 flex justify-center relative group cursor-default select-none px-4">
        {/* Decorative background glow behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 bg-blue-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        
        <h1 className="text-[17vw] sm:text-[16vw] font-black leading-[0.8] tracking-tighter text-slate-900/5 group-hover:text-slate-900 transition-colors duration-500 text-center uppercase">
          LET'S TALK<span className="text-blue-500 animate-pulse">.</span>
        </h1>
      </div>

      {/* Absolute Bottom Bar */}
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row sm:px-10">
          <p className="text-xs sm:text-sm font-medium text-slate-400">
            © {new Date().getFullYear()} Sasikiran T.T. All rights reserved.
          </p>
          
          <a
            href="#top"
            className="group flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-blue-500"
          >
            Back to top
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white transition-all group-hover:border-blue-500 group-hover:bg-blue-50">
              <ArrowUpRight className="h-3 w-3 text-slate-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-500" />
            </div>
          </a>
        </div>
      </div>
    </footer>
  );
}

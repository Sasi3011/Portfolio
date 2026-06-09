import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/lib/constants/social";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "LinkedIn", href: LINKEDIN_URL, Icon: Linkedin },
  { label: "GitHub", href: GITHUB_URL, Icon: Github },
  { label: "Email", href: `mailto:${EMAIL}`, Icon: Mail },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-primary/10 bg-white/40 backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 md:px-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-cyan-500 text-sm font-bold text-white shadow-sm">
                S
              </span>
              <div>
                <p className="hero-headline text-lg font-bold tracking-[0.03em] text-slate-900">Sasikiran T.T.</p>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  Full Stack · UI/UX · Founder
                </p>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building digital products with design-led thinking and founder energy. Let&apos;s create something meaningful together.
            </p>
          </div>

          {/* Quick links */}
          <div className="md:col-span-3">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
              Navigate
            </p>
            <ul className="space-y-2.5">
              {navLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-1 text-sm text-slate-600 transition hover:text-primary"
                  >
                    {label}
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-4">
            <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
              Connect
            </p>
            <ul className="space-y-2.5">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-slate-600 transition hover:text-primary"
                  >
                    <span className="grid h-8 w-8 place-items-center rounded-lg border border-primary/10 bg-primary/5">
                      <Icon className="h-3.5 w-3.5 text-primary" />
                    </span>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-primary/10 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground sm:text-sm">
            © {new Date().getFullYear()} Sasikiran T.T. All rights reserved.
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 font-mono text-[10px] uppercase tracking-widest text-primary transition hover:border-primary/30 hover:bg-primary/10"
          >
            Back to top
            <ArrowUpRight className="h-3 w-3 -rotate-45" />
          </a>
        </div>
      </div>
    </footer>
  );
}

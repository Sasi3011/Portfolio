import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import Section from "./Section";
import SectionTitle from "./SectionTitle";
import { EMAIL, GITHUB_URL, GITHUB_USERNAME, LINKEDIN_URL, PHONE } from "@/lib/constants/social";

const ease = [0.22, 1, 0.36, 1] as const;

const SOCIAL = {
  linkedin: LINKEDIN_URL,
  github: GITHUB_URL,
  email: `mailto:${EMAIL}`,
  phone: `tel:${PHONE.replace(/\s/g, "")}`,
};

const contactLinks = [
  {
    label: "Email",
    value: EMAIL,
    href: SOCIAL.email,
    Icon: Mail,
    accent: "#3B82F6",
  },
  {
    label: "Phone",
    value: PHONE,
    href: SOCIAL.phone,
    Icon: Phone,
    accent: "#10B981",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/sasikiran-62b77331b",
    href: SOCIAL.linkedin,
    Icon: Linkedin,
    accent: "#0A66C2",
  },
  {
    label: "GitHub",
    value: `github.com/${GITHUB_USERNAME}`,
    href: SOCIAL.github,
    Icon: Github,
    accent: "#24292e",
  },
];

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
      />
    </div>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Section id="contact" className="justify-start pt-24 md:pt-32">
      <SectionTitle line1="LET'S" line2="CONNECT" align="left" />

      <p className="-mt-6 mb-8 max-w-xl text-sm leading-relaxed text-muted-foreground sm:mb-10 sm:text-[15px]">
        Open to freelancing, internships, and full-time roles. Share your idea — I&apos;d love to hear from you.
      </p>

      <div className="panel-glow overflow-hidden rounded-2xl border border-primary/20 bg-white/70 shadow-[0_8px_32px_-12px_rgba(59,130,246,0.08)]">
        <div className="border-b border-primary/15 bg-slate-50/70 px-5 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-primary" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70">
                Get in Touch
              </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-700 sm:text-[10px]">
                Available for work
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-0 lg:grid-cols-2">
          {/* Contact info */}
          <div className="border-b border-primary/10 p-5 sm:p-6 md:p-8 lg:border-b-0 lg:border-r">
            <div className="mb-6 flex items-start gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground sm:text-lg">Start a conversation</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pick the channel that works best — I typically reply within 24 hours.
                </p>
              </div>
            </div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-xl border border-slate-200/80 bg-slate-50 px-3.5 py-2.5">
              <MapPin className="h-4 w-4 text-primary/70" />
              <span className="text-xs text-muted-foreground sm:text-sm">Tamil Nadu, India · Remote friendly</span>
            </div>

            <div className="grid gap-2.5 lg:grid-cols-1">
              {contactLinks.map(({ label, value, href, Icon, accent }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  whileHover={{ x: 3 }}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3.5 transition hover:border-primary/25 hover:shadow-sm"
                >
                  <div
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border bg-white"
                    style={{ borderColor: `${accent}30`, color: accent }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">{label}</p>
                    <p className="break-all text-xs font-medium text-slate-800 sm:text-sm">{value}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition group-hover:text-primary" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="p-5 sm:p-6 md:p-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                setTimeout(() => setSent(false), 3500);
              }}
              className="space-y-4"
            >
              <div className="mb-2 flex items-center gap-2 border-b border-primary/10 pb-4">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                </div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50">
                  message.form
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Your Name" name="name" placeholder="Jane Doe" />
                <Field label="Email" name="email" type="email" placeholder="jane@example.com" />
              </div>
              <Field label="Subject" name="subject" placeholder="Let's work together" />
              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project, timeline, and goals..."
                  className="min-h-[100px] w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-8px_rgba(59,130,246,0.45)] transition hover:opacity-95 sm:w-auto"
              >
                {sent ? (
                  "Message sent — thank you!"
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </Section>
  );
}

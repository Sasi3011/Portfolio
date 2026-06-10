import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Layers,
  FolderKanban,
  Briefcase,
  Mail,
  Menu,
  X,
} from "lucide-react";

const SOCIAL = {
  email: "mailto:sasikiran.tt3011@gmail.com",
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);

      // Hide when scrolling down past 80px, show when scrolling up
      if (currentY > 80) {
        setHidden(currentY > lastScrollY.current);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-35% 0px -55% 0px",
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions,
    );
    const observed = new Set<Element>();
    const sectionIds = [
      "top",
      "about",
      "skills",
      "projects",
      "experience",
      "contact",
    ];

    const attachSections = () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && !observed.has(el)) {
          observer.observe(el);
          observed.add(el);
        }
      });
    };

    attachSections();

    const mutationObserver = new MutationObserver(attachSections);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  const links = [
    { label: "About", href: "#about", Icon: User },
    { label: "Skills", href: "#skills", Icon: Layers },
    { label: "Projects", href: "#projects", Icon: FolderKanban },
    { label: "Experience", href: "#experience", Icon: Briefcase },
    { label: "Contact", href: "#contact", Icon: Mail },
  ];

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center p-3 md:top-2 md:p-4"
      animate={{ y: hidden && !menuOpen ? "-120%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className={`relative flex w-full max-w-[1200px] items-center justify-between rounded-2xl border px-4 py-2 transition-all duration-300 sm:px-6 md:rounded-full ${
          scrolled || menuOpen
            ? "border-primary/25 bg-background/85 backdrop-blur-lg shadow-[0_8px_32px_rgba(59,130,246,0.08)] glow-sm py-2"
            : "border-primary/10 bg-white/45 backdrop-blur-sm py-3"
        }`}
      >
        {/* Brand/Logo */}
        <motion.a
          href="#top"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex items-center select-none cursor-pointer"
        >
          <span className="font-display text-xl font-extrabold tracking-tighter text-foreground sm:text-2xl flex items-center">
            {/* Styled capital 'S' with orange rings above it */}
            <span className="relative inline-block">
              S
              <span className="absolute -top-[7px] left-1/2 -translate-x-[45%] flex justify-center">
                <svg
                  className="h-2 w-4 sm:h-2.5 sm:w-5"
                  viewBox="0 0 24 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="8"
                    cy="6"
                    r="4.5"
                    stroke="#f59e0b"
                    strokeWidth="2.2"
                  />
                  <circle
                    cx="16"
                    cy="6"
                    r="4.5"
                    stroke="#f59e0b"
                    strokeWidth="2.2"
                  />
                </svg>
              </span>
            </span>

            {/* 'as' */}
            <span>as</span>

            {/* Styled 'i' with custom contrast dot */}
            <span className="relative inline-block">
              ı
              <span className="absolute -top-[1.5px] left-1/2 -translate-x-[50%] flex items-center justify-center">
                <svg
                  className="h-1.5 w-1.5 sm:h-2 sm:w-2"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Left half filled blue */}
                  <path d="M5,0.5 A4.5,4.5 0 0,0 5,9.5 Z" fill="#0ea5e9" />
                  {/* Right half filled dark slate */}
                  <path d="M5,0.5 A4.5,4.5 0 0,1 5,9.5 Z" fill="#0f172a" />
                  {/* Blue border circle */}
                  <circle
                    cx="5"
                    cy="5"
                    r="4.5"
                    stroke="#0ea5e9"
                    strokeWidth="1.2"
                  />
                </svg>
              </span>
            </span>

            {/* Pink period '.' */}
            <span className="text-[#f43f5e] font-black inline-block ml-0.5 group-hover:animate-pulse">
              .
            </span>
          </span>
        </motion.a>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-1.5 lg:flex xl:gap-2">
          {links.map(({ label, href, Icon }) => {
            const isActive = activeSection === href.slice(1);
            return (
              <a
                key={href}
                href={href}
                className={`relative group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavTab"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary to-primary/80 glow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon
                  className={`h-3.5 w-3.5 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-60 group-hover:opacity-100"}`}
                />
                <span>{label}</span>
              </a>
            );
          })}
        </nav>

        {/* Call to action & Mobile Menu button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <motion.a
            href={SOCIAL.email}
            whileHover={{
              scale: 1.04,
              boxShadow: "0 0 16px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className="hidden rounded-full bg-gradient-to-r from-primary to-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md transition-all duration-300 sm:inline-flex md:px-5 md:py-2.5"
          >
            Hire Me
          </motion.a>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-primary/20 bg-primary/5 text-foreground hover:bg-primary/10 lg:hidden transition-all duration-200"
          >
            {menuOpen ? (
              <X className="h-4.5 w-4.5" />
            ) : (
              <Menu className="h-4.5 w-4.5" />
            )}
          </button>
        </div>

        {/* Floating Mobile Dropdown Menu Card */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-2 rounded-2xl border border-primary/25 bg-background/95 p-4 shadow-2xl backdrop-blur-xl glow-sm lg:hidden z-40"
            >
              <nav className="flex flex-col gap-1.5">
                {links.map(({ label, href, Icon }, i) => {
                  const isActive = activeSection === href.slice(1);
                  return (
                    <motion.a
                      key={href}
                      href={href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => setMenuOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                      />
                      {label}
                    </motion.a>
                  );
                })}
                <motion.a
                  href={SOCIAL.email}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => setMenuOpen(false)}
                  className="mt-3 rounded-full bg-gradient-to-r from-primary to-accent py-3 text-center text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-lg glow-sm"
                >
                  Hire Me
                </motion.a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}

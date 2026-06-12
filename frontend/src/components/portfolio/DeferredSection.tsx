import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type LazyExoticComponent,
} from "react";

function SectionFallback({ minHeight }: { minHeight: string }) {
  return (
    <div
      aria-hidden
      className="w-full animate-pulse rounded-2xl bg-primary/[0.03]"
      style={{ minHeight }}
    />
  );
}

const loaders = {
  about: () => import("./About"),
  skills: () => import("./Skills"),
  projects: () => import("./Projects"),
  experience: () => import("./Experience"),
  achievements: () => import("./Achievements"),
  patents: () => import("./Patents"),
  coding: () => import("./Coding"),
  why: () => import("./WhyMe"),
  vision: () => import("./Vision"),
  contact: () => import("./Contact"),
  footer: () => import("./Footer"),
} as const;

type SectionKey = keyof typeof loaders;

const lazySections: Record<SectionKey, LazyExoticComponent<ComponentType>> = {
  about: lazy(loaders.about),
  skills: lazy(loaders.skills),
  projects: lazy(loaders.projects),
  experience: lazy(loaders.experience),
  achievements: lazy(loaders.achievements),
  patents: lazy(loaders.patents),
  coding: lazy(loaders.coding),
  why: lazy(loaders.why),
  vision: lazy(loaders.vision),
  contact: lazy(loaders.contact),
  footer: lazy(loaders.footer),
};

interface DeferredSectionProps {
  name: SectionKey;
  minHeight?: string;
  rootMargin?: string;
}

export default function DeferredSection({
  name,
  minHeight = "70dvh",
  rootMargin = "320px 0px",
}: DeferredSectionProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const LazyComponent = lazySections[name];

  useEffect(() => {
    const el = hostRef.current;
    if (!el || shouldLoad) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  return (
    <div ref={hostRef}>
      {shouldLoad ? (
        <Suspense fallback={<SectionFallback minHeight={minHeight} />}>
          <LazyComponent />
        </Suspense>
      ) : (
        <SectionFallback minHeight={minHeight} />
      )}
    </div>
  );
}

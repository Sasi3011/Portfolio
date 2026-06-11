import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 glow-sm"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back
          home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-primary/40 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-primary/10"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    head: () => ({
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
        { title: "Sasikiran T.T. | Full Stack Developer & UI/UX Designer | Portfolio" },
        {
          name: "description",
          content:
            "Full Stack Developer & UI/UX Designer from India. Specializing in React, TypeScript, Web Design. Explore portfolio projects, expertise, and achievements.",
        },
        { name: "author", content: "Sasikiran T.T." },
        { name: "keywords", content: "Full Stack Developer, UI/UX Designer, React, TypeScript, Web Development, Portfolio, India" },
        { name: "theme-color", content: "#000000" },
        { name: "color-scheme", content: "dark light" },

        // Open Graph
        { property: "og:title", content: "Sasikiran T.T. | Full Stack Developer & UI/UX Designer" },
        {
          property: "og:description",
          content:
            "Experienced Full Stack Developer and UI/UX Designer. Building innovative digital products with React, TypeScript, and modern web technologies.",
        },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Sasikiran T.T. Portfolio" },
        { property: "og:url", content: "https://sasikiran.pages.dev" },
        { property: "og:image", content: "https://sasikiran.pages.dev/og-image.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },

        // Twitter Card
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Sasikiran T.T. | Full Stack Developer & UI/UX Designer" },
        { name: "twitter:description", content: "Explore my portfolio of innovative digital products built with modern web technologies." },
        { name: "twitter:image", content: "https://sasikiran.pages.dev/og-image.png" },

        // Mobile
        { name: "mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-capable", content: "yes" },
        { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },

        // Additional SEO
        { name: "language", content: "English" },
        { name: "revisit-after", content: "30 days" },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      ],
      links: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/favicon.svg" },
        { rel: "canonical", href: "https://sasikiran.pages.dev" },
        { rel: "sitemap", href: "/sitemap.xml" },
        { rel: "alternate", hrefLang: "en", href: "https://sasikiran.pages.dev" },
        { rel: "stylesheet", href: appCss },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "preload",
          href: "/fonts/MediaSansSemicondensed-Bold.otf",
          as: "font",
          type: "font/otf",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=optional",
        },
        {
          rel: "dns-prefetch",
          href: "https://fonts.googleapis.com",
        },
      ],
    }),
    shellComponent: RootShell,
    component: RootComponent,
    notFoundComponent: NotFoundComponent,
    errorComponent: ErrorComponent,
  },
);

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sasikiran T.T.",
    url: "https://sasikiran.pages.dev",
    image: "https://sasikiran.pages.dev/og-image.png",
    jobTitle: ["Full Stack Developer", "UI/UX Designer"],
    sameAs: [
      "https://github.com/sasikiran",
      "https://linkedin.com/in/sasikiran",
      "https://twitter.com/sasikiran",
    ],
    description:
      "Full Stack Developer and UI/UX Designer specializing in React, TypeScript, and modern web technologies.",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

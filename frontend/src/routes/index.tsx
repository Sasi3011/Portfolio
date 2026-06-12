import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "Sasikiran T.T. — Full Stack Developer & UI/UX Designer | Portfolio",
      },
      {
        name: "description",
        content:
          "Full Stack Developer & UI/UX Designer from India. Specializing in React, TypeScript, and Web Design. View portfolio projects, expertise, and achievements.",
      },
      {
        name: "keywords",
        content:
          "Sasikiran, Full Stack Developer, UI/UX Designer, React Developer, Portfolio, Web Development",
      },
      {
        property: "og:title",
        content: "Sasikiran T.T. — Full Stack Developer & UI/UX Designer",
      },
      {
        property: "og:description",
        content:
          "Innovative Full Stack Developer and UI/UX Designer. Building digital products with React, TypeScript, and modern web technologies.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sasikiran.pages.dev" },
      { property: "og:image", content: "https://sasikiran.pages.dev/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Sasikiran T.T. — Full Stack Developer & UI/UX Designer" },
      {
        name: "twitter:description",
        content:
          "Full Stack Developer and UI/UX Designer. Explore my portfolio of innovative projects.",
      },
      { name: "twitter:image", content: "https://sasikiran.pages.dev/og-image.png" },
    ],
  }),
  component: Portfolio,
});

import { createFileRoute } from "@tanstack/react-router";
import Portfolio from "@/components/Portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sasikiran T.T. — Entrepreneur · Full Stack Developer · UI/UX Designer" },
      {
        name: "description",
        content:
          "Portfolio of Sasikiran T.T. — building innovative digital products through technology, design, and entrepreneurship.",
      },
      { property: "og:title", content: "Sasikiran T.T. — Developer & Designer Portfolio" },
      {
        property: "og:description",
        content:
          "Full Stack Developer, UI/UX Designer and aspiring entrepreneur. Explore projects, experience and achievements.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Portfolio,
});

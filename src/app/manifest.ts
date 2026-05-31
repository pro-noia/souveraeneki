import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Souveräne KI",
    short_name: "Souveräne KI",
    description:
      "Souveräne KI baut auf europäischem Recht — Architektur, Recht und Praxis für KI-Souveränität in Europa.",
    lang: "de",
    start_url: "/",
    display: "standalone",
    background_color: "#0C1626",
    theme_color: "#3A90AA",
    categories: ["business", "education", "technology"],
    icons: [
      {
        src: "/icon.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}

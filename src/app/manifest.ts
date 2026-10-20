import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cardex — graded card scanner on Solana",
    short_name: "Cardex",
    description:
      "Live scanner, trade tape and wallet tracer for tokenized graded cards on Collector Crypt.",
    start_url: "/",
    display: "standalone",
    background_color: "#0c1118",
    theme_color: "#0c1118",
    categories: ["finance", "utilities"],
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}

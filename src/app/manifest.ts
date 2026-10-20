import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cardex · the Pokédex for graded cards",
    short_name: "Cardex",
    description: "Live listings, deal scores, real bids and wallet tracking for tokenized graded cards on Collector Crypt.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4efe4",
    theme_color: "#f4efe4",
    categories: ["finance", "utilities"],
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}

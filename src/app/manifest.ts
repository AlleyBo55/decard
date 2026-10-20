import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Decard · the Pokédex for graded cards",
    short_name: "Decard",
    description: "Live listings, deal scores, real bids and wallet tracking for tokenized graded cards on Collector Crypt.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4efe4",
    theme_color: "#f4efe4",
    categories: ["finance", "utilities"],
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }],
  };
}
